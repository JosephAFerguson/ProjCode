
export const exercises = [
  "Bench Press",
  "Incline Bench Press",
  "Dumbbell Bench Press",
  "Close-Grip Bench Press",
  "Push-Ups",
  "Overhead Press",
  "Arnold Press",
  "Lateral Raises",
  "Front Raises",
  "Rear Delt Fly",
  "Upright Row",
  "Shrugs",
  "Bicep Curl",
  "Hammer Curl",
  "Preacher Curl",
  "Chin-Ups",
  "Pull-Ups",
  "Plank",
  "Hanging Leg Raises",
  "Ab Wheel Rollout",
  "Cable Crunch",
  "Russian Twist",
  "Back Squat",
  "Front Squat",
  "Leg Press",
  "Hack Squat",
  "Lunges",
  "Bulgarian Split Squat",
  "Step-Ups",
  "Leg Extension",
  "Deadlift",
  "Sumo Deadlift",
  "Lat Pulldown",
  "Seated Cable Row",
  "Chest-Supported Row",
  "T-Bar Row",
  "Barbell Row",
  "Romanian Deadlift (RDL)",
  "Good Mornings",
  "Glute Ham Raise",
  "Tricep Pushdown",
  "Skull Crushers (EZ Bar)",
  "Overhead Tricep Extension",
  "Dips",
  "Hip Thrust",
  "Walking Lunges",
  "Leg Curl",
  "Calf Raises"
];

export const pecexercises = [
  "Bench Press",
  "Incline Bench Press",
  "Dumbbell Bench Press",
  "Close-Grip Bench Press",
  "Push-Ups"
];
export const shoulderexercises = [
  "Overhead Press",
  "Arnold Press",
  "Lateral Raises",
  "Front Raises",
  "Rear Delt Fly",
  "Upright Row",
  "Shrugs"
];
export const bicepexercises = [
  "Bicep Curl",
  "Hammer Curl",
  "Preacher Curl",
  "Chin-Ups",
  "Pull-Ups"
];
export const absexercises = [
  "Plank",
  "Hanging Leg Raises",
  "Ab Wheel Rollout",
  "Cable Crunch",
  "Russian Twist"
];
export const quadsexercises = [
  "Back Squat",
  "Front Squat",
  "Leg Press",
  "Hack Squat",
  "Lunges",
  "Bulgarian Split Squat",
  "Step-Ups",
  "Leg Extension"
];
export const trapexercises = [
  "Shrugs",
  "Upright Row",
  "Deadlift",
  "Sumo Deadlift",
];
export const latexercises = [
  "Pull-Ups",
  "Chin-Ups",
  "Lat Pulldown",
  "Seated Cable Row",
  "Chest-Supported Row",
  "T-Bar Row",
  "Barbell Row",
];
export const lowbackexercises = [
  "Deadlift",
  "Romanian Deadlift (RDL)",
  "Good Mornings",
  "Glute Ham Raise",
];
export const tricepexercises = [
  "Tricep Pushdown",
  "Skull Crushers (EZ Bar)",
  "Overhead Tricep Extension",
  "Dips",
  "Close-Grip Bench Press",
];
export const gluteexercises = [
  "Hip Thrust",
  "Glute Ham Raise",
  "Lunges",
  "Bulgarian Split Squat",
  "Step-Ups",
  "Good Mornings",
  "Deadlift",
  "Romanian Deadlift (RDL)",
  "Sumo Deadlift",
  "Back Squat",
  "Front Squat",
  "Leg Press",
  "Hack Squat",
  "Walking Lunges",
];
export const hamstringsexercises = [
  "Romanian Deadlift (RDL)",
  "Leg Curl",
  "Good Mornings",
  "Glute Ham Raise",
  "Deadlift",
  "Sumo Deadlift",
  "Romanian Deadlift (RDL)",
  "Lunges",
  "Bulgarian Split Squat",
  "Step-Ups",
];
export const calfexercises = [
  "Calf Raises",
  "Leg Press",
];
// SetsData.js
export const allSets = {
  // Chest
  "Bench Press": [
    { set: 1, weight: "225 lbs", reps: 10 },
    { set: 2, weight: "245 lbs", reps: 8 },
    { set: 3, weight: "265 lbs", reps: 6 }
  ],
  "Incline Press": [
    { set: 1, weight: "185 lbs", reps: 12 },
    { set: 2, weight: "205 lbs", reps: 10 },
    { set: 3, weight: "225 lbs", reps: 8 }
  ],
  "Chest Fly": [
    { set: 1, weight: "50 lbs", reps: 12 },
    { set: 2, weight: "55 lbs", reps: 10 },
    { set: 3, weight: "60 lbs", reps: 8 }
  ],

  // Shoulders
  "Shoulder Press": [
    { set: 1, weight: "95 lbs", reps: 10 },
    { set: 2, weight: "115 lbs", reps: 8 },
    { set: 3, weight: "135 lbs", reps: 6 }
  ],
  "Lateral Raises": [
    { set: 1, weight: "20 lbs", reps: 12 },
    { set: 2, weight: "25 lbs", reps: 10 },
    { set: 3, weight: "30 lbs", reps: 8 },
    { set: 4, weight: "35 lbs", reps: 6 },
    { set: 5, weight: "40 lbs", reps: 4 },
    { set: 6, weight: "45 lbs", reps: 2 }
  ],

  // Biceps
  "Bicep Curl": [
    { set: 1, weight: "35 lbs", reps: 12 },
    { set: 2, weight: "40 lbs", reps: 10 },
    { set: 3, weight: "45 lbs", reps: 8 }
  ],
  "Hammer Curl": [
    { set: 1, weight: "30 lbs", reps: 12 },
    { set: 2, weight: "35 lbs", reps: 10 },
    { set: 3, weight: "40 lbs", reps: 8 }
  ],

  // Abs
  "Crunch": [
    { set: 1, weight: "Bodyweight", reps: 25 },
    { set: 2, weight: "Bodyweight", reps: 20 },
    { set: 3, weight: "Bodyweight", reps: 15 }
  ],
  "Plank": [
    { set: 1, weight: "Bodyweight", reps: 60 }, // seconds
    { set: 2, weight: "Bodyweight", reps: 45 },
    { set: 3, weight: "Bodyweight", reps: 30 }
  ],

  // Quads
  "Squat": [
    { set: 1, weight: "225 lbs", reps: 10 },
    { set: 2, weight: "245 lbs", reps: 8 },
    { set: 3, weight: "265 lbs", reps: 6 }
  ],
  "Leg Press": [
    { set: 1, weight: "300 lbs", reps: 12 },
    { set: 2, weight: "350 lbs", reps: 10 },
    { set: 3, weight: "400 lbs", reps: 8 }
  ],

  // Traps
  "Shrugs": [
    { set: 1, weight: "150 lbs", reps: 15 },
    { set: 2, weight: "175 lbs", reps: 12 },
    { set: 3, weight: "200 lbs", reps: 10 }
  ],

  // Lats
  "Pull-Up": [
    { set: 1, weight: "Bodyweight", reps: 10 },
    { set: 2, weight: "Bodyweight", reps: 8 },
    { set: 3, weight: "Bodyweight", reps: 6 }
  ],
  "Lat Pulldown": [
    { set: 1, weight: "100 lbs", reps: 12 },
    { set: 2, weight: "120 lbs", reps: 10 },
    { set: 3, weight: "140 lbs", reps: 8 }
  ],

  // Lowback
  "Back Extension": [
    { set: 1, weight: "Bodyweight", reps: 15 },
    { set: 2, weight: "Bodyweight", reps: 12 },
    { set: 3, weight: "Bodyweight", reps: 10 }
  ],

  // Triceps
  "Tricep Pushdown": [
    { set: 1, weight: "50 lbs", reps: 12 },
    { set: 2, weight: "60 lbs", reps: 10 },
    { set: 3, weight: "70 lbs", reps: 8 }
  ],

  // Glutes
  "Hip Thrust": [
    { set: 1, weight: "135 lbs", reps: 12 },
    { set: 2, weight: "185 lbs", reps: 10 },
    { set: 3, weight: "225 lbs", reps: 8 }
  ],

  // Hamstrings
  "Deadlift": [
    { set: 1, weight: "225 lbs", reps: 10 },
    { set: 2, weight: "275 lbs", reps: 8 },
    { set: 3, weight: "315 lbs", reps: 6 }
  ],

  // Calves
  "Calf Raise": [
    { set: 1, weight: "Bodyweight", reps: 20 },
    { set: 2, weight: "Bodyweight", reps: 25 },
    { set: 3, weight: "Bodyweight", reps: 30 }
  ]
};
// Generate random entries
export const entries = [ 
  { date: "2025-09-02", image: "/images/DudeCurling.png", entry: "It was a great summer day in the middle of august ", protein: 120, bodyweight: 181, 
    workout: [
      {Exercise: "Bench Press", Weights: [210, 195, 165], Reps: [3, 6, 12]}, 
      {Exercise: "Bicep Curl", Weights: [40, 35, 30], Reps: [12, 10, 8]} ]},
  { date: "2025-09-05", image: "/images/DudeSquatting.png", entry: "Felt strong today, hit a new PR on squats!", protein: 150, bodyweight: 182,  
    workout: [{Exercise: "Squat", Weights: [275, 245, 215], Reps: [3, 6, 12]},
      {Exercise: "Leg Press", Weights: [350, 300, 250], Reps: [12, 10, 8]} ]
  },
  { date: "2025-09-10", image: "/images/DudeSquatting.png", entry: "Back day was intense, really focused on form.", protein: 130, bodyweight: 180,  
    workout: [
      {Exercise: "Deadlift", Weights: [315, 275, 225], Reps: [3, 6, 12]},
      {Exercise: "Lat Pulldown", Weights: [120, 100, 80], Reps: [12, 10, 8]} ]
    },

  { date: "2025-09-12", image: "/images/DudeCurling.png", entry: "Tried a new recipe for protein pancakes, delicious!", protein: 140, bodyweight: 181, 
    workout: [
      {Exercise: "Bicep Curl", Weights: [40, 35, 30], Reps: [12, 10, 8]},
      {Exercise: "Hammer Curl", Weights: [35, 30, 25], Reps: [12, 10, 8]} ]
    },
  { date: "2025-09-15", image: "/images/DudeSquatting.png", entry: "Leg day was brutal but worth it.", protein: 160, bodyweight: 183, 
    workout: [
      {Exercise: "Squat", Weights: [275, 245, 215], Reps: [3, 6, 12]} ,
      {Exercise: "Lunges", Weights: [50, 40, 30], Reps: [12, 10, 8]} ]
  },
  { date: "2025-09-18", image: "/images/DudeCurling.png", entry: "Focused on shoulders and arms today.", protein: 135, bodyweight: 180, 
    workout: [
      {Exercise: "Shoulder Press", Weights: [115, 95, 75], Reps: [10, 8, 12]},
      {Exercise: "Lateral Raise", Weights: [25, 20, 15], Reps: [12, 10, 8]} ]
  },
];  