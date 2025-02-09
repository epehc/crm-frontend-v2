import { PersonaContacto } from "@/lib/definitions";
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";
import AddPersonaContactoDialog from "./add-persona-contacto-dialog";
import PersonaContactoComponent from "./persona-contacto";

export default function PersonasContactoComponent({ 
    personasContacto, client_id, onChange }: 
    { personasContacto: PersonaContacto[], 
        client_id: string, 
        onChange: () => void }
    ) {


    return (
        <>
            <div className="mb-6">
                <AddPersonaContactoDialog client_id={client_id} addContacto={onChange}/>
            </div>
            <h2 className="text-3xl font-bold mb-4">Personas de contacto</h2>
            <div className="grid grid-cols-3 gap-4">
                {personasContacto.map((personaContacto:PersonaContacto) => (
                    <PersonaContactoComponent key={personaContacto.persona_contacto_id} personaContacto={personaContacto}/>
                ))}
            </div>
        </>
    )
}