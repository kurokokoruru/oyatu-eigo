"use client";

import { AuthLayout } from "@/components/auth/auth-layout";
import { SignUpForm } from "@/components/auth/signup-form";

export default function SignUpPage() {
  return (
    <AuthLayout
      title="新規登録"
      description="新しいアカウントを作成して英語学習を始めましょう"
    >
      <SignUpForm />
    </AuthLayout>
  );
}
