import {Residencia} from "@/lib/definitions";
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import usePageData from "@/hooks/usePageData";
import { updateResidencia } from "@/services/candidates-service";
import { Button } from '../button';
import { PencilIcon } from '@heroicons/react/24/outline';

export default function ResidenciaComponent ({residencia}: {residencia: Residencia}) {

    const [editMode, setEditMode] = useState<boolean>(false);
    const { toast } = useToast();
    const {token} = usePageData('dashboard/candidatos')

    const [formData, setFormData] = useState<Residencia>({
        candidato_id: residencia.candidato_id,
        calle: residencia.calle,
        zona: residencia.zona,
        municipio: residencia.municipio,
        departamento: residencia.departamento,
        pais_de_residencia: residencia.pais_de_residencia,
        vive_con: residencia.vive_con
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleDiscard = () => {
        setFormData(residencia);
        setEditMode(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log("Submitting update with candidato_id:", formData.candidato_id);
        console.log("Informacion Personal data:", formData);

        try{
            await updateResidencia(formData, token);
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
            <h2 className="text-3xl font-bold mb-4">Residencia</h2>
            <div className="bg-gray-50 shadow-md rounded-lg p-6 w-4/5">
            <div className="flex justify-end"> 
                        <Button size='sm' onClick={() => setEditMode(!editMode)}><PencilIcon/></Button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col space-y-4'>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label><strong>Calle:</strong></Label>
                                    <CustomInput name="calle" value={formData.calle} onChange={handleChange} readOnly={!editMode}/>
                                    <Label><strong>Zona:</strong></Label>
                                    <CustomInput name="zona" value={formData.zona} onChange={handleChange} readOnly={!editMode}/>
                                    <Label><strong>Municipio:</strong></Label>
                                    <CustomInput name="municipio" value={formData.municipio} onChange={handleChange} readOnly={!editMode}/>
                                </div>
                                <div>
                                    <Label><strong>Departamento:</strong></Label>
                                    <CustomInput name="departamento" value={formData.departamento} onChange={handleChange} readOnly={!editMode}/>
                                    <Label><strong>Pais de Residencia:</strong></Label>
                                    <CustomInput name="pais_de_residencia" value={formData.pais_de_residencia} onChange={handleChange} readOnly={!editMode}/>
                                    <Label><strong>Vive Con:</strong></Label>
                                    <CustomInput name="vive_con" value={formData.vive_con} onChange={handleChange} readOnly={!editMode}/>
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