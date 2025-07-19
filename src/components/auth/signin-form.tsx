import { useSignIn } from "@/hooks/use-signin";
import Link from "next/link";

export const SignInForm = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleSignIn,
  } = useSignIn();

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSignIn}>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            メールアドレス
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            パスワード
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
            placeholder="パスワード"
          />
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "サインイン中..." : "サインイン"}
        </button>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          アカウントをお持ちでない方は{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-yellow-600 hover:text-yellow-500"
          >
            新規登録
          </Link>
        </p>
      </div>

      <div className="text-center">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          ← ホームに戻る
        </Link>
      </div>
    </form>
  );
};
