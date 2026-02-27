import { Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function EmployeeDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Mi Panel de Trabajo
        </h1>
        <p className="text-gray-500 mt-2">
          Gestiona tus citas y clientes
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Citas Hoy</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">2 completadas</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Siguiente Cita</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">10:30</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">En 30 minutos</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completadas</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">45</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Esta semana</p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pendientes</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">6</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">Por atender hoy</p>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Agenda de Hoy
        </h2>
        <div className="space-y-3">
          {[
            { time: "10:30", client: "María García", service: "Corte de cabello", status: "pending" },
            { time: "11:30", client: "Juan Pérez", service: "Tinte", status: "pending" },
            { time: "13:00", client: "Ana López", service: "Peinado", status: "confirmed" },
            { time: "14:30", client: "Carlos Ruiz", service: "Corte + Barba", status: "confirmed" },
          ].map((appointment, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="font-bold text-gray-900">{appointment.time}</p>
                  <p className="text-xs text-gray-500">AM</p>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{appointment.client}</p>
                  <p className="text-sm text-gray-500">{appointment.service}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`inline-block px-3 py-1 text-xs rounded-full ${appointment.status === "confirmed"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                  }`}>
                  {appointment.status === "confirmed" ? "Confirmada" : "Pendiente"}
                </span>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                  Iniciar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
