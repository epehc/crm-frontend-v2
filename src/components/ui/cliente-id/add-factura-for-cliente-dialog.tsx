'use client'

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {useState} from "react";
import {PlusIcon} from "@heroicons/react/24/outline";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Cliente, EstadoFactura, NuevaFactura} from "@/lib/definitions";
import { createFactura } from "@/services/invoices-service";
import {updateCliente } from "@/services/clients-service";
import {formatDate } from "@/lib/utils";
import {Textarea} from "@/components/ui/textarea";
import usePageData from "@/hooks/usePageData";
import { useToast } from "@/hooks/use-toast";

export default function AddFacturaForClienteDialog({cliente, addFactura}: {cliente: Cliente, addFactura: () => void}) {
    const {token} = usePageData('/dashboard/facturas')

    const {toast} = useToast()

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const [nit, setNit] = useState<string>(cliente.nit)
    const [fecha, setFecha] = useState<string>('')
    const [total, setTotal] = useState<number>(0)
    const [descripcion, setDescripcion] = useState<string>("")
    const [estado, setEstado] = useState<EstadoFactura>(EstadoFactura.CREADA)

    const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFecha(e.target.value)
    }

    const handleNitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setNit(e.target.value)
    }

    const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setTotal(parseFloat(e.target.value))
    }

    const handleDescripcionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        setDescripcion(e.target.value)
    }

    const resetForm = () => {
        setNit(cliente.nit)
        setFecha('')
        setTotal(0)
        setDescripcion('')
    }

    const handleSubmit= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!cliente || !fecha || !total){
            toast({
                title: "Error",
                description: "Por favor llene todos los campos",
            });
            return
        }

        const fechaFormatted = new Date(fecha)
        const fechaVencimiento = new Date(fechaFormatted)
        fechaVencimiento.setDate(fechaVencimiento.getDate() + cliente.credito_por_dias)

        const today = new Date()
        const calculateEstado = today > fechaVencimiento ? EstadoFactura.VENCIDA : EstadoFactura.CREADA;

        const nuevaFactura: NuevaFactura = {
            client_id: cliente.client_id,
            cliente_nombre: cliente.nombre,
            estado: calculateEstado,
            fecha: formatDate(fechaFormatted),
            fecha_vencimiento: formatDate(fechaVencimiento),
            iva: total * 0.12,
            total,
            total_sin_iva: total * (1 - 0.12),
            abonado: 0,
            saldo_pendiente: total,
            nit,
            descripcion
        }

        console.log("Nueva factura: ", nuevaFactura)
        
        // Update the client with the new saldo_pendiente or saldo_vencido
        const updatedCliente = {
            ...cliente,
            saldo_pendiente: 
                nuevaFactura.estado === EstadoFactura.VENCIDA 
                    ? cliente.saldo_pendiente
                    : cliente.saldo_pendiente + nuevaFactura.total
            ,
            saldo_vencido:
                nuevaFactura.estado === EstadoFactura.VENCIDA
                    ? cliente.saldo_vencido + nuevaFactura.total
                    : cliente.saldo_vencido
        };
        
        console.log("Nueva factura: ", nuevaFactura)
        console.log("Cliente por actualizar: ", updatedCliente)

        try {
            const response = await createFactura(nuevaFactura, token);
            toast({
                title: "Factura creada",
                description: "Factura para creada exitosamente",
            });
            console.log("Factura creada: ", response);
            
            // Update the client in the backend
            await updateCliente(updatedCliente, token);
            
            // Reset the form and close the dialog
            resetForm();
            addFactura();
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Error al crear la factura', error);
            toast({
                title: 'Error',
                description: 'Error al crear la factura',
            });
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <PlusIcon/>
                    <Separator orientation='vertical'/>
                    Nueva factura
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[450px]'>
                <DialogHeader>
                    <DialogTitle>Crear una nueva factura para {cliente.nombre}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className='grid gap-4 py-4'>
                        <div className="grid grid-cols-4 items-center gap-2">
                            <Label className="text-right">
                                Fecha:
                            </Label>
                            <Input
                                type="date"
                                value={fecha}
                                onChange={handleFechaChange}
                                className="w-[240px] justify-start text-left font-normal border rounded p-2"
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right">Nit:</Label>
                            <Input
                                className="w-[240px] justify-start text-left font-normal border rounded p-2"
                                type='text'
                                value={nit}
                                onChange={handleNitChange}
                                required
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right">Descripcion:</Label>
                            <Textarea
                                className="w-[240px] justify-start text-left font-normal border rounded p-2"
                                value={descripcion}
                                onChange={handleDescripcionChange}
                                required
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label className="text-right">Total:</Label>
                            <Input
                                className="w-[240px] justify-start text-left font-normal border rounded p-2"
                                type='number'
                                value={total}
                                onChange={handleTotalChange}
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type='submit'>
                            <PlusIcon/>
                            <Separator orientation='vertical'/>
                            Generar factura
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}