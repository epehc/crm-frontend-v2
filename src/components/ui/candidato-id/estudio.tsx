'use client'

import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import usePageData from "@/hooks/usePageData";
import { updateEstudio } from "@/services/candidates-service";
import { Button } from '../button';
import { PencilIcon } from '@heroicons/react/24/outline';
import { Estudio } from "@/lib/definitions";

export default function EstudioComponent({estudio}: {estudio: Estudio}) {

    const [editMode, setEditMode] = useState<boolean>(false);
    const { toast } = useToast();
    const {token} = usePageData('dashboard/candidatos')

    const [formData, setFormData] = useState<Estudio>({
        id: estudio.id,
        candidato_id: estudio.candidato_id,
        institucion: estudio.institucion,
        titulo: estudio.titulo,
        grado: estudio.grado,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleDiscard = () => {
        setFormData(estudio);
        setEditMode(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Submitting update with estudio_id:", formData.id);
        console.log("Estudio data:", formData);
        
        try{
            await updateEstudio(formData, token);
            toast({
                title: "Estudio Actualizado",
                description: "La informacion de estudio ha sido actualizada exitosamente",
            });
            setEditMode(false);
        }catch(e){
            console.error("Failed to update Estudio", e);
            toast({
                title: "Error al actualizar Estudio",
                description: "Ocurrio un error al actualizar la informacion de estudio",
            });
        }
    }

    return(
        <div key={estudio.id} className="bg-gray-50 shadow-md rounded-lg p-6">
            <div className="flex justify-end"> 
                <Button size='sm' onClick={() => setEditMode(!editMode)}><PencilIcon/></Button>
            </div>
            <form onSubmit={handleSubmit}>
                {editMode ? (
                    <div className="flex flex-col space-y-4">
                        <div>
                            <Label><strong>Titulo:</strong></Label>
                            <CustomInput name='titulo' value={formData.titulo} onChange={handleChange} readOnly={editMode}/>
                        </div>
                    </div>
                ) : (
                    <h2 className="text-xl font-bold mb-4">{formData.titulo}</h2>
                )}
                <div className='flex flex-col space-y-4'>
                    <div>
                        <Label><strong>Institucion:</strong></Label>
                        <CustomInput name="institucion"value={formData.institucion} onChange={handleChange} readOnly={!editMode}/>
                        <Label><strong>Grado:</strong></Label>
                        <CustomInput name="grado"value={formData.grado} onChange={handleChange} readOnly={!editMode}/>
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