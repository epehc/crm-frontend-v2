"use client";

import ClientesTable from "@/components/ui/clientes/clientes-table";
import {Cliente} from "@/lib/definitions";
import {useEffect, useState} from "react";
import {getClientes} from "@/services/clients-service";
import Pagination from "@/components/ui/global/pagination";
import AddClientDialog from "@/components/ui/clientes/add-client-dialog";
import usePageData from "@/app/hooks/usePageData";

export default function ClientsPage() {
    const {
        token,
        currentPage,
        totalPages,
        setTotalPages,
        pageSize,
        handlePageChange,
    } = usePageData('/dashboard/clientes');
    
    const [clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        if (!token) {
            console.log("Token is not available yet");
            return;
        }

        const fetchClientes = async () => {
            try {
                const data = await getClientes(currentPage, pageSize, token);
                setClientes(data.data);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Failed to fetch clients", error);
            }
        };

        fetchClientes();
    }, [currentPage, token]);

    
    const addCliente = (nuevoCliente: Cliente) => {
        setClientes((prevClientes) => [...prevClientes, nuevoCliente]);
    };

    return (
        <>
            <div className='flex flex-row space-x-3'>
                <h1 className="text-4xl font-bold mb-4">Clientes</h1>
                <AddClientDialog addCliente={addCliente}/>
            </div>
            <ClientesTable clientes={clientes}/>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </>
    );
}
