import Link from "next/link";
import { Building2, MapPin, Clock, Users, Plus } from "lucide-react";

export default function OwnerBusinessListPage() {
  // TODO: Obtener el ID del usuario desde la sesión
  // const session = await getServerSession();
  // const result = await getBusinessByOwner(session.user.id);

  // Datos de prueba (mock)
  const businesses = [
    {
      id: 1,
      name: "Estética Bella Vista",
      direction: "Av. Principal 123, Centro",
      tel: "5551234567",
      email: "contacto@bellavista.com",
      hourOpen: "09:00",
      hourClose: "19:00",
      employees: 8,
      clients: 234,
    },
    {
      id: 2,
      name: "Spa & Salón Relax",
      direction: "Calle Secundaria 456, Col. Norte",
      tel: "5559876543",
      email: "info@sparelax.com",
      hourOpen: "10:00",
      hourClose: "20:00",
      employees: 5,
      clients: 156,
    },
    {
      id: 3,
      name: "Barbería El Clásico",
      direction: "Blvd. Insurgentes 789, Col. Sur",
      tel: "5555555555",
      email: "barberiaclasico@gmail.com",
      hourOpen: "08:00",
      hourClose: "18:00",
      employees: 3,
      clients: 89,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Mis Negocios
          </h1>
          <p className="text-gray-500 mt-2">
            Selecciona un negocio para gestionar
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-5 h-5" />
          Nuevo Negocio
        </button>
      </div>

      {/* Business Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <Link
            key={business.id}
            href={`/owner-business/${business.id}`}
            className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                Activo
              </span>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              {business.name}
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex items-start gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{business.direction}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{business.hourOpen} - {business.hourClose}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Empleados</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <p className="text-lg font-semibold text-gray-900">
                      {business.employees}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Clientes</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Users className="w-4 h-4 text-gray-400" />
                    <p className="text-lg font-semibold text-gray-900">
                      {business.clients}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-blue-600 group-hover:text-blue-700 font-medium flex items-center gap-1">
              Ver dashboard
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State (if no businesses) */}
      {businesses.length === 0 && (
        <div className="bg-white rounded-lg p-12 border border-gray-200 text-center">
          <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No tienes negocios registrados
          </h3>
          <p className="text-gray-500 mb-6">
            Crea tu primer negocio para comenzar a gestionar citas
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Crear mi primer negocio
          </button>
        </div>
      )}
    </div>
  );
}
