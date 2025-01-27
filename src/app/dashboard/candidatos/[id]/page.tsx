'use client'

import {useEffect, useState} from 'react';
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
import {
    getCandidato,
    getContactosByCandidatoId,
    getEstudiosByCandidatoId, getExperienciasLaboralesByCandidatoId,
    getInformacionPersonalByCandidatoId, getMobilidadByCandidatoId, getResidenciaByCandidatoId, getViciosByCandidatoId
} from "@/services/candidates-service";
import {useParams} from "next/navigation";
import {useSession} from "next-auth/react";
import CandidatoInfo from "@/components/ui/candidato-id/candidato-info";


export default function CandidatoPage() {
    const params = useParams();
    const  id  = params?.id as string;
    const {data: session} = useSession();
    const token = session?.accessToken as string;

    const [candidato, setCandidato] = useState<Candidato | null>(null);
    const [informacionPersonal, setInformacionPersonal] = useState<InformacionPersonal | null>(null);
    const [contactos, setContactos] = useState<Contacto[]>([]);
    const [estudios, setEstudios] = useState<Estudio[]>([]);
    const [experienciaLaboral, setExperienciaLaboral] = useState<ExperienciaLaboral[]>([]);
    const [mobilidad, setMobilidad] = useState<Mobilidad | null>(null);;
    const [residencia, setResidencia] = useState<Residencia | null>(null);
    const [vicios, setVicios] = useState<Vicios | null>(null);

    useEffect(() => {
        if(!id || !token){
            console.log('No id or token provided');
            return;
        }

        const fetchCandidato = async () => {
            try {
                const fetchedCandidato = await getCandidato(id, token);
                setCandidato(fetchedCandidato.candidato);
            } catch (error) {
                console.error("Failed to fetch candidate", error);
            }
        };

        fetchCandidato()
        
    }, [id, token]);

    useEffect(() => {
        if(!candidato || !token){
            console.log('Candidato not loaded');
            return;
        }

        const fetchData = async () => {
            try {
                const [
                    fetchedInformacionPersonal,
                    fetchedContactos,
                    fetchedEstudios,
                    fetchedExperienciasLaborales,
                    fetchedMobilidad,
                    fetchedResidencia,
                    fetchedVicios
                ] = await Promise.all([
                    getInformacionPersonalByCandidatoId(candidato.candidato_id, token),
                    getContactosByCandidatoId(candidato.candidato_id, token),
                    getEstudiosByCandidatoId(candidato.candidato_id, token),
                    getExperienciasLaboralesByCandidatoId(candidato.candidato_id, token),
                    getMobilidadByCandidatoId(candidato.candidato_id, token),
                    getResidenciaByCandidatoId(candidato.candidato_id, token),
                    getViciosByCandidatoId(candidato.candidato_id, token)
                ]);

                setInformacionPersonal(fetchedInformacionPersonal);
                setContactos(fetchedContactos);
                setEstudios(fetchedEstudios);
                setExperienciaLaboral(fetchedExperienciasLaborales);
                setMobilidad(fetchedMobilidad);
                setResidencia(fetchedResidencia);
                setVicios(fetchedVicios);
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData()
    }, [candidato, token]);

    return (
        <div>
            <CandidatoInfo candidato={candidato}/>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
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
            </div>
        </div>

    );
}