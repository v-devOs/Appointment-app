import "next-auth";
import { TypeUser } from "@/app/generated/prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      typeUser: TypeUser;
    };
  }

  interface User {
    id: string;
    email: string;
    typeUser: TypeUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    typeUser: TypeUser;
  }
}
