'use client';

import { Suspense, useEffect, useState } from "react";
import usePageData from "@/hooks/usePageData";
import AddFacturaDialog from "@/components/ui/facturas/add-factura-dialog";
import FacturasTable from "@/components/ui/facturas/facturas-table";
import Pagination from "@/components/ui/global/pagination";
import Search from "@/components/ui/global/search";
import { Factura, Pago } from "@/lib/definitions";
import { getAllPagos, getFacturas } from "@/services/invoices-service";
import { usePathname, useSearchParams } from "next/navigation";

function FacturasPageContent() {
  const {
    token,
    currentPage,
    totalPages,
    setTotalPages,
    pageSize,
    handlePageChange,
  } = usePageData("/dashboard/facturas");

  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const searchParams = useSearchParams();
  const query = searchParams ? searchParams.get("query") || "" : "";
  const pathname = usePathname();

  useEffect(() => {
    if (!token) {
      console.log("Token is not available yet");
      return;
    }

    const fetchFacturasAndPagos = async () => {
      try {
        const facturasResponse = await getFacturas(currentPage, pageSize, token, query);
        setFacturas(facturasResponse.data);
        setTotalPages(facturasResponse.totalPages);

        const pagosResponse = await getAllPagos(token);
        setPagos(pagosResponse);
        console.log("Facturas y pagos fetched successfully");
      } catch (error) {
        console.error("Failed to fetch facturas/pagos", error);
      }
    };

    fetchFacturasAndPagos();
  }, [currentPage, token, query, pageSize, setTotalPages, pathname, refresh]);

  const onChange = () => {
    setRefresh(refresh + 1);
  };

  return (
    <>
      <div className="flex flex-row space-x-3">
        <h1 className="text-4xl font-bold mb-4">Facturas</h1>
        <AddFacturaDialog addFactura={onChange} />
      </div>
      <Search placeholder="Buscar facturas" />
      <FacturasTable facturas={facturas} pagos={pagos} onChange={onChange} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default function FacturasPage() {
  return (
    <Suspense fallback={<div>Cargando facturas...</div>}>
      <FacturasPageContent />
    </Suspense>
  );
}