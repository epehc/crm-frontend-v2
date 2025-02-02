'use client'

import {clsx} from "clsx";
import {Button} from "@/components/ui/button";
import {CalendarIcon, DocumentPlusIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import AgendarEntrevistaDialog from "@/components/ui/candidato-id/agendar-entrevista-dialog";


export default function ClienteSidenav({setActiveSection}: {setActiveSection: (value: string) => void}) {

    const [activeLink, setActiveLink] = useState('personas-de-contacto')


    const links = [
        {name: 'Personas de Contacto', value: `personas-de-contacto`},
        {name: 'Facturas', value: `facturas`},
    ]

    const handleLinkClick = (value: string) => {
        setActiveLink(value)
        setActiveSection(value)
    }

    return(
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 mt-8">
            {links.map((link) => (
                <div
                    key={link.name}
                    onClick={() => handleLinkClick(link.value)}
                    className={clsx(
                        'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-300 md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer',
                        {
                            'bg-gray-300': activeLink === link.value,
                        },
                    )}
                >
                    <p className="hidden md:block">{link.name}</p>
                </div>
            ))}
        </div>
    )
}