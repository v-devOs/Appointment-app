interface ProgressIndicatorProps {
  currentStep: number;
  steps: string[];
}

export function ProgressIndicator({
  currentStep,
  steps,
}: ProgressIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-20 rounded-full transition-all duration-300 ${currentStep >= index + 1
                ? "bg-linear-to-r from-blue-600 to-purple-600"
                : "bg-gray-300 dark:bg-gray-700"
              }`}
          />
        ))}
      </div>
      <div
        className={`flex items-center justify-center ${steps.length === 3 ? "gap-6" : "gap-8"
          } mt-2`}
      >
        {steps.map((label, index) => (
          <span
            key={index}
            className={`text-xs font-medium ${currentStep === index + 1
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400"
              }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
