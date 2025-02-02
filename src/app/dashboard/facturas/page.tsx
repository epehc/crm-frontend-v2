'use client';

import usePageData from "@/app/hooks/usePageData";
import AddFacturaDialog from "@/components/ui/facturas/add-factura-dialog";
import Pagination from "@/components/ui/global/pagination";
import { Factura } from "@/lib/definitions";
import { getFacturas } from "@/services/invoices-service";
import { useEffect, useState } from "react";

export default function FacturasPage() {
    const {
        token,
        currentPage,
        totalPages,
        setTotalPages,
        pageSize,
        handlePageChange,
    } = usePageData('/dashboard/facturas');

    const [facturas, setFacturas] = useState<Factura[]>([]);

    useEffect(() => {
        if (!token) {
            console.log("Token is not available yet");
            return;
        }

        const fetchClientes = async () => {
            try {
                const data = await getFacturas(currentPage, pageSize, token);
                setFacturas(data.data);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Failed to fetch clients", error);
            }
        };

        fetchClientes();
    }, [currentPage, token]);

    const addFactura = (nuevaFactura: Factura) => {
            setFacturas((prevFacturas) => [...prevFacturas, nuevaFactura]);
        };


    return (
        <>
            <div className='flex flex-row space-x-3'>
                <h1 className="text-4xl font-bold mb-4">Facturas</h1>
                <AddFacturaDialog addFactura={addFactura}/>
            </div>
            
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </>
        );
}