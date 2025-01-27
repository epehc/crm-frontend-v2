'use client'

import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {useEffect, useState} from "react";
import CandidatoRow from "@/components/ui/candidatos/candidato-row";
import Pagination from "@/components/ui/global/pagination";
import {Candidato} from "@/lib/definitions";
import {useSession} from "next-auth/react";
import {getCandidatos} from "@/services/candidates-service";

export default function CadidatosTable() {
    {
        const [candidatos, setCandidatos] = useState<Candidato[]>([]);
        const [totalPages, setTotalPages] = useState(1);
        const [currentPage, setCurrentPage] = useState(1);
        const pageSize = 12;
        const {data: session} = useSession();
        const token = session?.accessToken as string;

        useEffect(() => {
            if(!token) {
                console.log("Token is not available yet");
                return;
            }

            const fetchCandidatos = async () => {
                try {
                    const data = await getCandidatos(currentPage, pageSize, token);
                    setCandidatos(data.data);
                    setTotalPages(data.totalPages);
                } catch (error) {
                    console.error("Failed to fetch candidates", error);
                }
            };

            fetchCandidatos().then(() => console.log("Candidatos fetched"));

        }, [currentPage, token])

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