import { answerHistoryAtom } from "@/store/gameAtoms";
import type { AnswerHistory } from "@/types/question";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { createStore, Provider } from "jotai";
import AnswerHistoryList from "./answer-history-list";

const meta: Meta<typeof AnswerHistoryList> = {
  title: "Components/AnswerHistoryList",
  component: AnswerHistoryList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

// モックデータの定義
const correctAnswerHistory: AnswerHistory = {
  question: "apple",
  userAnswer: "りんご",
  correctAnswer: "りんご",
  isCorrect: true,
  timestamp: Date.now() - 1000,
};

const incorrectAnswerHistory: AnswerHistory = {
  question: "banana",
  userAnswer: "みかん",
  correctAnswer: "バナナ",
  isCorrect: false,
  timestamp: Date.now() - 2000,
};

const mixedAnswerHistory: AnswerHistory[] = [
  {
    question: "apple",
    userAnswer: "りんご",
    correctAnswer: "りんご",
    isCorrect: true,
    timestamp: Date.now() - 1000,
  },
  {
    question: "banana",
    userAnswer: "みかん",
    correctAnswer: "バナナ",
    isCorrect: false,
    timestamp: Date.now() - 2000,
  },
  {
    question: "orange",
    userAnswer: "オレンジ",
    correctAnswer: "オレンジ",
    isCorrect: true,
    timestamp: Date.now() - 3000,
  },
  {
    question: "grape",
    userAnswer: "ぶどう",
    correctAnswer: "ぶどう",
    isCorrect: true,
    timestamp: Date.now() - 4000,
  },
  {
    question: "strawberry",
    userAnswer: "いちど",
    correctAnswer: "いちご",
    isCorrect: false,
    timestamp: Date.now() - 5000,
  },
];

// Jotaiストアを作成してモックデータを設定するヘルパー関数
const createStoryWithHistory = (history: AnswerHistory[]) => {
  const store = createStore();
  store.set(answerHistoryAtom, history);

  const StoryComponent = () => (
    <Provider store={store}>
      <div className="w-full max-w-lg p-4">
        <AnswerHistoryList />
      </div>
    </Provider>
  );

  StoryComponent.displayName = `AnswerHistoryListStory_${history.length}_items`;

  return StoryComponent;
};

// 履歴なしの状態
export const Empty: Story = {
  render: createStoryWithHistory([]),
};

// 正解のみの履歴
export const CorrectAnswersOnly: Story = {
  render: createStoryWithHistory([correctAnswerHistory]),
};

// 不正解のみの履歴
export const IncorrectAnswersOnly: Story = {
  render: createStoryWithHistory([incorrectAnswerHistory]),
};

// 正解・不正解が混在する履歴
export const MixedAnswers: Story = {
  render: createStoryWithHistory(mixedAnswerHistory),
};

// 長いリストでスクロール表示をテスト
export const LongList: Story = {
  render: createStoryWithHistory([
    ...mixedAnswerHistory,
    ...mixedAnswerHistory.map((item, index) => ({
      ...item,
      question: `${item.question}_${index + 1}`,
      timestamp: item.timestamp - (index + 6) * 1000,
    })),
  ]),
};
