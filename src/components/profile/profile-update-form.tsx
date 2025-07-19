"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useProfileUpdate } from "@/hooks/useProfileUpdate";

type ProfileUpdateFormProps = {
  currentNickname?: string;
  onSuccess?: () => void;
};

/**
 * プロファイル更新フォームコンポーネント
 */
export const ProfileUpdateForm = ({
  currentNickname,
  onSuccess,
}: ProfileUpdateFormProps) => {
  const { refreshProfile } = useAuth();
  const {
    nickname,
    setNickname,
    loading,
    message,
    error,
    updateProfile,
    resetForm,
  } = useProfileUpdate(currentNickname);

  const handleSubmit = async (e: React.FormEvent) => {
    const success = await updateProfile(e);
    if (success) {
      // プロファイル情報を再取得
      await refreshProfile();
      if (onSuccess) {
        onSuccess();
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        プロファイル編集
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nickname"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            ニックネーム
          </label>
          <input
            id="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white text-gray-900"
            placeholder="2文字以上20文字以下で入力"
            required
            maxLength={20}
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            英数字、ひらがな、カタカナ、漢字、アンダースコア、ハイフンが使用できます
          </p>
        </div>

        {error && (
          <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
            {error}
          </div>
        )}

        {message && (
          <div className="text-green-600 text-sm bg-green-50 p-3 rounded-md">
            {message}
          </div>
        )}

        <div className="flex space-x-3">
          <Button
            type="submit"
            disabled={loading || nickname.trim() === currentNickname}
            className="flex-1"
          >
            {loading ? "更新中..." : "更新する"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={resetForm}
            disabled={loading}
            className="flex-1"
          >
            リセット
          </Button>
        </div>
      </form>
    </div>
  );
};
