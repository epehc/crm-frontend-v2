'use client'

import { useState } from 'react';
import CandidatoSidenav from '@/components/ui/candidato-id/candidato-sidenav';
import {
    dummyCandidatos,
    dummyContactos, dummyEstudios, dummyExperienciasLaborales,
    dummyInformacionPersonal,
    dummyMobilidad,
    dummyResidencias, dummyVicios
} from '@/lib/dummy-data';
import {
    Candidato,
    Contacto,
    Estudio,
    ExperienciaLaboral,
    InformacionPersonal,
    Mobilidad,
    Residencia, Vicios
} from '@/lib/definitions';
import InformacionPersonalComponent from "@/components/ui/candidato-id/informacion-personal";
import MobilidadComponent from "@/components/ui/candidato-id/mobilidad";
import ResidenciaComponent from "@/components/ui/candidato-id/residencia";
import ViciosComponent from "@/components/ui/candidato-id/vicios";
import ContactosComponent from "@/components/ui/candidato-id/contactos";
import EstudiosComponent from "@/components/ui/candidato-id/estudios";
import ExperienciaLaboralComponent from "@/components/ui/candidato-id/experiencia-laboral";
import {Separator} from "@/components/ui/separator";

export default function CandidatoPage() {
    const [activeSection, setActiveSection] = useState('informacion-personal');
    const candidato: Candidato = dummyCandidatos[0];
    const informacionPersonal: InformacionPersonal = dummyInformacionPersonal[0]
    const contactos: Contacto[] = dummyContactos
    const estudios: Estudio[] = dummyEstudios
    const experienciaLaboral: ExperienciaLaboral[] = dummyExperienciasLaborales
    const mobilidad: Mobilidad = dummyMobilidad[0]
    const residencia: Residencia = dummyResidencias[0]
    const vicios: Vicios = dummyVicios[0]

    const renderContent = () => {
        switch (activeSection) {
            case 'vista-de-formulario':
                return (
                    <div>
                        <InformacionPersonalComponent informacionPersonal={informacionPersonal} />
                        <Separator className='mt-5 mb-5'/>
                        <ContactosComponent contactos={contactos}/>
                        <Separator className='mt-5 mb-5'/>
                        <EstudiosComponent estudios={estudios}/>
                        <Separator className='mt-5 mb-5'/>
                        <ExperienciaLaboralComponent experienciaLaboral={experienciaLaboral}/>
                        <Separator className='mt-5 mb-5'/>
                        <MobilidadComponent mobilidad={mobilidad} />
                        <Separator className='mt-5 mb-5'/>
                        <ResidenciaComponent residencia={residencia} />
                        <Separator className='mt-5 mb-5'/>
                        <ViciosComponent vicios={vicios}/>
                    </div>
                );
            case 'informacion-personal':
                return <InformacionPersonalComponent informacionPersonal={informacionPersonal} />;
            case 'contactos':
                return <ContactosComponent contactos={contactos}/>;
            case 'estudios':
                return <EstudiosComponent estudios={estudios}/>;
            case 'experiencia-laboral':
                return <ExperienciaLaboralComponent experienciaLaboral={experienciaLaboral}/>;
            case 'mobilidad':
                return <MobilidadComponent mobilidad={mobilidad} />;
            case 'residencia':
                return <ResidenciaComponent residencia={residencia} />;
            case 'vicios':
                return <ViciosComponent vicios={vicios}/>;
            default:
                return null;
        }
    };

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
                <CandidatoSidenav setActiveSection={setActiveSection} />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                {renderContent()}
            </div>
        </div>
    );
}