'use client'

        import {Table, TableBody, TableCaption, TableHead, TableHeader, TableRow} from "@/components/ui/table"
        import CandidatoRow from "@/components/ui/candidatos/candidato-row";
        import {Candidato} from "@/lib/definitions";

        type CandidatosTableProps = {
            candidatos: Candidato[];
        };

        export default function CandidatosTable({ candidatos }: CandidatosTableProps) {
            return (
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
            );
        }