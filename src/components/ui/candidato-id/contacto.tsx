'use client'
import { Contacto } from "@/lib/definitions";
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import usePageData from "@/hooks/usePageData";
import { updateContacto } from "@/services/candidates-service";
import { Button } from '../button';
import { PencilIcon } from '@heroicons/react/24/outline';


export default function ContactoComponent({contacto}: {contacto: Contacto}) {

    const [editMode, setEditMode] = useState<boolean>(false);
    const { toast } = useToast();
    const {token} = usePageData('dashboard/candidatos')

    const [formData, setFormData] = useState<Contacto>({
        id: contacto.id,
        candidato_id: contacto.candidato_id,
        nombre: contacto.nombre,
        parentezco: contacto.parentezco,
        trabajo: contacto.trabajo,
        telefono: contacto.telefono
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleDiscard = () => {
        setFormData(contacto);
        setEditMode(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Submitting update with contacto_id:", formData.id);
        console.log("Contacto data:", formData);
        
        try{
            await updateContacto(formData, token);
            toast({
                title: "Contacto Actualizado",
                description: "La informacion de contacto ha sido actualizada exitosamente",
            });
            setEditMode(false);
        }catch(e){
            console.error("Failed to update Contacto", e);
            toast({
                title: "Error al actualizar Contacto",
                description: "Ocurrio un error al actualizar la informacion de contacto",
            });
        }
    }

    return(
        <div key={contacto.id} className="bg-gray-50 shadow-md rounded-lg p-6">
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
                    <h2 className="text-xl font-bold mb-4">{contacto.nombre}</h2>
                )}
                <div className='flex flex-col space-y-4'>
                    <div>
                        <Label><strong>Parentezco:</strong></Label>
                        <CustomInput name="parentezco" value={formData.parentezco} onChange={handleChange} readOnly={!editMode}/>
                        <Label><strong>Trabajo:</strong></Label>
                        <CustomInput name="trabajo" value={formData.trabajo} onChange={handleChange} readOnly={!editMode}/>
                        <Label><strong>Telefono:</strong></Label>
                        <CustomInput name="telefono" value={formData.telefono} onChange={handleChange} readOnly={!editMode}/>
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