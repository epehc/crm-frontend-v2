'use client';

import {
    CalendarIcon,
    DocumentDuplicateIcon,
    //HomeIcon,
    ListBulletIcon,
    UserGroupIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {useSession} from "next-auth/react";

export default function NavLinks(/* { roles }: { roles: string[] } */) {
    const pathname = usePathname();

    const { data: session } = useSession();
    const roles = session?.user?.roles as string[];

    const links = [
        //{ name: 'Home', href: '/dashboard', icon: HomeIcon, roles:[] },
        { name: 'Candidatos', href: '/dashboard/candidatos', icon: ListBulletIcon, roles: [] },
        { name: 'Calendario', href: '/dashboard/calendario', icon: CalendarIcon, roles: [] },
        { name: 'Facturas', href: '/dashboard/facturas', icon: DocumentDuplicateIcon, roles: []},
        { name: 'Clientes', href: '/dashboard/clientes', icon: UserGroupIcon, roles: [] },
    ]

    const filteredLinks = links.filter((link) =>
        link.roles.length === 0 || link.roles.some((role) => roles.includes(role))
    );

    return(
        <>
            {filteredLinks.map((link) => {
                const LinkIcon = link.icon;
                return(
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            'flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-gray-300 md:flex-none md:justify-start md:p-2 md:px-3',
                            pathname?.includes(link.href) ? 'bg-gray-300' : 'bg-gray-50'
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