'use client'

import ClienteInfo from "@/components/ui/cliente-id/cliente-info";
import ClienteSidenav from "@/components/ui/cliente-id/cliente-sidenav";
import PersonasContactoComponent from "@/components/ui/cliente-id/personas-contacto";
import { Cliente, PersonaContacto } from "@/lib/definitions";
import { getClienteByClienteId } from "@/services/clients-service";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getPersonasContactoByClienteId } from "@/services/clients-service";
import ClienteFacturasTable from "@/components/ui/cliente-id/cliente-facturas-table";



export default function ClientePage() {
    const params = useParams();
    const client_id  = params?.id as string;
    const {data: session} = useSession();
    const token = session?.accessToken as string;

    const [cliente, setCliente] = useState<Cliente | null>(null);
    const [personasContacto, setPersonasContacto] = useState<PersonaContacto[]>([])

    const [activeSelection, setActiveSelection] = useState('personas-de-contacto');

    const [refresh, setRefresh] = useState<number>(0);

    useEffect(() => {
        if(!client_id || !token){
            console.log('No id or token provided');
            return;
        }

        const fetchCliente = async () => {
            try {
                const fetchedCliente = await getClienteByClienteId(client_id, token);
                setCliente(fetchedCliente);
            } catch (error) {
                console.error("Failed to fetch cliente", error);
            }
        };

        fetchCliente()
        
    }, [client_id, token, refresh]);

    useEffect(() => {
        if(!cliente || !token){
            console.log('No id or token provided');
            return;
        }

        const fetchPersonasContacto = async () => {
            try {
                const fetchedPersonasContacto = await getPersonasContactoByClienteId(cliente.client_id, token);
                setPersonasContacto(fetchedPersonasContacto);
            } catch (error) {
                console.error("Failed to fetch personas contacto", error);
            }
        };

        fetchPersonasContacto()

    }, [cliente, token]);

    const onChange = () => {
        console.log("refreshing....")
        setRefresh(refresh + 1);
    }

    const renderContent = () => {
        switch(activeSelection){
            case 'facturas':
                return <ClienteFacturasTable cliente={cliente} onChange={onChange} refresh={refresh}/>
            case 'personas-de-contacto':
                return <PersonasContactoComponent client_id={client_id} personasContacto={personasContacto} onChange={onChange}/>
            default:
                return <div>Personas de contacto</div>
        }
    
    }

    return (
        <div>
            <ClienteInfo cliente={cliente} personasContacto={personasContacto} onEdit={onChange}/>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-64">
                    <ClienteSidenav setActiveSection={setActiveSelection}/>
                </div>
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{renderContent()}</div>
            </div>
        </div>
    )
}