// UI文言定数
export const UI_TEXTS = {
  APP_TITLE: "おやつえいご",
  GAME_TITLE: "ことばクッキー",
  WELCOME_MESSAGE: (name: string) => `ようこそ、${name}さん！`,
  BUTTONS: {
    START_GAME: "ことばクッキーを始める",
    SIGN_OUT: "サインアウト",
    SIGN_IN: "サインイン",
    SIGN_UP: "新規登録",
  },
  MESSAGES: {
    SCORE_RECORDING: "スコアが自動的に記録されます",
    GUEST_PLAY: "ゲストでもプレイ可能！",
    ACCOUNT_REQUIRED: "スコア記録にはアカウントが必要です",
    EXISTING_ACCOUNT: "アカウントをお持ちの方",
  },
  ROUTES: {
    WORD_QUIZ: "/word-quiz",
    SIGNIN: "/auth/signin",
    SIGNUP: "/auth/signup",
    PROFILE: "/profile",
  },
} as const;
