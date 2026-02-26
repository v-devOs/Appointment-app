import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface BusinessInfoStepProps {
  businessName: string;
  businessEmail: string;
  businessTel: string;
  businessDirection: string;
  hourOpen: string;
  hourClose: string;
  loading: boolean;
  error: string;
  onBusinessNameChange: (value: string) => void;
  onBusinessEmailChange: (value: string) => void;
  onBusinessTelChange: (value: string) => void;
  onBusinessDirectionChange: (value: string) => void;
  onHourOpenChange: (value: string) => void;
  onHourCloseChange: (value: string) => void;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function BusinessInfoStep({
  businessName,
  businessEmail,
  businessTel,
  businessDirection,
  hourOpen,
  hourClose,
  loading,
  error,
  onBusinessNameChange,
  onBusinessEmailChange,
  onBusinessTelChange,
  onBusinessDirectionChange,
  onHourOpenChange,
  onHourCloseChange,
  onBack,
  onSubmit,
}: BusinessInfoStepProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Business Name */}
      <div>
        <label
          htmlFor="businessName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Nombre del Negocio *
        </label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            id="businessName"
            type="text"
            required
            minLength={8}
            value={businessName}
            onChange={(e) => onBusinessNameChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
            placeholder="Mi Negocio"
          />
        </div>
      </div>

      {/* Business Email & Phone Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Business Email */}
        <div>
          <label
            htmlFor="businessEmail"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email del Negocio
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="businessEmail"
              type="email"
              value={businessEmail}
              onChange={(e) => onBusinessEmailChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
              placeholder="negocio@email.com"
            />
          </div>
        </div>

        {/* Business Phone */}
        <div>
          <label
            htmlFor="businessTel"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Teléfono *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="businessTel"
              type="tel"
              required
              maxLength={10}
              value={businessTel}
              onChange={(e) => onBusinessTelChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
              placeholder="1234567890"
            />
          </div>
        </div>
      </div>

      {/* Business Address */}
      <div>
        <label
          htmlFor="businessDirection"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Dirección *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            id="businessDirection"
            type="text"
            required
            minLength={10}
            value={businessDirection}
            onChange={(e) => onBusinessDirectionChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400"
            placeholder="Calle Principal #123"
          />
        </div>
      </div>

      {/* Business Hours Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Opening Time */}
        <div>
          <label
            htmlFor="hourOpen"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Hora de Apertura *
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="hourOpen"
              type="time"
              required
              value={hourOpen}
              onChange={(e) => onHourOpenChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>

        {/* Closing Time */}
        <div>
          <label
            htmlFor="hourClose"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Hora de Cierre *
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="hourClose"
              type="time"
              required
              value={hourClose}
              onChange={(e) => onHourCloseChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
        </div>
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
          className="flex-1 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          Continuar
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
