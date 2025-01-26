import NextAuth from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User {
        id: string;
        roles: string[];
        accessToken?: string;
    }

    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            roles: string[];

        };
        accessToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends NextAuthJWT {
        id: string;
        roles: string[];
        accessToken?: string;
    }
}