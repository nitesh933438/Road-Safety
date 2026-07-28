/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  objectives: string[];
  steps: { title: string; content: string; imageUrl?: string }[];
  safetyTips: string[];
  commonMistakes: string[];
  keyTakeaways: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiredXp: number;
}

export const LESSONS: Lesson[] = [
  {
    id: 'cpr-basics',
    title: 'CPR Basics',
    duration: '10 min',
    difficulty: 'Beginner',
    objectives: [
      'Recognize cardiac arrest',
      'Understand the correct compression rate and depth',
      'Perform hands-only CPR',
    ],
    steps: [
      {
        title: 'Check the Scene & Person',
        content: 'Ensure the scene is safe. Tap the person\'s shoulder and shout, "Are you OK?"',
      },
      {
        title: 'Call Emergency Services',
        content: 'If there is no response and the person is not breathing normally, point to someone and tell them to call 108. If you are alone, call 108 yourself.',
      },
      {
        title: 'Begin Chest Compressions',
        content: 'Place the heel of one hand in the center of the chest. Place the other hand on top and interlock your fingers. Push hard and fast (100-120 compressions per minute) at least 2 inches deep.',
      },
    ],
    safetyTips: [
      'Ensure you are on a firm, flat surface.',
      'Allow the chest to recoil fully between compressions.',
    ],
    commonMistakes: [
      'Compressing too slowly or too shallowly.',
      'Interrupting compressions for more than 10 seconds.',
    ],
    keyTakeaways: [
      'Call 108 immediately.',
      'Push hard and fast in the center of the chest.',
    ],
  },
  {
    id: 'bleeding-control',
    title: 'Bleeding Control',
    duration: '8 min',
    difficulty: 'Beginner',
    objectives: [
      'Identify severe bleeding',
      'Apply direct pressure correctly',
      'Know when to use a tourniquet',
    ],
    steps: [
      {
        title: 'Find the Source',
        content: 'Locate the source of the bleeding. Expose the wound if necessary.',
      },
      {
        title: 'Apply Direct Pressure',
        content: 'Use a clean cloth, gauze, or your gloved hand to apply firm, continuous pressure directly on the wound.',
      },
      {
        title: 'Maintain Pressure',
        content: 'Do not lift the dressing to check the wound. If blood soaks through, add more dressing on top and press harder.',
      },
    ],
    safetyTips: [
      'Always use personal protective equipment (PPE) like gloves if available.',
      'Keep the injured person warm and calm to prevent shock.',
    ],
    commonMistakes: [
      'Removing a blood-soaked bandage instead of adding to it.',
      'Applying insufficient pressure.',
    ],
    keyTakeaways: [
      'Direct, firm, and continuous pressure is the most effective way to stop bleeding.',
    ],
  },
];

export const QUIZZES: Quiz[] = [
  {
    id: 'cpr-quiz',
    title: 'CPR Basics Quiz',
    questions: [
      {
        id: 'q1',
        question: 'What is the recommended rate for chest compressions during CPR?',
        options: [
          '60-80 compressions per minute',
          '80-100 compressions per minute',
          '100-120 compressions per minute',
          '120-140 compressions per minute',
        ],
        correctAnswer: 2,
        explanation: 'The American Heart Association recommends a compression rate of 100 to 120 compressions per minute to maintain adequate blood flow.',
      },
      {
        id: 'q2',
        question: 'How deep should chest compressions be for an adult?',
        options: [
          'At least 1 inch',
          'At least 2 inches',
          'At least 3 inches',
          'Depends on the person\'s size',
        ],
        correctAnswer: 1,
        explanation: 'For an average adult, compressions should be at least 2 inches (5 cm) deep to effectively squeeze the heart and pump blood.',
      },
    ],
  },
  {
    id: 'bleeding-quiz',
    title: 'Bleeding Control Quiz',
    questions: [
      {
        id: 'q1',
        question: 'What is the first step in controlling severe bleeding?',
        options: [
          'Apply a tourniquet',
          'Elevate the limb',
          'Apply direct pressure',
          'Wash the wound with water',
        ],
        correctAnswer: 2,
        explanation: 'Applying firm, direct pressure is the most immediate and effective way to stop external bleeding.',
      },
      {
        id: 'q2',
        question: 'If a dressing becomes soaked with blood, you should:',
        options: [
          'Remove it and apply a fresh one',
          'Leave it and add more dressings on top',
          'Remove it and leave the wound open to air',
          'Wrap it tightly with tape',
        ],
        correctAnswer: 1,
        explanation: 'Removing a soaked dressing can disrupt clot formation. You should always add new dressings on top of the old ones.',
      },
    ],
  },
];

export const BADGES: Badge[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Completed your first lesson.',
    icon: 'Footprints',
    requiredXp: 50,
  },
  {
    id: 'cpr-certified',
    name: 'CPR Certified',
    description: 'Passed the CPR Basics Quiz.',
    icon: 'HeartPulse',
    requiredXp: 150,
  },
  {
    id: 'bleeding-expert',
    name: 'Bleeding Expert',
    description: 'Passed the Bleeding Control Quiz.',
    icon: 'Droplets',
    requiredXp: 250,
  },
  {
    id: 'road-guardian',
    name: 'Road Guardian',
    description: 'Reached 1000 XP.',
    icon: 'Shield',
    requiredXp: 1000,
  },
];

export const LEVELS = [
  { name: 'Beginner', minXp: 0 },
  { name: 'Helper', minXp: 101 },
  { name: 'Responder', minXp: 301 },
  { name: 'Life Saver', minXp: 601 },
  { name: 'Road Guardian', minXp: 1001 },
  { name: 'Golden Hero', minXp: 1501 },
];

export const getLevel = (xp: number) => {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
};

export const getNextLevel = (xp: number) => {
  for (let i = 0; i < LEVELS.length; i++) {
    if (xp < LEVELS[i].minXp) {
      return LEVELS[i];
    }
  }
  return null;
};
