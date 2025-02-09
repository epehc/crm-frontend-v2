'use client'

import { InformacionPersonal} from '@/lib/definitions';
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";
import { useState } from 'react';
import { Button } from '../button';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useToast } from '@/hooks/use-toast';
import { updateInformacionPersonal } from '@/services/candidates-service';
import usePageData from '@/hooks/usePageData';

export default function InformacionPersonalComponent({informacionPersonal}: {informacionPersonal: InformacionPersonal}) {

    const [editMode, setEditMode] = useState<boolean>(false);
    const { toast } = useToast();
    const {token} = usePageData('dashboard/candidatos')

    const [formData, setFormData] = useState<InformacionPersonal>({
        candidato_id: informacionPersonal.candidato_id,
        dpi: informacionPersonal.dpi,
        fecha_nacimiento: informacionPersonal.fecha_nacimiento,
        edad: informacionPersonal.edad,
        nacionalidad: informacionPersonal.nacionalidad,
        estado_civil: informacionPersonal.estado_civil,
        personas_dependientes: informacionPersonal.personas_dependientes,
        nivel_estudios: informacionPersonal.nivel_estudios,
        estudios_adicionales: informacionPersonal.estudios_adicionales,
        adjetivos: informacionPersonal.adjetivos,
        software: informacionPersonal.software,
        idiomas: informacionPersonal.idiomas,
        partido_politico: informacionPersonal.partido_politico,
        sindicato: informacionPersonal.sindicato,
        impedimento_fisico: informacionPersonal.impedimento_fisico,
        enfermedad: informacionPersonal.enfermedad,
        religion: informacionPersonal.religion
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleDiscard = () => {
        setFormData(informacionPersonal);
        setEditMode(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Submitting update with candidato_id:", formData.candidato_id);
        console.log("Informacion Personal data:", formData);
        
        try{
            await updateInformacionPersonal(formData, token);
            toast({
                title: "Informacion Personal Actualizada",
                description: "La informacion personal ha sido actualizada exitosamente",
            });
        } catch (error) {
            console.error("Failed to update informacion personal", error);
            toast({
                title: "Error",
                description: "Hubo un error al actualizar la informacion personal",
            });
            handleDiscard();
        }
    }


    return(
        <div>
            <h2 className="text-3xl font-bold mb-4">Informacion Personal</h2>
                <div className="bg-gray-50 shadow-md rounded-lg p-6 w-4/5">
                    <div className="flex justify-end"> 
                        <Button size='sm' onClick={() => setEditMode(!editMode)}><PencilIcon/></Button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col space-y-4'>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label><strong>DPI:</strong></Label>
                                    <CustomInput name="dpi" onChange={handleChange} value={formData.dpi} readOnly={!editMode}/>
                                    <Label><strong>Fecha de Nacimiento:</strong></Label>
                                    <CustomInput name="fecha_nacimiento" onChange={handleChange} value={formData.fecha_nacimiento} readOnly={!editMode}/>
                                    <Label><strong>Edad:</strong></Label>
                                    <CustomInput name="edad" onChange={handleChange} value={formData.edad} readOnly={!editMode}/>
                                    <Label><strong>Nacionalidad:</strong></Label>
                                    <CustomInput name="nacionalidad" onChange={handleChange} value={formData.nacionalidad} readOnly={!editMode}/>
                                    <Label><strong>Estado Civil:</strong></Label>
                                    <CustomInput name="estado_civil" onChange={handleChange} value={formData.estado_civil} readOnly={!editMode}/>
                                    <Label><strong>Personas Dependientes:</strong></Label>
                                    <CustomInput name="personas_dependientes" onChange={handleChange} value={formData.personas_dependientes} readOnly={!editMode}/>
                                </div>
                                <div>
                                    <Label><strong>Nivel de Estudios:</strong></Label>
                                    <CustomInput name="nivel_estudios" onChange={handleChange} value={formData.nivel_estudios} readOnly={!editMode}/>
                                    <Label><strong>Estudios Adicionales:</strong></Label>
                                    <CustomInput name="estudios_adicionales" onChange={handleChange} value={formData.estudios_adicionales} readOnly={!editMode}/>
                                    <Label><strong>Adjetivos:</strong></Label>
                                    <CustomInput name="adjetivos" onChange={handleChange} value={formData.adjetivos} readOnly={!editMode}/>
                                    <Label><strong>Software:</strong></Label>
                                    <CustomInput name="software" onChange={handleChange} value={formData.software} readOnly={!editMode}/>
                                    <Label><strong>Idiomas:</strong></Label>
                                    <CustomInput name="idiomas" onChange={handleChange} value={formData.idiomas} readOnly={!editMode}/>
                                </div>
                                <div>
                                    <Label><strong>Partido Politico:</strong></Label>
                                    <CustomInput name="partido_politico" onChange={handleChange} value={formData.partido_politico} readOnly={!editMode}/>
                                    <Label><strong>Sindicato:</strong></Label>
                                    <CustomInput name="sindicato" onChange={handleChange} value={formData.sindicato} readOnly={!editMode}/>
                                    <Label><strong>Impedimento Fisico:</strong></Label>
                                    <CustomInput name="impedimento_fisico" onChange={handleChange} value={formData.impedimento_fisico} readOnly={!editMode}/>
                                    <Label><strong>Enfermedad:</strong></Label>
                                    <CustomInput name="enfermedad" onChange={handleChange} value={formData.enfermedad} readOnly={!editMode}/>
                                    <Label><strong>Religion:</strong></Label>
                                    <CustomInput name="religion"  value={formData.religion} onChange={handleChange} readOnly={!editMode}/>
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