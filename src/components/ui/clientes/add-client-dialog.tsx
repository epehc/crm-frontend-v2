'use client'

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {PlusIcon} from "@heroicons/react/24/outline";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {NuevoCliente} from "@/lib/definitions";
import {createCliente} from "@/services/clients-service";
import { useToast } from "@/hooks/use-toast";


export default function AddClientDialog({addCliente}: {addCliente: () => void}) {
    const {data: session} = useSession();
    const token = session?.accessToken as string;
    const organizer = session?.user.email as string;
    const {toast} = useToast()

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [nombre, setNombre] = useState<string>("")
    const [direccion, setDireccion] = useState<string>("")
    const [telefono, setTelefono] = useState<string>("")
    const [nit, setNit] = useState<string>("")
    const [creditoPorDias, setCreditoPorDias] = useState<string>('0')

    const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNombre(e.target.value)
    }

    const handleDireccionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setDireccion(e.target.value)
    }

    const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTelefono(e.target.value)
    }

    const handleNitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNit(e.target.value)
    }

    const handleCreditoPorDiasChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCreditoPorDias(e.target.value)
    }

    const resetForm = () => {
        setNombre('')
        setDireccion('')
        setTelefono('')
        setNit('')
        setCreditoPorDias('0')
    }

    const handleSubmit= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!nombre || !direccion || !telefono || !nit || !creditoPorDias){
            toast({
                title: "Error",
                description: "Por favor llene todos los campos",
            });
            return
        }

        const credito_por_dias = parseInt(creditoPorDias)

        const nuevoCliente: NuevoCliente = {
            nombre,
            direccion,
            telefono,
            nit,
            credito_por_dias: credito_por_dias,
        }

        console.log("Nuevo cliente: ", nuevoCliente)

        try{
            const response = await createCliente(nuevoCliente, token)
            toast({
                title: "Cliente creado",
                description: "Cliente creado exitosamente",
            });
            console.log("Cliente creado: ", response)
            addCliente()
            resetForm()
            setIsDialogOpen(false)
        }catch(error){
            console.log('Failed to create new client', error)
            toast({
                title: "Error",
                description: "Error al crear el cliente",
            });
        }

    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon/>
                    <Separator orientation='vertical'/>
                    Nuevo cliente
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[450px]'>
                <DialogHeader>
                    <DialogTitle>Agregar un nuevo cliente</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right">Nombre:</Label>
                            <Input
                                className="w-[240px] justify-start text-left font-normal border rounded p-2"
                                type='text'
                                value={nombre}
                                onChange={handleNombreChange}
                                required
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right">Direccion:</Label>
                            <Input
                                className="w-[240px] justify-start text-left font-normal border rounded p-2"
                                type='text'
                                value={direccion}
                                onChange={handleDireccionChange}
                                required
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right">Telefono:</Label>
                            <Input
                                className="w-[240px] justify-start text-left font-normal border rounded p-2"
                                type='text'
                                value={telefono}
                                onChange={handleTelefonoChange}
                                required
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right">NIT:</Label>
                            <Input
                                className="w-[240px] justify-start text-left font-normal border rounded p-2"
                                type='text'
                                value={nit}
                                onChange={handleNitChange}
                                required
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right">Credito por dias:</Label>
                            <Input
                                className="w-[240px] justify-start text-left font-normal border rounded p-2"
                                type='text'
                                value={creditoPorDias}
                                onChange={handleCreditoPorDiasChange}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type='submit'>
                            <PlusIcon/>
                            <Separator orientation='vertical'/>
                            Crear cliente
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}