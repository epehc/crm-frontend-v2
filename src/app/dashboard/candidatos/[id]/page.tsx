'use client'

import {useEffect, useState} from 'react';
import {
    Candidato,
    CandidatoData,
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
import CandidatoInfo from "@/components/ui/candidato-id/candidato-info";
import usePageData from '@/hooks/usePageData';
import { useCandidatoDataContext } from '@/contexts/useCandidatoDataContext';


export default function CandidatoPage() {
    const params = useParams();
    const  id  = params?.id as string;
    const {token} = usePageData('/dashboard/candidatos/[id]');

    const [refresh, setRefresh] = useState<number>(0);

    const [candidato, setCandidato] = useState<Candidato | null>(null);
    const [informacionPersonal, setInformacionPersonal] = useState<InformacionPersonal | null>(null);
    const [contactos, setContactos] = useState<Contacto[]>([]);
    const [estudios, setEstudios] = useState<Estudio[]>([]);
    const [experienciaLaboral, setExperienciaLaboral] = useState<ExperienciaLaboral[]>([]);
    const [mobilidad, setMobilidad] = useState<Mobilidad | null>(null);;
    const [residencia, setResidencia] = useState<Residencia | null>(null);
    const [vicios, setVicios] = useState<Vicios | null>(null);

    const {setData} = useCandidatoDataContext()

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

                const candidatoData: CandidatoData = {
                    candidato,
                    informacionPersonal: fetchedInformacionPersonal,
                    contactos: fetchedContactos,
                    estudios: fetchedEstudios,
                    experienciaLaboral: fetchedExperienciasLaborales,
                    mobilidad: fetchedMobilidad,
                    residencia: fetchedResidencia,
                    vicios: fetchedVicios
                }

                setData(candidatoData)
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData()
    }, [candidato, token, refresh, setData]);

    const handleRefresh = () => {
        setRefresh(prev => prev + 1);
    }

    return (
        <div>
            {candidato ? (        
                <CandidatoInfo candidato={candidato} onEdit={handleRefresh}/>
                ) : (
                    <p>Loading candidato...</p>
                )
            }
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
                    {informacionPersonal ? (
                        <InformacionPersonalComponent informacionPersonal={informacionPersonal} />
                            ) : (
                        <p>Loading información personal...</p>
                    )}
                    <Separator className='mt-5 mb-5'/>
                    {contactos ? (
                        <ContactosComponent contactos={contactos} />
                    ) : (
                        <p>Loading contactos...</p>
                    )}
                    <Separator className='mt-5 mb-5'/>
                    {estudios ? (
                        <EstudiosComponent estudios={estudios} />
                    ) : (
                        <p>Loading estudios...</p>
                    )}
                    <Separator className='mt-5 mb-5'/>
                    {experienciaLaboral ? (
                        <ExperienciaLaboralComponent experienciaLaboral={experienciaLaboral} />
                    ) : (
                        <p>Loading experiencia laboral...</p>
                    )}
                    <Separator className='mt-5 mb-5'/>
                    {mobilidad ? (
                        <MobilidadComponent mobilidad={mobilidad} />
                    ) : (
                        <p>Loading mobilidad...</p>
                    )}
                    <Separator className='mt-5 mb-5'/>
                    {residencia ? (
                        <ResidenciaComponent residencia={residencia} />
                    ) : (
                        <p>Loading residencia...</p>
                    )}
                    <Separator className='mt-5 mb-5'/>
                    {vicios ? (
                        <ViciosComponent vicios={vicios} />
                    ) : (
                        <p>Loading vicios...</p>
                    )}
                </div>
            </div>
        </div>

    );
}