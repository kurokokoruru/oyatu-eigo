import { generateQuestion } from "../questions";

describe("generateQuestion", () => {
  const wordList = [
    { word: "apple", partOfSpeech: "noun", meaning_jp: "りんご" },
    { word: "run", partOfSpeech: "verb", meaning_jp: "走る" },
    { word: "blue", partOfSpeech: "adjective", meaning_jp: "青い" },
    { word: "cat", partOfSpeech: "noun", meaning_jp: "猫" },
    { word: "eat", partOfSpeech: "verb", meaning_jp: "食べる" },
  ];

  it("should return a question object with correct structure", () => {
    const q = generateQuestion(wordList);
    expect(q).toHaveProperty("question");
    expect(q).toHaveProperty("correctAnswer");
    expect(q).toHaveProperty("choices");
    expect(Array.isArray(q.choices)).toBe(true);
  });

  it("should return 4 choices and include the correct answer", () => {
    const q = generateQuestion(wordList);
    expect(q.choices.length).toBe(4);
    expect(q.choices).toContain(q.correctAnswer);
  });

  it("should not have duplicate choices", () => {
    const q = generateQuestion(wordList);
    const unique = new Set(q.choices);
    expect(unique.size).toBe(q.choices.length);
  });

  it("should generate a question string containing the word", () => {
    const q = generateQuestion(wordList);
    // word should be in the question string
    const found = wordList.some(w => q.question.includes(w.word));
    expect(found).toBe(true);
  });
});
