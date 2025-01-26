import {Contacto} from "@/lib/definitions";
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";

export default function ContactosComponent({ contactos }: { contactos: Contacto[] }) {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Contactos</h2>
            <div className="grid grid-cols-3 gap-4">
                {contactos.map((contacto:Contacto) => (
                    <div key={contacto.id} className="bg-gray-50 shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">{contacto.nombre}</h2>
                        <div className='flex flex-col space-y-4'>
                            <div>
                                <Label><strong>Parentezco:</strong></Label>
                                <CustomInput value={contacto.parentezco} readOnly={true}/>
                                <Label><strong>Trabajo:</strong></Label>
                                <CustomInput value={contacto.trabajo} readOnly={true}/>
                                <Label><strong>Telefono:</strong></Label>
                                <CustomInput value={contacto.telefono} readOnly={true}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}