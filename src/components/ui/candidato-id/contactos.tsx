import {Contacto} from "@/lib/definitions";
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";
import ContactoComponent from "./contacto";

export default function ContactosComponent({ contactos }: { contactos: Contacto[] }) {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Contactos</h2>
            <div className="grid grid-cols-3 gap-4">
                {contactos.map((contacto:Contacto) => (
                    <ContactoComponent contacto={contacto} key={contacto.id}/>
                ))}
            </div>
        </div>
    )
}