'use client';

import {
    CalendarIcon,
    DocumentDuplicateIcon,
    HomeIcon,
    ListBulletIcon,
    UserGroupIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
//import {useSession} from "next-auth/react";

export default function NavLinks(/*{ roles }: { roles: string[] }*/) {
    const pathname = usePathname();

    //const { data: session } = useSession();

    const links = [
        //{ name: 'Home', href: '/dashboard', icon: HomeIcon, roles:[] },
        { name: 'Candidatos', href: '/dashboard/candidatos', icon: ListBulletIcon, roles: [] },
        { name: 'Calendario', href: '/dashboard/calendario', icon: CalendarIcon, roles: [] },
        { name: 'Facturas', href: '/dashboard/facturas', icon: DocumentDuplicateIcon, roles: []},
        { name: 'Clientes', href: '/dashboard/clientes', icon: UserGroupIcon, roles: [] },
    ]

    /*const filteredLinks = links.filter((link) =>
        link.roles.length === 0 || link.roles.some((role) => roles.includes(role))
    );*/

    return(
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return(
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
                            {
                                'bg-sky-100 text-blue-600': pathname === link.href,
                            },
                        )}>
                        <LinkIcon className="w-6" />
                        <p className="hidden md:block">{link.name}</p>
                    </Link>
                )
            })
            }
        </>
    )
}