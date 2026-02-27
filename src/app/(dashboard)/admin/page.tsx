import { Users, Building2, Calendar, TrendingUp } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Panel de Administración
        </h1>
        <p className="text-gray-500 mt-2">
          Vista general del sistema
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Usuarios</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">1,234</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">+12%</span>
            <span className="text-gray-500">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Negocios Activos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">456</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">+8%</span>
            <span className="text-gray-500">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Citas del Mes</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">8,432</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">+23%</span>
            <span className="text-gray-500">vs mes anterior</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Ingresos</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">$24,789</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">+15%</span>
            <span className="text-gray-500">vs mes anterior</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <p className="font-medium text-gray-900">Gestionar Usuarios</p>
            <p className="text-sm text-gray-500 mt-1">
              Ver y administrar cuentas de usuario
            </p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <p className="font-medium text-gray-900">Ver Suscripciones</p>
            <p className="text-sm text-gray-500 mt-1">
              Gestionar planes y pagos
            </p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <p className="font-medium text-gray-900">Reportes</p>
            <p className="text-sm text-gray-500 mt-1">
              Generar reportes del sistema
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
