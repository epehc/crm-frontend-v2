import {TableCell, TableRow} from "@/components/ui/table";
import {Cliente} from "@/lib/definitions";
import {useRouter} from "next/navigation";

export default function ClienteRow({cliente}: {cliente: Cliente}) {
    const router = useRouter();

    const handleRowClick = () => {
        router.push(`/dashboard/candidatos/${cliente.client_id}`);
    }

    return(
        <TableRow onClick={handleRowClick} style={{cursor: "pointer"}}>
            <TableCell><strong>{cliente.nombre}</strong></TableCell>
            <TableCell>{cliente.direccion}</TableCell>
            <TableCell>{cliente.telefono}</TableCell>
            <TableCell><strong>{cliente.persona_contacto}</strong></TableCell>
            <TableCell><strong>{cliente.nit}</strong></TableCell>
            <TableCell><strong>{cliente.saldo_pendiente}</strong></TableCell>
            <TableCell><strong>{cliente.saldo_vencido}</strong></TableCell>

        </TableRow>
    )
}