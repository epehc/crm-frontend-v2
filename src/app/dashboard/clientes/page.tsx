'use client'

import { Suspense } from "react";
import ClientesTable from "@/components/ui/clientes/clientes-table";
import { Cliente } from "@/lib/definitions";
import { useEffect, useState } from "react";
import { getClientes } from "@/services/clients-service";
import Pagination from "@/components/ui/global/pagination";
import AddClientDialog from "@/components/ui/clientes/add-client-dialog";
import usePageData from "@/hooks/usePageData";
import { usePathname, useSearchParams } from "next/navigation";
import Search from "@/components/ui/global/search";

function ClientsPageContent() {
  const {
    token,
    currentPage,
    totalPages,
    setTotalPages,
    pageSize,
    handlePageChange,
  } = usePageData('/dashboard/clientes');
  
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams ? searchParams.get("query") || "" : "";
  const pathname = usePathname();

  const [refresh, setRefresh] = useState<number>(0);

  useEffect(() => {
    if (!token) {
      console.log("Token is not available yet");
      return;
    }

    const fetchClientes = async () => {
      try {
        const data = await getClientes(currentPage, pageSize, token, query);
        setClientes(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch clients", error);
      }
    };
    fetchClientes();
  }, [currentPage, token, query, pageSize, setTotalPages, pathname, refresh]);

  const addCliente = () => {
    setRefresh(refresh + 1);
  };

  return (
    <>
      <div className="flex flex-row space-x-3">
        <h1 className="text-4xl font-bold mb-4">Clientes</h1>
        <AddClientDialog addCliente={addCliente} />
      </div>
      <Search placeholder="Buscar clientes" />
      <ClientesTable clientes={clientes} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </>
  );
}

export default function ClientsPage() {
  return (
    <Suspense fallback={<div>Cargando clients...</div>}>
      <ClientsPageContent />
    </Suspense>
  );
}
