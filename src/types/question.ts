export type Question = {
  question: string;
  correctAnswer: string;
  choices: string[];
};

export type AnswerHistory = {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  timestamp: number;
};
