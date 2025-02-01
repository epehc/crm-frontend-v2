import {Cliente, PersonaContacto} from "@/lib/definitions";
import {Separator} from "@/components/ui/separator";
import AgendarEntrevistaDialog from "@/components/ui/candidato-id/agendar-entrevista-dialog";
import AgendarEventoDialog from "./agendar-evento-dialog";



export default function ClienteInfo({ cliente, personasContacto }: { cliente: Cliente | null, personasContacto: PersonaContacto[] }) {

    if(!cliente){
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col space-y-4">
            <div className="w-4/5 flex flex-col space-y-4">
                <p className='text-3xl'><strong> {cliente.nombre}</strong></p>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <p><strong>Direccion:</strong> {cliente.direccion}</p>
                        <p><strong>Telefono:</strong> {cliente.telefono}</p>
                        <p><strong>NIT:</strong> {cliente.nit}</p>
                    </div>
                    <div>
                        <p><strong>Saldo pendiente:</strong> {cliente.saldo_pendiente}</p>
                        <p><strong>Credito por dias:</strong> {cliente.credito_por_dias}</p>
                        <p><strong>Saldo vencido:</strong> {cliente.saldo_vencido}</p>
                    </div>
                    <div className='grid grid-cols-1 gap-4 w-[240px]'>
                        <AgendarEventoDialog cliente={cliente} personasContacto={personasContacto}/>
                    </div>
                </div>
            </div>
            <Separator/>
        </div>
    )

}