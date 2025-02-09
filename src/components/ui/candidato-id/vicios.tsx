'use client'

import {Vicios} from "@/lib/definitions";
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";
import { Button } from '../button';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import usePageData from "@/hooks/usePageData";
import { updateVicios } from "@/services/candidates-service";

export default function ViciosComponent({vicios}: {vicios: Vicios}) {

    const [editMode, setEditMode] = useState<boolean>(false);
    const { toast } = useToast();
    const {token} = usePageData('dashboard/candidatos')

    const [formData, setFormData] = useState<Vicios>({
        candidato_id: vicios.candidato_id,
        fuma: vicios.fuma,
        alcohol: vicios.alcohol,
        alcohol_frecuencia: vicios.alcohol_frecuencia,
        drogas: vicios.drogas,
        tatuajes: vicios.tatuajes
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleDiscard = () => {
        setFormData(vicios);
        setEditMode(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Submitting update with candidato_id:", formData.candidato_id);
        console.log("Informacion Personal data:", formData);

        try{
            await updateVicios(formData, token);
            toast({
                title: "Vicios Actualizados",
                description: "La informacion de vicios ha sido actualizada exitosamente",
            });
            setEditMode(false);
        }catch(e){
            console.error("Failed to update Vicios", e);
            toast({
                title: "Error al actualizar Vicios",
                description: "Ocurrio un error al actualizar la informacion de vicios",
            });
        }
    }

    return(
        <div>
            <h2 className="text-3xl font-bold mb-4">Vicios</h2>
            <div className="bg-gray-50 shadow-md rounded-lg p-6 w-4/5">
                <div className="flex justify-end"> 
                    <Button size='sm' onClick={() => setEditMode(!editMode)}><PencilIcon/></Button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col space-y-4'>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label><strong>Fuma:</strong></Label>
                                <CustomInput name="fuma" value={formData.fuma} onChange={handleChange} readOnly={!editMode}/>
                                <Label><strong>Alcohol:</strong></Label>
                                <CustomInput name="alcohol" value={formData.alcohol} onChange={handleChange} readOnly={!editMode}/>
                                <Label><strong>Alcohol Frecuencia:</strong></Label>
                                <CustomInput name="alcohol_frecuencia" value={formData.alcohol_frecuencia} onChange={handleChange} readOnly={!editMode}/>
                            </div>
                            <div>
                                <Label><strong>Drogas:</strong></Label>
                                <CustomInput name="drogas" value={formData.drogas} onChange={handleChange} readOnly={!editMode}/>
                                <Label><strong>Tatuajes:</strong></Label>
                                <CustomInput name="tatuajes" value={formData.tatuajes} onChange={handleChange} readOnly={!editMode}/>
                            </div>
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
        </div>
    )
}