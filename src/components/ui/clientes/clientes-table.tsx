'use client'

import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import ClienteRow from "@/components/ui/clientes/cliente-row";
import {Cliente} from "@/lib/definitions";

export default function ClientesTable({clientes} : {clientes: Cliente[]}) {
    
    console.log(clientes)

    return (
        <Table>
            <TableCaption>Lista de Clientes</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead><b>Nombre</b></TableHead>
                    <TableHead><b>Direccion</b></TableHead>
                    <TableHead><b>Telefono</b></TableHead>
                    <TableHead><b>NIT</b></TableHead>
                    <TableHead><b>Saldo pendiente</b></TableHead>
                    <TableHead><b>Saldo vencido</b></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {clientes.map((cliente) => (
                    <ClienteRow key={cliente.client_id} cliente={cliente}/>
                ))}
            </TableBody>
        </Table>
    )
}