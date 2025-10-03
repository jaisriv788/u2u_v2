import React from "react";

export default function BlockchainBlocksLoader() {
  const blocks = Array.from({ length: 8 });

  return (
    <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#101220]">
      <div className="flex space-x-2">
        {blocks.map((_, i) => (
          <span
            key={i}
            className="block w-6 h-6 rounded-sm bg-[#04CAFE] animate-block"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <p className="mt-6 text-white tracking-widest text-lg font-semibold">
        Loading <span className="text-[#8FFD9F]">Data…</span>
      </p>

      <style>
        {`
          .animate-block {
            animation: glow 1.2s ease-in-out infinite;
          }
          @keyframes glow {
            0%, 100% { background-color: #04CAFE; transform: scale(1); }
            50%      { background-color: #23A670; transform: scale(1.3); }
          }
        `}
      </style>
    </div>
  );
}
