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
import {CalendarIcon, PlusIcon} from "@heroicons/react/24/outline";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {NuevaPersonaContacto, NuevoCliente} from "@/lib/definitions";
import {createCliente, createPersonaContacto} from "@/services/clients-service";


export default function AddPersonaContactoDialog({client_id, addContacto}: {client_id: string, addContacto: (nuevaPersonaContacto: NuevaPersonaContacto) => void}) {
    const {data: session} = useSession();
    const token = session?.accessToken as string;
    const organizer = session?.user.email as string;

    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [nombre, setNombre] = useState<string>("")
    const [telefono, setTelefono] = useState<string>("")
    const [correo, setCorreo] = useState<string>("")

    const handleNombreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNombre(e.target.value)
    }

    const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTelefono(e.target.value)
    }

    const handleCorreoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setCorreo(e.target.value)
    }

    const handleSubmit= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!nombre || !correo || !telefono){
            alert("Por favor llene todos los campos")
            return
        }

        const nuevaPersonaContacto: NuevaPersonaContacto = {
            client_id: client_id,
            nombre,
            telefono,
            correo
        }

        console.log("Nueva persona de contacto: ", nuevaPersonaContacto)

        try{
            const response = await createPersonaContacto(nuevaPersonaContacto, token)
            alert('Contacto creado exitosamente')
            console.log("Contacto creado: ", response)
            addContacto(response)
            setIsDialogOpen(false)
        }catch(error){
            console.log('Failed to create new contact', error)
            alert('Error al crear el contacto nuevo')
        }

    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon/>
                    <Separator orientation='vertical'/>
                    Nuevo contacto
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[450px]'>
                <DialogHeader>
                    <DialogTitle>Agregar una nueva persona de contacto</DialogTitle>
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
                            <Label className="text-right">Correo:</Label>
                            <Input
                                className="w-[240px] justify-start text-left font-normal border rounded p-2"
                                type='text'
                                value={correo}
                                onChange={handleCorreoChange}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type='submit'>
                            <PlusIcon/>
                            <Separator orientation='vertical'/>
                            Crear contacto
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}