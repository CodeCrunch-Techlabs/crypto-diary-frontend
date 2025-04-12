// components/Loader.tsx
export default function Loader({ message = "loading..." }: { message?: string }) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center py-12 space-y-4">
        <div className="w-64 h-32 bg-neutral-100 dark:bg-neutral-900 rounded-lg p-4 font-mono text-sm 
          border border-neutral-300 dark:border-[#22c55e]/50 relative overflow-hidden">
  
          {/* Top Circles */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
  
          {/* Terminal Line */}
          <div className="text-neutral-800 dark:text-[#22c55e] typing-animation">
            <span className="inline-block">
              $ {message}<span className="blink">_</span>
            </span>
          </div>
  
          {/* Progress Dots */}
          <div className="mt-2 flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-neutral-600 dark:bg-[#22c55e]/70 animate-pulse"></div>
            <div className="w-1 h-1 rounded-full bg-neutral-600 dark:bg-[#22c55e]/70 animate-pulse delay-100"></div>
            <div className="w-1 h-1 rounded-full bg-neutral-600 dark:bg-[#22c55e]/70 animate-pulse delay-200"></div>
          </div>
        </div>
      </div>
    );
  }
  