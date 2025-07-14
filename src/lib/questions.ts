// import words from "../data/pre1/extra-words.json";

type Word = {
  word: string;
  partOfSpeech: string;
  meaning_jp: string;
};

export type Question = {
  question: string;
  correctAnswer: string;
  choices: string[];
};

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export function generateQuestion(wordList: Word[]): Question {
  const correct = wordList[Math.floor(Math.random() * wordList.length)];
  const otherChoices = wordList
    .filter((w) => w.word !== correct.word)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((w) => w.meaning_jp);

  const choices = shuffleArray([correct.meaning_jp, ...otherChoices]);

  return {
    question: `What is the meaning of "${correct.word}"?`,
    correctAnswer: correct.meaning_jp,
    choices: choices,
  };
}

export function generateQuestions(wordList: Word[], count: number): Question[] {
  const usedWords = [...wordList]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
  return usedWords.map(() => generateQuestion(wordList));
}
