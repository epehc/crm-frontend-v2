'use client'

import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Cliente, Factura, NuevoPago, Pago} from "@/lib/definitions";
import FacturaRow from "../facturas/factura-row";
import usePageData from "@/hooks/usePageData";
import { useEffect, useState } from "react";
import { updateFacturasAndClientsSaldo } from "@/lib/utils";
import { getFacturasByClienteId, getPagosByFacturaId } from "@/services/invoices-service";
import AddFacturaForClienteDialog from "./add-factura-for-cliente-dialog";

export default function ClientFacturasTable({cliente, onChange, refresh}: {cliente: Cliente, onChange: () => void, refresh: number}) {

    const {token} = usePageData('/dashboard/facturas');

    const [facturas, setFacturas] = useState<Factura[]>([]);
    const [pagos, setPagos] = useState<Pago[]>([]);

    useEffect(() => {
        if (!token) {
            console.log("Token is not available yet");
            return;
        }

        const fetchFacturasAndPagos = async () => {
            try {
                //Check if the due date of the invoices has passed and update the status
                //await updateFacturasAndClientsSaldo(token);

                const facturasResponse = await getFacturasByClienteId(cliente.client_id, token);
                setFacturas(facturasResponse)
                
                let allPagos: Pago[] = [];
                for (const factura of facturasResponse){
                    const pagosResponse = await getPagosByFacturaId(factura.factura_id, token);
                    allPagos = [...allPagos, ...pagosResponse];
                }

                const uniquePagos = Array.from(new Map(allPagos.map(pago => [pago.pago_id, pago])).values());
                setPagos(uniquePagos);

                console.log("Facturas y pagos fetched successfully");
            } catch (error) {
                console.error("Failed to fetch clients", error);
            }
        };

        fetchFacturasAndPagos();
    }, [token, refresh]);

    return (
        <>
            <AddFacturaForClienteDialog cliente={cliente} addFactura={onChange}/>
            <Table>
                <TableCaption>Lista de Facturas</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead><b>Cliente</b></TableHead>
                        <TableHead><b>Estado</b></TableHead>
                        <TableHead><b>Fecha</b></TableHead>
                        <TableHead><b>Fecha de vencimiento</b></TableHead>
                        <TableHead><b>Total</b></TableHead>
                        <TableHead><b>Por Pagar</b></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {facturas.map((factura) => {
                        const facturaPagos = pagos.filter((pago) => pago.factura_id === factura.factura_id);
                        return <FacturaRow key={factura.factura_id} factura={factura} pagos={facturaPagos} onChange={onChange}/>;
                    })}
                </TableBody>
            </Table>
        </>
    )
}