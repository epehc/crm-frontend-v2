import {Candidato} from "@/lib/definitions";
import {Separator} from "@/components/ui/separator";
import AgendarEntrevistaDialog from "@/components/ui/candidato-id/agendar-entrevista-dialog";
import EditarCandidatoInfoDialog from "./edit/editar-candidato-info-dialog";
import GenerarInformeDialog from "./informe/generar-informe-dialog";



export default function CandidatoInfo({ candidato, onEdit }: { candidato: Candidato, onEdit: () => void }) {

    return (
        <div className="flex flex-col space-y-4">
            <div className="w-4/5 flex flex-col space-y-4">
                <p className='text-3xl'><strong> {candidato.nombre}</strong></p>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <p><strong>Género:</strong> {candidato.genero}</p>
                        <p><strong>Puesto Aplicado:</strong> {candidato.puesto_aplicado}</p>
                        <p><strong>Cómo se Enteró:</strong> {candidato.como_se_entero}</p>
                        <p><strong>Aspiración Salarial:</strong> {candidato.aspiracion_salarial}</p>
                    </div>
                    <div>
                        <p><strong>Teléfono WhatsApp:</strong> {candidato.telefono_whatsapp}</p>
                        <p><strong>Teléfono:</strong> {candidato.telefono}</p>
                        <p><strong>Correo:</strong> {candidato.correo}</p>
                        <p><strong>Comentarios:</strong> {candidato.comentarios}</p>
                    </div>
                    <div className='grid grid-cols-1 gap-4 w-[240px]'>
                        <AgendarEntrevistaDialog candidato={candidato} shortVersion={false}/>
                        <GenerarInformeDialog/>
                        <EditarCandidatoInfoDialog candidato={candidato} onEdit={onEdit}/>
                    </div>
                </div>
            </div>
            <Separator/>
        </div>
    )

}