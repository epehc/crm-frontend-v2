'use client'

import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { useState} from "react";
import Pagination from "@/components/ui/global/pagination";
import {dummyClientes} from "@/lib/dummy-data";
import ClienteRow from "@/components/ui/candidatos/candidato-row";

export default function ClientesTable() {
    {
        const [totalPages, setTotalPages] = useState(1);
        const [currentPage, setCurrentPage] = useState(1);
        const pageSize = 15;

        const clientes = dummyClientes


        const handlePageChange = (page: number) => {
            setCurrentPage(page);
        };

        return (
            <>
                <Table>
                    <TableCaption>Lista de Clientes</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead><b>Nombre</b></TableHead>
                            <TableHead><b>Direccion</b></TableHead>
                            <TableHead><b>Telefono</b></TableHead>
                            <TableHead><b>Persona de contacto</b></TableHead>
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
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </>


        )

    }
}