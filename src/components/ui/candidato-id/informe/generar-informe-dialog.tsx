'use client'

import React, { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {DocumentPlusIcon, PencilIcon, UserIcon} from "@heroicons/react/24/outline";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import { Cliente, InformeTexts } from "@/lib/definitions";
import { useRouter } from "next/navigation";
import { useCandidatoDataContext } from "@/contexts/useCandidatoDataContext";
import usePageData from "@/hooks/usePageData";
import { getAllClientes } from "@/services/clients-service";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { cn } from "@/lib/utils";


export default function GenerarInformeDialog(){
    const {token} = usePageData('/dashboard/candidatos/[id]');
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isClienteSelectOpen, setIsClienteSelectOpen] = useState(false)
    
    const { data, setInformeTexts, setEmpresa } = useCandidatoDataContext();
    
    const [allClientes, setAllClientes] = useState<Cliente[]>([])
    const [cliente, setCliente] = useState<Cliente | null>(null)
    
    const [formData, setFormData] = useState<InformeTexts>({
        desenvolvimiento: '',
        referencias: ''
    })

    useEffect(() => {
        if(!token) return

        const fetchClientes = async () => {
            try{
                const response = await getAllClientes(token)
                setAllClientes(response)
            }catch(error){
                console.error('Failed to fetch clients', error)
            }
        }

        fetchClientes()
    }, [token])

    const handleClienteChange = async (client_id: string) => {
        const selectedCliente = allClientes.find((cliente) => cliente.client_id === client_id);
        if (selectedCliente) {
            setCliente(selectedCliente);
            setEmpresa(selectedCliente.nombre);
        } else {
            setCliente(null);
        }
    }
    
    const handleGenerateInforme = () => {
        router.push(`/dashboard/candidatos/${data?.candidato?.candidato_id}/informe`);
    }

    const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setInformeTexts(formData);
        handleGenerateInforme()
        console.log(formData);
    }

    return(
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <DocumentPlusIcon/>
                    Generar informe 
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:w-[900px]">
                <DialogHeader>
                    <DialogTitle>Generar Informe para {data?.candidato?.nombre ?? ''}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                    <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right">Cliente:</Label>
                            <Select open={isClienteSelectOpen} onOpenChange={setIsClienteSelectOpen} 
                            value={cliente?.nombre} onValueChange={(value) => handleClienteChange(value)}>
                                <SelectTrigger className={cn(
                                    "w-[240px] justify-between text-left font-normal",
                                    !cliente
                                )}>
                                    <div className='flex items-center justify-between'>
                                        <UserIcon className='h-5 w-5 ml-1'/>
                                        <SelectValue placeholder={"Seleccionar cliente"}/>
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    {allClientes?.map((cliente) => (
                                        <SelectItem key={cliente.client_id} value={cliente.client_id}>
                                            {cliente.nombre}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Desenvolvimiento e informacion personal:
                            </Label>
                            <Textarea name="desenvolvimiento" className='w-[300px] h-[250px] justify-start text-left font-normal' 
                                value={formData.desenvolvimiento} onChange={handleChangeTextArea} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Referencias Laborales:
                            </Label>
                            <Textarea name="referencias" className='w-[300px] h-[250px] justify-start text-left font-normal' 
                                value={formData.referencias} onChange={handleChangeTextArea} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type='submit'>
                            <PencilIcon/>
                            Generar Informe
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>

    )
}