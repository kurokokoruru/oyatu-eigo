"use client";

type GameTimerProps = {
  remainingTime: number;
};

export default function GameTimer({ remainingTime }: GameTimerProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="absolute top-4 right-4 bg-gray-100 px-4 py-2 rounded-lg shadow-md">
      <div className="text-sm text-gray-600">残り時間</div>
      <div
        className={`text-lg font-bold ${remainingTime <= 60 ? "text-red-500" : "text-gray-800"}`}
      >
        {formatTime(remainingTime)}
      </div>
    </div>
  );
}
