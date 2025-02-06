import {TableCell, TableRow} from "@/components/ui/table";
import {Cliente} from "@/lib/definitions";
import {useRouter} from "next/navigation";
import AgendarEventoDialog from "../cliente-id/agendar-evento-dialog";

export default function ClienteRow({cliente}: {cliente: Cliente}) {
    const router = useRouter();

    const handleRowClick = () => { 
        router.push(`/dashboard/clientes/${cliente.client_id}`);
    }

    return(
        <TableRow onClick={handleRowClick} style={{cursor: "pointer"}}>
            <TableCell><strong>{cliente.nombre}</strong></TableCell>
            <TableCell>{cliente.direccion}</TableCell>
            <TableCell>{cliente.telefono}</TableCell>
            <TableCell><strong>{cliente.nit}</strong></TableCell>
            <TableCell><strong>Q. {cliente.saldo_pendiente}</strong></TableCell>
            <TableCell><strong>Q. {cliente.saldo_vencido}</strong></TableCell>
            <TableCell><AgendarEventoDialog cliente={cliente} personasContacto={[]} shortVersion={true}/></TableCell>
        </TableRow>
    )
}