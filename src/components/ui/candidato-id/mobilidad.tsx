'use client'
import { Mobilidad} from '@/lib/definitions';
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import usePageData from '@/hooks/usePageData';
import { Button } from '../button';
import { PencilIcon } from '@heroicons/react/24/outline';
import { updateMobilidad } from '@/services/candidates-service';

export default function MobilidadComponent({ mobilidad }: { mobilidad: Mobilidad}) {

    const [editMode, setEditMode] = useState<boolean>(false);
    const { toast } = useToast();
    const {token} = usePageData('dashboard/candidatos')

    const [formData, setFormData] = useState<Mobilidad>({
        candidato_id: mobilidad.candidato_id,
        licencia: mobilidad.licencia,
        licencia_tipo: mobilidad.licencia_tipo,
        licencia_fecha_expiracion: mobilidad.licencia_fecha_expiracion,
        tiempo_conduciendo: mobilidad.tiempo_conduciendo,
        vehiculo: mobilidad.vehiculo,
        vehiculo_tipo: mobilidad.vehiculo_tipo,
        vehiculo_modelo: mobilidad.vehiculo_modelo,
        viaje_interior: mobilidad.viaje_interior,
        viaje_exterior: mobilidad.viaje_exterior
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleDiscard = () => {
        setFormData(mobilidad);
        setEditMode(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Submitting update with candidato_id:", formData.candidato_id);
        console.log("Informacion Personal data:", formData);

        try{
            await updateMobilidad(formData, token);
            toast({
                title: "Mobilidad Actualizada",
                description: "La informacion de mobilidad ha sido actualizada exitosamente",
            });
            setEditMode(false);
        }catch(e){
            console.error("Failed to update Mobilidad", e);
            toast({
                title: "Error al actualizar Mobilidad",
                description: "Ocurrio un error al actualizar la informacion de mobilidad",
            });
        }
    }

    return(
        <div>
            <h2 className="text-3xl font-bold mb-4">Mobilidad</h2>
            <div className="bg-gray-50 shadow-md rounded-lg p-6 w-4/5">
                    <div className="flex justify-end"> 
                        <Button size='sm' onClick={() => setEditMode(!editMode)}><PencilIcon/></Button>
                    </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label><strong>Licencia:</strong></Label>
                                <CustomInput name="licencia" value={formData.licencia} onChange={handleChange} readOnly={!editMode}/>
                                <Label><strong>Tipo de Licencia:</strong></Label>
                                <CustomInput name="licencia_tipo" value={formData.licencia_tipo} onChange={handleChange} readOnly={!editMode}/>
                                <Label><strong>Fecha de Expiracion:</strong></Label>
                                <CustomInput name="licencia_fecha_expiracion" value={formData.licencia_fecha_expiracion}onChange={handleChange} readOnly={!editMode}/>
                                <Label><strong>Tiempo Conduciendo:</strong></Label>
                                <CustomInput name="tiempo_conduciendo" value={formData.tiempo_conduciendo}onChange={handleChange} readOnly={!editMode}/>
                            </div>
                            <div>
                                <Label><strong>Vehiculo:</strong></Label>
                                <CustomInput name="vehiculo" value={formData.vehiculo}onChange={handleChange} readOnly={!editMode}/>
                                <Label><strong>Tipo de Vehiculo:</strong></Label>
                                <CustomInput name="vehiculo_tipo" value={formData.vehiculo_tipo}onChange={handleChange} readOnly={!editMode}/>
                                <Label><strong>Modelo de Vehiculo:</strong></Label>
                                <CustomInput name="vehiculo_modelo" value={formData.vehiculo_modelo}onChange={handleChange} readOnly={!editMode}/>
                            </div>
                            <div>
                                <Label><strong>Viaje Interior:</strong></Label>
                                <CustomInput name="viaje_interior" value={formData.viaje_interior}onChange={handleChange} readOnly={!editMode}/>
                                <Label><strong>Viaje Exterior:</strong></Label>
                                <CustomInput name="viaje_exterior" value={formData.viaje_exterior}onChange={handleChange} readOnly={!editMode}/>
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
        </div>
    )

}