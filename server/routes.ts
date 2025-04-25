import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs";
import { InsertDetection, insertDetectionSchema } from "@shared/schema";
import { z } from "zod";

// Configure multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // Create uploads directory if it doesn't exist
      const uploadsDir = path.join(import.meta.dirname, 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      // Generate a unique filename with timestamp and original extension
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
  }),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  },
  fileFilter: (req, file, cb) => {
    // Accept only image and video files
    const allowedMimeTypes = [
      'image/jpeg', 'image/png', 'image/bmp',
      'video/mp4', 'video/quicktime', 'video/x-msvideo'
    ];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only image and video files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // API Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // User routes
  app.post('/api/users', async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      res.status(201).json({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
      }
    }
  });

  // Handle file uploads
  app.post('/api/upload', upload.single('file'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Determine media type based on mimetype
      const mediaType = req.file.mimetype.startsWith('image/') ? 'image' : 'video';
      
      // Get the relative path to the file
      const mediaUrl = `/uploads/${req.file.filename}`;
      
      // Mock detection results for demo
      const mockResults = {
        detections: [
          {
            id: 1,
            type: "Pothole",
            confidence: 0.98,
            box: { x: 20, y: 30, width: 20, height: 15 },
            severity: "High"
          },
          {
            id: 2,
            type: "Crack",
            confidence: 0.91,
            box: { x: 60, y: 50, width: 15, height: 10 },
            severity: "Medium"
          }
        ],
        summary: {
          totalIssues: 2,
          recommendedAction: "Schedule repair"
        }
      };
      
      // Save detection record
      const detectionData: InsertDetection = {
        userId: req.body.userId || null,
        mediaType,
        mediaUrl,
        results: mockResults,
        location: req.body.location,
        deviceInfo: req.body.deviceInfo
      };
      
      const detection = await storage.createDetection(detectionData);
      
      res.status(201).json({
        id: detection.id,
        mediaType: detection.mediaType,
        mediaUrl: detection.mediaUrl,
        results: detection.results,
        createdAt: detection.createdAt
      });
      
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'File upload failed' });
    }
  });

  // Get detection by ID
  app.get('/api/detections/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
      }
      
      const detection = await storage.getDetection(id);
      if (!detection) {
        return res.status(404).json({ error: 'Detection not found' });
      }
      
      res.json(detection);
    } catch (error) {
      console.error('Error fetching detection:', error);
      res.status(500).json({ error: 'Failed to fetch detection' });
    }
  });

  // Get recent detections
  app.get('/api/detections', async (req: Request, res: Response) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const detections = await storage.getRecentDetections(limit);
      res.json(detections);
    } catch (error) {
      console.error('Error fetching detections:', error);
      res.status(500).json({ error: 'Failed to fetch detections' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
