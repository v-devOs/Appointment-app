import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

export default function ClientProfilePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Mi Perfil
        </h1>
        <p className="text-gray-500 mt-2">
          Gestiona tu información personal
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-linear-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Juan Pérez
              </h3>
              <p className="text-gray-500 text-sm mt-1">Cliente</p>

              <div className="mt-6 w-full space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">juan.perez@email.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Cliente desde Feb 2026</span>
                </div>
              </div>

              <button className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Editar Perfil
              </button>
            </div>
          </div>
        </div>

        {/* Information Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Información Personal
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    defaultValue="Juan"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido Paterno
                  </label>
                  <input
                    type="text"
                    defaultValue="Pérez"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido Materno
                  </label>
                  <input
                    type="text"
                    defaultValue="González"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    defaultValue="5551234567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    defaultValue="juan.perez@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Estadísticas
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Total de Citas</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">24</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Citas Completadas</p>
                    <p className="text-2xl font-bold text-green-600 mt-1">22</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Próximas Citas</p>
                    <p className="text-2xl font-bold text-purple-600 mt-1">3</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
