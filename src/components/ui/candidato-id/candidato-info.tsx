import {Button} from "@/components/ui/button";
import {CalendarIcon, DocumentPlusIcon} from "@heroicons/react/24/outline";
import {Candidato} from "@/lib/definitions";
import {Separator} from "@/components/ui/separator";



export default function CandidatoInfo({ candidato }: { candidato: Candidato }) {
    return (
        <div className="flex flex-col space-y-4">
            <div className="w-4/5 flex flex-col space-y-4">
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <p><strong>Nombre:</strong> {candidato.nombre}</p>
                        <p><strong>Género:</strong> {candidato.genero}</p>
                        <p><strong>Puesto Aplicado:</strong> {candidato.puesto_aplicado}</p>
                    </div>
                    <div>
                        <p><strong>Teléfono WhatsApp:</strong> {candidato.telefono_whatsapp}</p>
                        <p><strong>Teléfono:</strong> {candidato.telefono}</p>
                        <p><strong>Correo:</strong> {candidato.correo}</p>
                    </div>
                    <div>
                        <p><strong>Cómo se Enteró:</strong> {candidato.como_se_entero}</p>
                        <p><strong>Aspiración Salarial:</strong> {candidato.aspiracion_salarial}</p>
                    </div>

                </div>
            </div>
            <Separator/>
        </div>
    )

}