'use client'

import { Cliente } from "@/lib/definitions";
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
import { formatDate } from "@/lib/utils";
import usePageData from "@/hooks/usePageData";
import { updateCandidato } from "@/services/candidates-service";
import { useToast } from "@/hooks/use-toast";
import { updateCliente } from "@/services/clients-service";


export default function EditarClienteInfoDialog({cliente, onEdit}: {cliente: Cliente, onEdit: () => void}) {
    const {token} = usePageData('dashboard/candidatos')
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

    const { toast } = useToast();


    const [formData, setFormData] = useState<Cliente>({
        client_id: cliente.client_id,
        nombre: cliente.nombre,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        nit: cliente.nit,
        credito_por_dias: cliente.credito_por_dias,
        saldo_pendiente: cliente.saldo_pendiente,
        saldo_vencido: cliente.saldo_vencido,
        plazas: cliente.plazas,
    })   
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedCliente: Cliente = {
            ...formData,
        }

        console.log("Updated client: ", updatedCliente);

        try {
            const response = await updateCliente(updatedCliente, token);
            toast({
                title: "Cliente Actualizado",
                description: "La informacion del cliente ha sido actualizada exitosamente",
            });
            console.log("Cliente actualizado: ", response);
        } catch (error) {
            console.error("Failed to update candidate", error);
            toast({
                title: "Error al actualizar cliente",
                description: "Ocurrio un error al actualizar la informacion del cliente",
            });
        }
        onEdit();
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
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Nombre:
                            </Label>
                            <Input name="nombre" className='w-[240px] justify-start text-left font-normal' 
                                value={formData.nombre} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Direccion:
                            </Label>
                            <Input name="direccion" className='w-[240px] justify-start text-left font-normal' 
                                value={formData.direccion} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Telefono:
                            </Label>
                            <Input name="telefono" className='w-[240px] justify-start text-left font-normal' 
                                value={formData.telefono} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                NIT:
                            </Label>
                            <Input name="nit" className='w-[240px] justify-start text-left font-normal' 
                                value={formData.nit} onChange={handleChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Credito por dias:
                            </Label>
                            <Input name="credito_por_dias" className='w-[240px] justify-start text-left font-normal' 
                                value={formData.credito_por_dias} onChange={handleChange} />
                        </div>                            
                    </div>
                    <DialogFooter>
                        <Button type='submit'>
                            <PencilIcon/>
                            Guardar
                        </Button>
                    </DialogFooter>
                    <Label className="text-left">ID: {formData.client_id}</Label>
                </form>
            </DialogContent>
        </Dialog>
    )
}