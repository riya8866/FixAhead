import { users, type User, type InsertUser, detections, type Detection, type InsertDetection } from "@shared/schema";

// Interface for all storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Detection operations
  getDetection(id: number): Promise<Detection | undefined>;
  getRecentDetections(limit?: number): Promise<Detection[]>;
  createDetection(detection: InsertDetection): Promise<Detection>;
  getDetectionsByUser(userId: number): Promise<Detection[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private detections: Map<number, Detection>;
  private userIdCounter: number;
  private detectionIdCounter: number;

  constructor() {
    this.users = new Map();
    this.detections = new Map();
    this.userIdCounter = 1;
    this.detectionIdCounter = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }
  
  // Detection methods
  async getDetection(id: number): Promise<Detection | undefined> {
    return this.detections.get(id);
  }
  
  async getRecentDetections(limit: number = 10): Promise<Detection[]> {
    return Array.from(this.detections.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
  
  async createDetection(insertDetection: InsertDetection): Promise<Detection> {
    const id = this.detectionIdCounter++;
    const detection: Detection = {
      ...insertDetection,
      id,
      createdAt: new Date()
    };
    this.detections.set(id, detection);
    return detection;
  }
  
  async getDetectionsByUser(userId: number): Promise<Detection[]> {
    return Array.from(this.detections.values())
      .filter(detection => detection.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

// Create and export the storage instance
export const storage = new MemStorage();
