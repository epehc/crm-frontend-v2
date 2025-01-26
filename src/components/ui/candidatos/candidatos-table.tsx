'use client'
import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import { useState} from "react";
import CandidatoRow from "@/components/ui/candidatos/candidato-row";
import Pagination from "@/components/ui/global/pagination";
import {dummyCandidatos} from "@/lib/dummy-data";

export default function CadidatosTable() {
    {
        const [totalPages, setTotalPages] = useState(1);
        const [currentPage, setCurrentPage] = useState(1);
        const pageSize = 15;

        const candidatos = dummyCandidatos


        const handlePageChange = (page: number) => {
            setCurrentPage(page);
        };

        return (
            <>
                <Table>
                    <TableCaption>Lista de Candidatos</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead><b>Timestamp</b></TableHead>
                            <TableHead><b>Nombre</b></TableHead>
                            <TableHead><b>Puesto al que aplica</b></TableHead>
                            <TableHead><b>Cómo se enteró</b></TableHead>
                            <TableHead><b>Género</b></TableHead>
                            <TableHead><b>Teléfono WhatsApp</b></TableHead>
                            <TableHead><b>Teléfono</b></TableHead>
                            <TableHead><b>Correo electrónico</b></TableHead>
                            <TableHead><b>Aspiración Salarial</b></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {candidatos.map((candidato) => (
                            <CandidatoRow key={candidato.candidato_id} candidato={candidato}/>
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