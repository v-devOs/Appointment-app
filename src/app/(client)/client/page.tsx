import { Calendar, Clock, MapPin, Phone, Mail } from "lucide-react";

export default function ClientDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Mis Citas
        </h1>
        <p className="text-gray-500 mt-2">
          Gestiona tus reservaciones y revisa tu historial
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button className="bg-linear-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 text-left hover:opacity-90 transition-opacity">
          <Calendar className="w-8 h-8 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Agendar Nueva Cita</h3>
          <p className="text-blue-100">
            Reserva tu próxima cita en unos cuantos pasos
          </p>
        </button>

        <button className="bg-white border border-gray-200 rounded-lg p-6 text-left hover:bg-gray-50 transition-colors">
          <Clock className="w-8 h-8 mb-3 text-gray-600" />
          <h3 className="text-xl font-semibold mb-2 text-gray-900">Ver Historial</h3>
          <p className="text-gray-500">
            Revisa todas tus citas anteriores
          </p>
        </button>
      </div>

      {/* Upcoming Appointments */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Próximas Citas
          </h2>
          <span className="text-sm text-gray-500">3 pendientes</span>
        </div>

        <div className="space-y-4">
          {[
            {
              date: "Lunes, 28 Feb",
              time: "10:00 AM",
              service: "Corte de cabello",
              business: "Estética Bella",
              address: "Av. Principal 123",
              status: "confirmed"
            },
            {
              date: "Miércoles, 2 Mar",
              time: "14:30 PM",
              service: "Tinte completo",
              business: "Estética Bella",
              address: "Av. Principal 123",
              status: "pending"
            },
            {
              date: "Viernes, 4 Mar",
              time: "11:00 AM",
              service: "Manicure",
              business: "Spa Relax",
              address: "Calle Secundaria 456",
              status: "confirmed"
            },
          ].map((appointment, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-5 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{appointment.service}</p>
                      <p className="text-sm text-gray-500">{appointment.business}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-11">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{appointment.date} - {appointment.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{appointment.address}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-end">
                  <span className={`inline-block px-3 py-1 text-xs rounded-full font-medium ${appointment.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                    }`}>
                    {appointment.status === "confirmed" ? "Confirmada" : "Pendiente"}
                  </span>
                  <button className="text-sm text-red-600 hover:underline">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ¿Necesitas ayuda?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Teléfono</p>
              <p className="font-medium text-gray-900">(555) 123-4567</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white p-2 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium text-gray-900">soporte@appointmentapp.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
