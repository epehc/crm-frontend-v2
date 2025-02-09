'use client'

import { Candidato } from "@/lib/definitions";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import { PencilIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import usePageData from "@/hooks/usePageData";
import { updateCandidato } from "@/services/candidates-service";
import { useToast } from "@/hooks/use-toast";
import {Textarea} from "@/components/ui/textarea";



export default function EditarCandidatoInfoDialog({candidato, onEdit}: {candidato: Candidato, onEdit: () => void}) {
    const {token} = usePageData('dashboard/candidatos')
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const { toast } = useToast();


    const [formData, setFormData] = useState<Candidato>({
        candidato_id: candidato.candidato_id,
        nombre: candidato.nombre,
        puesto_aplicado: candidato.puesto_aplicado,
        como_se_entero: candidato.como_se_entero,
        genero: candidato.genero,
        telefono_whatsapp: candidato.telefono_whatsapp,
        telefono: candidato.telefono,
        correo: candidato.correo,
        aspiracion_salarial: candidato.aspiracion_salarial,
        timestamp: candidato.timestamp,
        comentarios: candidato.comentarios,
    })   
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedCandidato: Candidato = {
            ...formData,
        }

        console.log("Updated candidato: ", updatedCandidato);

        try {
            const response = await updateCandidato(updatedCandidato, token);
            toast({
                title: "Candidato Actualizado",
                description: "La informacion del candidato ha sido actualizada exitosamente",
            });
            console.log("Candidato actualizado: ", response);
            onEdit();
        } catch (error) {
            console.error("Failed to update candidate", error);
            toast({
                title: "Error al actualizar candidato",
                description: "Ocurrio un error al actualizar la informacion del candidato",
            });
        }
        setIsDialogOpen(false);
    }
    
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PencilIcon/>
                    Editar informacion
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:w-[600px]">
                <DialogHeader>
                    <DialogTitle>Editar Información de {formData.nombre}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <Label className="text-left">Fecha de aplicacion: {formData.timestamp}</Label>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Nombre:
                            </Label>
                            <Input name="nombre" className='w-[240px] justify-start text-left font-normal' 
                                value={formData.nombre} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Puesto aplicado:
                            </Label>
                            <Input name="puesto_aplicado" className='w-[240px] justify-start text-left font-normal' 
                                value={formData.puesto_aplicado} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Cómo se enteró:
                            </Label>
                            <Input name="como_se_entero" className='w-[240px] justify-start text-left font-normal' 
                                value={formData.como_se_entero} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Género:
                            </Label>
                            <Input name="genero" className='w-[240px] justify-start text-left font-normal' 
                                value={formData.genero} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Teléfono WhatsApp:
                            </Label>
                            <Input name="telefono_whatsapp" className='w-[240px] justify-start text-left font-normal' 
                                value={formData.telefono_whatsapp} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Teléfono:
                            </Label>
                            <Input name="telefono" className='w-[240px] justify-start text-left font-normal' 
                                value={formData.telefono} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Correo:
                            </Label>
                            <Input name="correo" className='w-[240px] justify-start text-left font-normal' 
                                value={formData.correo} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Aspiración salarial:
                            </Label>
                            <Input name="aspiracion_salarial" className='w-[240px] justify-start text-left font-normal' 
                                value={formData.aspiracion_salarial} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Comentarios:
                            </Label>
                            <Textarea name="comentarios" className='w-[240px] justify-start text-left font-normal' 
                                value={formData.comentarios} onChange={handleChangeTextArea} />
                        </div>
                            
                    </div>
                    <DialogFooter>
                        <Button type='submit'>
                            <PencilIcon/>
                            Guardar
                        </Button>
                    </DialogFooter>
                    <Label className="text-left">ID: {formData.candidato_id}</Label>
                </form>
            </DialogContent>
        </Dialog>
    )
}