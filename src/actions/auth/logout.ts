"use server";

export async function logoutUser() {
  try {
    // El cierre de sesión se maneja desde el cliente usando signOut de next-auth/react
    // Esta función es un placeholder para acciones adicionales si se necesitan
    // Por ejemplo: limpiar cookies, registrar logout en DB, etc.

    return {
      success: true,
      message: "Sesión cerrada exitosamente",
    };
  } catch (error) {
    console.error("Error en logout:", error);
    return {
      success: false,
      error: "Error al cerrar sesión",
    };
  }
}
