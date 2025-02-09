'use client'

import { ExperienciaLaboral } from "@/lib/definitions";
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import usePageData from "@/hooks/usePageData";
import { updateContacto, updateExperienciaLaboral } from "@/services/candidates-service";
import { Button } from '../button';
import { PencilIcon } from '@heroicons/react/24/outline';
import {Textarea} from "@/components/ui/textarea";


export default function TrabajoComponent({trabajo}: {trabajo: ExperienciaLaboral}) {

    const [editMode, setEditMode] = useState<boolean>(false);
    const { toast } = useToast();
    const {token} = usePageData('dashboard/candidatos')

    const [formData, setFormData] = useState<ExperienciaLaboral>({
        id: trabajo.id,
        candidato_id: trabajo.candidato_id,
        empresa: trabajo.empresa,
        puesto: trabajo.puesto,
        fecha_inicio: trabajo.fecha_inicio,
        fecha_fin: trabajo.fecha_fin,
        telefono_empresa: trabajo.telefono_empresa,
        direccion_empresa: trabajo.direccion_empresa,
        jefe_nombre: trabajo.jefe_nombre,
        jefe_telefono: trabajo.jefe_telefono,
        motivo_salida: trabajo.motivo_salida,
        responsabilidades: trabajo.responsabilidades,
        salario: trabajo.salario
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleDiscard = () => {
        setFormData(trabajo);
        setEditMode(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Submitting update with trabajo_id:", formData.id);
        console.log("Trabajo data:", formData);
        
        try{
            await updateExperienciaLaboral(formData, token);
            toast({
                title: "Trabajo Actualizado",
                description: "La informacion de trabajo ha sido actualizada exitosamente",
            });
            setEditMode(false);
        }catch(e){
            console.error("Failed to update Trabajo", e);
            toast({
                title: "Error al actualizar Trabajo",
                description: "Ocurrio un error al actualizar la informacion de trabajo",
            });
        }
    }

    return (
        <div className="bg-gray-50 shadow-md rounded-lg p-6 w-4/6 mb-10">
            <div className="flex justify-end"> 
                <Button size='sm' onClick={() => setEditMode(!editMode)}><PencilIcon/></Button>
            </div>
            <form onSubmit={handleSubmit}>
            {editMode ? (
                <div className="flex flex-row gap-4 items-center">
                    <div className="flex flex-col">
                        <Label><strong>Puesto:</strong></Label>
                        <CustomInput name="puesto" value={formData.puesto} onChange={handleChange} readOnly={editMode} />
                    </div>
                    <div className="flex flex-col">
                        <Label><strong>Fecha de inicio:</strong></Label>
                        <CustomInput name="fecha_inicio" value={formData.fecha_inicio} onChange={handleChange} readOnly={editMode} />
                    </div>
                    <div className="flex flex-col">
                        <Label><strong>Fecha de fin:</strong></Label>
                        <CustomInput name="fecha_fin" value={formData.fecha_fin} onChange={handleChange} readOnly={editMode} />
                    </div>
                </div>
            ) : (
                <div className='flex items-center mb-4'>
                    <h2 className="text-xl font-bold">{trabajo.puesto}</h2>
                    <span className='mx-3'></span>
                    <p className='text-sm'>{trabajo.fecha_inicio} - {trabajo.fecha_fin}</p>
                </div>
            )}
                <div className='flex flex-col space-y-4'>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label><strong>Empresa:</strong></Label>
                            <CustomInput name="empresa" value={formData.empresa} onChange={handleChange} readOnly={!editMode}/>
                            <Label><strong>Direccion de Empresa:</strong></Label>
                            <CustomInput name="direccion_empresa" value={formData.direccion_empresa} onChange={handleChange} readOnly={!editMode}/>
                            <Label><strong>Telefono de Empresa:</strong></Label>
                            <CustomInput name="telefono_empresa" value={formData.telefono_empresa} onChange={handleChange} readOnly={!editMode}/>
                            <Label><strong>Ultimo Salario:</strong></Label>
                            <CustomInput name="salario" value={formData.salario} onChange={handleChange} readOnly={!editMode}/>
                        </div>
                        <div>
                            <Label><strong>Jefe:</strong></Label>
                            <CustomInput name="jefe_nombre" value={formData.jefe_nombre} onChange={handleChange} readOnly={!editMode}/>
                            <Label><strong>Telefono de Jefe:</strong></Label>
                            <CustomInput name="jefe_telefono" value={formData.jefe_telefono} onChange={handleChange} readOnly={!editMode}/>
                            <Label><strong>Motivo de Salida:</strong></Label>
                            <CustomInput name="motivo_salida" value={formData.motivo_salida} onChange={handleChange} readOnly={!editMode}/>
                        </div>
                        <div>
                            <Label><strong>Responsabilidades:</strong></Label>
                            <Textarea name="responsabilidades" value={formData.responsabilidades} onChange={handleChangeTextArea} readOnly={!editMode}/>
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
    )
}