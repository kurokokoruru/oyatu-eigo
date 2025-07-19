import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description?: string;
};

export const AuthLayout = ({
  children,
  title,
  description,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-orange-100">
      <div className="max-w-md w-full space-y-8 p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">おやつ英語</h1>
          <h2 className="mt-6 text-xl font-semibold text-gray-600">{title}</h2>
          {description && (
            <p className="mt-2 text-sm text-gray-500">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};
