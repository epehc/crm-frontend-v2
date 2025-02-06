'use client'

import {TableCell, TableRow} from "@/components/ui/table";
import {Factura, NuevoPago, Pago} from "@/lib/definitions";
import {useState } from "react";
import ExpandButton from "../global/expand-button";
import InvoiceStatus from "./status";
import PagoDialog from "./pago-dialog";
import AnularFacturaDialog from "./anular-factura-dialog";

export default function FacturaRow({factura, pagos, onChange}: {factura: Factura, pagos: Pago[], onChange: () => void}) {
    const [open, setOpen] = useState(false);

    return(
        <>
            <TableRow style={{cursor: 'pointer'}} onClick={() => setOpen(!open)}>
                <TableCell >
                <div className="flex items-center space-x-">
                    <ExpandButton open={open} onClick={() => setOpen(!open)} />
                    {factura.cliente_nombre}
                </div>
                </TableCell>
                <TableCell><InvoiceStatus status={factura.estado} /></TableCell>
                <TableCell>{factura.fecha}</TableCell>
                <TableCell>{factura.fecha_vencimiento}</TableCell>
                <TableCell>Q.{factura.total}</TableCell>
                <TableCell><strong>Q.{factura.saldo_pendiente}</strong></TableCell>
            </TableRow>
            {open && (
                <TableRow className="bg-gray-50">
                    <TableCell colSpan={7}> 
                        <div className="grid grid-cols-3 gap-4 w-[900px] ">
                            <div>
                                <p><strong>Total Sin de IVA:</strong> Q.{factura.total_sin_iva}</p>
                                <p><strong>NIT:</strong> {factura.nit}</p>
                                <p><strong>Abonado:</strong> Q. {factura.abonado}</p>
                                <p><strong>Descripcion:</strong> {factura.descripcion}</p>
                                
                            </div>
                            <div>
                                <p className="text-xl"><strong>Pagos:</strong></p>
                                {pagos?.map((pago) => (
                                    <p key={pago.pago_id}>
                                        {pago.fecha} | Q.{pago.monto} | {pago.boleta_pago}
                                    </p>
                                ))}
                            </div>
                            <div className='space-y-3'>
                                {factura.saldo_pendiente > 0 && factura.estado !== 'anulada' &&(
                                    <>
                                        <PagoDialog factura={factura} client_id={factura.client_id} addPago={onChange} />
                                        <AnularFacturaDialog factura={factura} onAnularFactura={onChange} />
                                    </>
                                )
                                }
                            </div>
                        </div>
                    </TableCell>
                </TableRow>
            )}
        </>
    )
}