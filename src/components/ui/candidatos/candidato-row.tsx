import {TableCell, TableRow} from "@/components/ui/table";
import {Candidato} from "@/lib/definitions";
import {useRouter} from "next/navigation";
import AgendarEntrevistaDialog from "../candidato-id/agendar-entrevista-dialog";

export default function CandidatoRow({candidato}: {candidato: Candidato}) {
    const router = useRouter();

    const handleRowClick = () => {
        router.push(`/dashboard/candidatos/${candidato.candidato_id}`);
    }


    return(
        <TableRow>
            <TableCell>{candidato.timestamp}</TableCell>
            <TableCell onClick={handleRowClick} style={{cursor: "pointer"}}><b>{candidato.nombre}</b></TableCell>
            <TableCell><b>{candidato.puesto_aplicado}</b></TableCell>
            <TableCell>{candidato.como_se_entero}</TableCell>
            <TableCell>{candidato.genero}</TableCell>
            <TableCell><b>{candidato.telefono_whatsapp}</b></TableCell>
            <TableCell>{candidato.telefono}</TableCell>
            <TableCell><b>{candidato.correo}</b></TableCell>
            <TableCell><b>Q.{candidato.aspiracion_salarial}</b></TableCell>
            <TableCell><AgendarEntrevistaDialog candidato={candidato} shortVersion={true}/></TableCell>
        </TableRow>
    )
}