'use client'

import {clsx} from "clsx";
import {Button} from "@/components/ui/button";
import {CalendarIcon, DocumentPlusIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import AgendarEntrevistaDialog from "@/components/ui/candidato-id/agendar-entrevista-dialog";


export default function CandidatoSidenav({setActiveSection}: {setActiveSection: (value: string) => void}) {

    const [activeLink, setActiveLink] = useState('informacion-personal')


    const links = [
        {name: 'Vista de Formulario', value: `vista-de-formulario`},
        {name: 'Informacion Personal', value: `informacion-personal`},
        {name: 'Contactos', value: `contactos`},
        {name: 'Estudios', value: `estudios`},
        {name: 'Experiencia Laboral', value: `experiencia-laboral`},
        {name: 'Mobilidad', value: `mobilidad`},
        {name: 'Residencia', value: `residencia`},
        {name: 'Vicios', value: `vicios`}
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
                        'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer',
                        {
                            'bg-sky-100 text-blue-600': activeLink === link.value,
                        },
                    )}
                >
                    <p className="hidden md:block">{link.name}</p>
                </div>
            ))}
            <div className='grid grid-cols-1 gap-4 mt-8'>
                <AgendarEntrevistaDialog/>
                <Button>
                    <DocumentPlusIcon/>
                    Generar informe
                </Button>
            </div>
        </div>
    )
}