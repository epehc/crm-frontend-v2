'use client'

import usePageData from "@/app/hooks/usePageData";
import { useEffect, useState } from "react";
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
import {PlusIcon} from "@heroicons/react/24/outline";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import { Cliente, Factura, NuevoPago, EstadoFactura } from "@/lib/definitions";
import { formatDate } from "@/lib/utils";
import { getClienteByClienteId, updateCliente } from "@/services/clients-service";
import { createPago, updateFactura } from "@/services/invoices-service";


/*
    Dialog for pago
    actualizar factura (backend)
    actualizar cliente!
*/
export default function PagoDialog({factura, client_id, addPago}: {factura:Factura, client_id: string, addPago: () => void}) {
    const {token} = usePageData('/dashboard/facturas')

    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const [fecha, setFecha] = useState<string>('')
    const [monto, setMonto] = useState<number>(0)
    const [boleta, setBoleta] = useState<string>('')
    const [cliente, setCliente] = useState<Cliente | null>(null)

    useEffect(() => {
        if (!token) {
            console.log("Token is not available yet");
            return;
        }

        const fetchCliente = async () => {
            try {
                const cliente = await getClienteByClienteId(client_id, token)
                setCliente(cliente)
                console.log("Cliente fetched successfully")
            } catch (error) {
                console.error("Failed to fetch client", error);
            }
        }

        fetchCliente()
    }, [token])

    const handleFechaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setFecha(e.target.value)
    }

    const handleMontoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setMonto(Number(e.target.value))
    }

    const handleBoletaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setBoleta(e.target.value)
    }

    const resetForm = () => {
        setFecha('')
        setMonto(0)
        setBoleta('')
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!monto || !boleta || !fecha || !cliente) {
            alert('Por favor llene todos los campos')
            return
        }

        const today = new Date()
        const [day, month, year] = factura.fecha_vencimiento.split('/');
        const fechaVencimientoDate = new Date(+year, +month - 1, +day);
        const isVencida = fechaVencimientoDate < today;

        const newSaldo = Math.max(0, factura.saldo_pendiente - monto);
        const newAbonado = factura.abonado + monto;

        let newEstado;
        if (isVencida && newSaldo > 0) {
            newEstado = EstadoFactura.VENCIDA;
        } else if (newSaldo === 0) {
            newEstado = EstadoFactura.PAGADA;
        } else {
            newEstado = EstadoFactura.PARCIAL;
        }

        const nuevoPago: NuevoPago = {
            factura_id: factura.factura_id,
            fecha: formatDate(new Date(fecha)),
            monto,
            boleta_pago: boleta
        }

        const updatedFactura = {
            ...factura,
            estado: newEstado,
            abonado: newAbonado,
            saldo_pendiente: newSaldo
        }

        const updatedCliente = {
            ...cliente,
            saldo_pendiente: 
                isVencida
                    ? cliente.saldo_pendiente
                    : cliente.saldo_pendiente - monto
            ,
            saldo_vencido:
                isVencida
                    ? cliente.saldo_vencido - monto
                    : cliente.saldo_vencido
        }

        try{     
            const response = await createPago(nuevoPago, token)
            await updateFactura(updatedFactura, token)
            await updateCliente(updatedCliente, token)
            alert('Pago procesado exitosamente')
            console.log('Pago creado: ', response)
            addPago()
            resetForm()
            setIsDialogOpen(false)
        } catch(error) {
            console.error(error)
            alert('Error al procesar el pago')
        }       
    }


    return(
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button size='sm'>
                    <PlusIcon className="h-5 w-5 mr-2"/>
                    <Separator orientation="vertical"/>
                    Procesar pago
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[450px]'>
                <DialogHeader>
                    <DialogTitle>Procesar pago</DialogTitle>
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
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label className="text-right">
                                    Monto:
                                </Label>
                                <Input
                                    type="number"
                                    value={monto}
                                    onChange={handleMontoChange}
                                    className="w-[240px] justify-start text-left font-normal border rounded p-2"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-2">
                                <Label className="text-right">
                                    Boleta:
                                </Label>
                                <Input
                                    type="text"
                                    value={boleta}
                                    onChange={handleBoletaChange}
                                    className="w-[240px] justify-start text-left font-normal border rounded p-2"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                        <Button type='submit'>
                            <PlusIcon/>
                            <Separator orientation='vertical'/>
                            Procesar Pago
                        </Button>
                    </DialogFooter>
                    </form>
            </DialogContent>
        </Dialog>
    )
}