"use client";

import ClientesTable from "@/components/ui/clientes/clientes-table";
import {useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import {Cliente} from "@/lib/definitions";
import {useEffect, useState} from "react";
import {getClientes} from "@/services/clients-service";
import Pagination from "@/components/ui/global/pagination";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "@heroicons/react/24/outline";
import {Separator} from "@/components/ui/separator";
import {dummyClientes} from "@/lib/dummy-data";
import AddClientDialog from "@/components/ui/clientes/add-client-dialog";

export default function ClientsPage() {
    const {data: session} = useSession();
    const token = session?.accessToken as string;
    const searchParams = useSearchParams();
    const router = useRouter();

    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 12;

    useEffect(() => {
        const page = parseInt(searchParams?.get("page") as string) || 1;
        setCurrentPage(page);
    }, [searchParams]);

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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        router.push(`/dashboard/clientes?page=${page}`);
    }

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
