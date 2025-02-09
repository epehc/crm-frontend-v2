'use client'

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";
import {XCircleIcon} from "@heroicons/react/24/outline";
import { anularFactura, updateFactura } from "@/services/invoices-service";
import usePageData from "@/hooks/usePageData";
import { useState } from "react";
import { getClienteByClienteId, updateCliente } from "@/services/clients-service";
import { Cliente, EstadoFactura, Factura } from "@/lib/definitions";
import { useToast } from "@/hooks/use-toast";

export default function AnularFacturaDialog({factura, onAnularFactura}:{factura: Factura, onAnularFactura: () => void}) {
    const {token} = usePageData('/dashboard/facturas')
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const {toast} = useToast()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const cliente = await getClienteByClienteId(factura.client_id, token)

            const wasVencida = factura.estado === EstadoFactura.VENCIDA;


            const updatedFactura: Factura = {
                ...factura,
                saldo_pendiente: 0,
                estado: EstadoFactura.ANULADA,
            };
            
            const updatedCliente: Cliente = {
                ...cliente,
                saldo_pendiente:
                wasVencida
                ? cliente.saldo_pendiente 
                : cliente.saldo_pendiente - factura.saldo_pendiente
                ,
                saldo_vencido:
                wasVencida
                ? cliente.saldo_vencido - factura.saldo_pendiente
                : cliente.saldo_vencido,
            }; 
            
            const response = await updateFactura(updatedFactura, token)
            await updateCliente(updatedCliente, token);
            console.log("Cliente updated successfully", updatedCliente);
            toast({
                title: "Factura anulada",
                description: "La factura ha sido anulada exitosamente",
            });
            console.log("Factura anulada: ", response);
            onAnularFactura();
            setIsDialogOpen(false);
        } catch (error) {
            console.log("Failed to anular factura", error);
            toast({
                title: "Error",
                description: "Error al anular la factura",
            });
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="destructive" size='sm'>
                    <XCircleIcon className="h-5 w-5 mr-2"/>
                    <Separator orientation="vertical"/>
                    Anular factura
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[450px]'>
                <DialogHeader>
                    <DialogTitle>¿Estás seguro que deseas anular esta factura?</DialogTitle>
                </DialogHeader>
                    <form onSubmit={handleSubmit}>
                        <Button type='submit' variant="destructive">
                            Anular factura
                        </Button>
                    </form>
            </DialogContent>
        </Dialog>
    )

}