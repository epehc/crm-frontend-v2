'use client'

import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import usePageData from "@/hooks/usePageData";
import { Button } from '../button';
import { PencilIcon } from '@heroicons/react/24/outline';
import { PersonaContacto } from "@/lib/definitions";
import { updatePersonaContacto } from "@/services/clients-service";

export default function PersonaContactoComponent({personaContacto}: {personaContacto: PersonaContacto}) {

    const [editMode, setEditMode] = useState<boolean>(false);
    const { toast } = useToast();
    const {token} = usePageData('dashboard/clientes')

    const [formData, setFormData] = useState<PersonaContacto>({
        persona_contacto_id: personaContacto.persona_contacto_id,
        client_id: personaContacto.client_id,
        nombre: personaContacto.nombre,
        telefono: personaContacto.telefono,
        correo: personaContacto.correo,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleDiscard = () => {
        setFormData(personaContacto);
        setEditMode(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Submitting update with persona_contacto_id:", formData.persona_contacto_id);
        console.log("Persona de contacto data:", formData);
        
        try{
            await updatePersonaContacto(formData, token);
            toast({
                title: "Persona de contacto Actualizada",
                description: "La informacion de la persona de contacto ha sido actualizada exitosamente",
            });
            setEditMode(false);
        }catch(e){
            console.error("Failed to update Persona de contacto", e);
            toast({
                title: "Error al actualizar Persona de contacto",
                description: "Ocurrio un error al actualizar la informacion de la persona de contacto",
            });
        }
    }

    return(
        <div key={personaContacto.persona_contacto_id} className="bg-gray-50 shadow-md rounded-lg p-6">
            <div className="flex justify-end"> 
                <Button size='sm' onClick={() => setEditMode(!editMode)}><PencilIcon/></Button>
            </div>
            <form onSubmit={handleSubmit}>
                {editMode ? (
                    <div className="flex flex-col space-y-4">
                        <div>
                            <Label><strong>Nombre:</strong></Label>
                            <CustomInput name='nombre' value={formData.nombre} onChange={handleChange} readOnly={editMode}/>
                        </div>
                    </div>
                ) : (
                    <h2 className="text-xl font-bold mb-4">{formData.nombre}</h2>
                )}
                <div className='flex flex-col space-y-4'>
                    <div>
                        <Label><strong>Telefono:</strong></Label>
                        <CustomInput name="telefono" value={formData.telefono} onChange={handleChange} readOnly={!editMode}/>
                        <Label><strong>Correo:</strong></Label>
                        <CustomInput name="correo" value={formData.correo} onChange={handleChange} readOnly={!editMode}/>
                    </div>
                </div>
                {editMode && 
                    <div className="flex justify-end mt-4 gap-4">
                        <Button variant='destructive' onClick={handleDiscard}>Cancelar</Button>    
                        <Button type='submit'>Guardar</Button>    
                    </div>
                }
                </form>
        </div>
    )
}
