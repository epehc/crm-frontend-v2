'use client'

import {clsx} from "clsx";



interface ClienteSidenavProps {
    activeSection: string;
    setActiveSection: (value: string) => void;
}

export default function ClienteSidenav({ activeSection, setActiveSection }: ClienteSidenavProps) {
    const links = [
    { name: 'Personas de Contacto', value: 'personas-de-contacto' },
    { name: 'Facturas', value: 'facturas' },
    ];

    const handleLinkClick = (value: string) => {
        setActiveSection(value);
    };

    return(
        <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2 mt-8">
            {links.map((link) => (
                <div
                    key={link.name}
                    onClick={() => handleLinkClick(link.value)}
                    className={clsx(
                        'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-gray-300 md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer',
                        activeSection === link.value ? 'bg-gray-300' : 'bg-gray-50'
                    )}>
                    <p className="hidden md:block">{link.name}</p>
                </div>
            ))}
        </div>
    )
}