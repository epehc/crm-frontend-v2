'use client'

import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Factura, NuevoPago, Pago} from "@/lib/definitions";
import FacturaRow from "./factura-row";

export default function FacturasTable({facturas, pagos, onChange} : {facturas: Factura[], pagos: Pago[], onChange: () => void}) {

    return (
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
    )
}