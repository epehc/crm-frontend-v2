import { PersonaContacto } from "@/lib/definitions";
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";
import AddPersonaContactoDialog from "./add-persona-contacto-dialog";

export default function PersonasContactoComponent({ 
    personasContacto, client_id, addContacto }: 
    { personasContacto: PersonaContacto[], 
        client_id: string, 
        addContacto: (nuevoContacto: PersonaContacto) => void }
    ) {


    return (
        <>
            <div className="mb-6">
                <AddPersonaContactoDialog client_id={client_id} addContacto={addContacto}/>
            </div>
            <h2 className="text-3xl font-bold mb-4">Personas de contacto</h2>
            <div className="grid grid-cols-3 gap-4">
                {personasContacto.map((personaContacto:PersonaContacto) => (
                    <div key={personaContacto.persona_contacto_id} className="bg-gray-50 shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">{personaContacto.nombre}</h2>
                        <div className='flex flex-col space-y-4'>
                            <div>
                                <Label><strong>Telefono:</strong></Label>
                                <CustomInput value={personaContacto.telefono} readOnly={true}/>
                                <Label><strong>Correo:</strong></Label>
                                <CustomInput value={personaContacto.correo} readOnly={true}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}