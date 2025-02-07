'use client';

import usePageData from "@/app/hooks/usePageData";
import AddFacturaDialog from "@/components/ui/facturas/add-factura-dialog";
import FacturasTable from "@/components/ui/facturas/facturas-table";
import Pagination from "@/components/ui/global/pagination";
import Search from "@/components/ui/global/search";
import { Factura, Pago } from "@/lib/definitions";
import { updateFacturasAndClientsSaldo} from "@/lib/utils";
import { getAllPagos, getFacturas } from "@/services/invoices-service";
import { usePathname, useSearchParams } from "next/navigation";
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
    const [pagos, setPagos] = useState<Pago[]>([]);
    const [refresh, setRefresh] = useState<number>(0);
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";
    const pathname = usePathname();


    useEffect(() => {
        if (!token) {
            console.log("Token is not available yet");
            return;
        }

        const fetchFacturasAndPagos = async () => {
            try {
                //Check if the due date of the invoices has passed and update the status
                //await updateFacturasAndClientsSaldo(token);

                const facturasResponse = await getFacturas(currentPage, pageSize, token, query);
                setFacturas(facturasResponse.data);
                setTotalPages(facturasResponse.totalPages);

                const pagosResponse = await getAllPagos(token);
                console.log(pagosResponse)
                setPagos(pagosResponse);
                console.log("Facturas y pagos fetched successfully");
            } catch (error) {
                console.error("Failed to fetch clients", error);
            }
        };

        fetchFacturasAndPagos();
    }, [currentPage, token, query, pageSize, setTotalPages, pathname, refresh]);

    const onChange = () => {
        setRefresh(refresh + 1);
    }

    return (
        <>
            <div className='flex flex-row space-x-3'>
                <h1 className="text-4xl font-bold mb-4">Facturas</h1>
                <AddFacturaDialog addFactura={onChange}/>
            </div>
            <Search placeholder="Buscar facturas"/>
            <FacturasTable facturas={facturas} pagos={pagos} onChange={onChange}/>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </>
        );
}