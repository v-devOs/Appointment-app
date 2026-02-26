import { User, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PersonalInfoStepProps {
  firstName: string;
  secondName: string;
  lastNameP: string;
  lastNameM: string;
  personalTel: string;
  loading: boolean;
  error: string;
  onFirstNameChange: (value: string) => void;
  onSecondNameChange: (value: string) => void;
  onLastNamePChange: (value: string) => void;
  onLastNameMChange: (value: string) => void;
  onPersonalTelChange: (value: string) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function PersonalInfoStep({
  firstName,
  secondName,
  lastNameP,
  lastNameM,
  personalTel,
  loading,
  error,
  onFirstNameChange,
  onSecondNameChange,
  onLastNamePChange,
  onLastNameMChange,
  onPersonalTelChange,
  onBack,
  onSubmit,
}: PersonalInfoStepProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Names Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* First Name */}
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Primer Nombre *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="firstName"
              type="text"
              required
              minLength={5}
              value={firstName}
              onChange={(e) => onFirstNameChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
              placeholder="Juan"
            />
          </div>
        </div>

        {/* Second Name (Optional) */}
        <div>
          <label
            htmlFor="secondName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Segundo Nombre
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="secondName"
              type="text"
              value={secondName}
              onChange={(e) => onSecondNameChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
              placeholder="Carlos"
            />
          </div>
        </div>
      </div>

      {/* Last Names Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Last Name P */}
        <div>
          <label
            htmlFor="lastNameP"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Apellido Paterno *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="lastNameP"
              type="text"
              required
              minLength={5}
              value={lastNameP}
              onChange={(e) => onLastNamePChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
              placeholder="García"
            />
          </div>
        </div>

        {/* Last Name M (Optional) */}
        <div>
          <label
            htmlFor="lastNameM"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Apellido Materno
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="lastNameM"
              type="text"
              value={lastNameM}
              onChange={(e) => onLastNameMChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
              placeholder="López"
            />
          </div>
        </div>
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="personalTel"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Teléfono Personal *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            id="personalTel"
            type="tel"
            required
            maxLength={10}
            value={personalTel}
            onChange={(e) => onPersonalTelChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
            placeholder="1234567890"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          10 dígitos máximo
        </p>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button
          type="button"
          onClick={onBack}
          disabled={loading}
          className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <ArrowLeft className="h-5 w-5" />
          Atrás
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Completando..." : "Completar registro"}
        </Button>
      </div>
    </form>
  );
}
