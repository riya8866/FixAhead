// Application constants

// Model types and classes
export const DAMAGE_TYPES = [
  'Pothole'
] as const;

export type DamageType = typeof DAMAGE_TYPES[number];

export type DamageSeverity = 'Low' | 'Medium' | 'High';

export const SEVERITY_COLORS = {
  Low: 'text-green-400',
  Medium: 'text-yellow-400',
  High: 'text-red-400',
} as const;

// Model configuration
export const MODEL_CONFIG = {
  modelPath: '/models/yolov11-pothole-detection.onnx',
  inputSize: 640,
  scoreThreshold: 0.25,
  iouThreshold: 0.45,
  classes: DAMAGE_TYPES.map(type => type.toLowerCase()),
};

// Statistics for the "Why It Matters" section
export const ROAD_DAMAGE_STATS = [
  {
    icon: 'attach_money',
    value: '$26.5 Billion',
    description: 'Annual cost of vehicle damage from poor road conditions in the US alone',
  },
  {
    icon: 'dangerous',
    value: '33%',
    description: 'Of all traffic accidents involve poor road conditions as a contributing factor',
  },
  {
    icon: 'schedule',
    value: '14-21 Days',
    description: 'Average time between pothole reporting and repair using traditional methods',
  },
];

// Benefits of AI detection
export const AI_BENEFITS = [
  {
    icon: 'timelapse',
    title: 'Early Detection',
    description: 'Identify issues before they develop into costly problems',
  },
  {
    icon: 'savings',
    title: 'Cost Reduction',
    description: 'Save up to 70% on road maintenance through early intervention',
  },
  {
    icon: 'speed',
    title: 'Faster Response',
    description: 'Cut average repair time from weeks to days',
  },
  {
    icon: 'insights',
    title: 'Data-Driven Planning',
    description: 'Prioritize repairs based on objective severity and impact analysis',
  },
];

// Traditional vs. AI detection comparison
export const DETECTION_COMPARISON = {
  traditional: {
    title: 'Traditional Detection',
    image: 'https://images.unsplash.com/photo-1597421664073-9485ef5a5550?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    metrics: [
      { icon: 'schedule', text: 'Detection Time: 2-5 days', color: 'text-red-400' },
      { icon: 'error', text: 'Accuracy: ~65%', color: 'text-red-400' },
      { icon: 'category', text: 'Pothole Identification: Manual visual inspection', color: 'text-red-400' },
    ],
  },
  ai: {
    title: 'AI-Powered Detection',
    image: 'https://images.unsplash.com/photo-1597421664073-9485ef5a5550?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    metrics: [
      { icon: 'schedule', text: 'Detection Time: Real-time', color: 'text-green-400' },
      { icon: 'check_circle', text: 'Accuracy: >95%', color: 'text-green-400' },
      { icon: 'category', text: 'Pothole Identification: Automatic with confidence score', color: 'text-green-400' },
    ],
  },
};
