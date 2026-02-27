import Link from "next/link";
import {
  Calendar,
  Users,
  TrendingUp,
  Clock,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Building2
} from "lucide-react";

interface PageProps {
  params: {
    id: string;
  };
}

export default function BusinessDashboardPage({ params }: PageProps) {
  const businessId = params.id;

  // TODO: Obtener datos reales del negocio
  // const result = await getBusinessById(Number(businessId));

  // Datos de prueba (mock)
  const business = {
    id: businessId,
    name: "Estética Bella Vista",
    direction: "Av. Principal 123, Centro",
    tel: "5551234567",
    email: "contacto@bellavista.com",
    hourOpen: "09:00",
    hourClose: "19:00",
  };

  const stats = {
    appointmentsToday: 12,
    appointmentsPending: 3,
    employees: 8,
    employeesActive: 5,
    clients: 234,
    newClientsMonth: 12,
  };

  const upcomingAppointments = [
    {
      id: 1,
      client: "María García",
      service: "Corte de cabello",
      time: "10:00",
      status: "confirmed",
    },
    {
      id: 2,
      client: "Juan Pérez",
      service: "Tinte completo",
      time: "11:00",
      status: "confirmed",
    },
    {
      id: 3,
      client: "Ana López",
      service: "Peinado",
      time: "12:00",
      status: "pending",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header with Back Button */}
      <div>
        <Link
          href="/owner-business"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a mis negocios
        </Link>

        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <Building2 className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {business.name}
              </h1>
              <div className="flex flex-col gap-1 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{business.direction}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{business.tel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span>{business.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            Prueba: 28 días restantes
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Citas Hoy</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.appointmentsToday}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {stats.appointmentsPending} pendientes
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Empleados</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.employees}
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {stats.employeesActive} activos hoy
          </p>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Clientes</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {stats.clients}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-1 mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-green-600 font-medium">
              +{stats.newClientsMonth}
            </span>
            <span className="text-gray-500">este mes</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Horario</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {business.hourOpen}
              </p>
            </div>
            <div className="bg-orange-100 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Abierto hasta {business.hourClose}
          </p>
        </div>
      </div>

      {/* Recent Appointments */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Próximas Citas
          </h2>
          <Link
            href={`/owner-business/${businessId}/appointments`}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Ver todas
          </Link>
        </div>

        <div className="space-y-3">
          {upcomingAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div>
                <p className="font-medium text-gray-900">
                  {appointment.client}
                </p>
                <p className="text-sm text-gray-500">{appointment.service}</p>
              </div>
              <div className="text-right flex items-center gap-3">
                <div>
                  <p className="font-medium text-gray-900">
                    {appointment.time} AM
                  </p>
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${appointment.status === "confirmed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                      }`}
                  >
                    {appointment.status === "confirmed"
                      ? "Confirmada"
                      : "Pendiente"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Acciones Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href={`/owner-business/${businessId}/appointments/new`}
            className="p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-left"
          >
            <Calendar className="w-6 h-6 text-blue-600 mb-2" />
            <p className="font-medium text-gray-900">Agendar Cita</p>
            <p className="text-sm text-gray-500 mt-1">
              Crear nueva cita para un cliente
            </p>
          </Link>

          <Link
            href={`/owner-business/${businessId}/employees`}
            className="p-4 border border-gray-200 rounded-lg hover:bg-purple-50 hover:border-purple-300 transition-colors text-left"
          >
            <Users className="w-6 h-6 text-purple-600 mb-2" />
            <p className="font-medium text-gray-900">Gestionar Empleados</p>
            <p className="text-sm text-gray-500 mt-1">
              Ver y administrar tu equipo
            </p>
          </Link>

          <Link
            href={`/owner-business/${businessId}/clients`}
            className="p-4 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-300 transition-colors text-left"
          >
            <Users className="w-6 h-6 text-green-600 mb-2" />
            <p className="font-medium text-gray-900">Clientes</p>
            <p className="text-sm text-gray-500 mt-1">
              Ver listado de clientes
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
