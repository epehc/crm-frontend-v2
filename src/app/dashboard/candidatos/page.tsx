"use client";

import { Suspense, useEffect, useState } from "react";
import CandidatosTable from "@/components/ui/candidatos/candidatos-table";
import Pagination from "@/components/ui/global/pagination";
import { getCandidatos } from "@/services/candidates-service";
import { Candidato } from "@/lib/definitions";
import usePageData from "@/hooks/usePageData";
import Search from "@/components/ui/global/search";
import { usePathname, useSearchParams } from "next/navigation";

function CandidatesPageContent() {
  const {
    token,
    currentPage,
    totalPages,
    setTotalPages,
    pageSize,
    handlePageChange,
  } = usePageData("/dashboard/candidatos");

  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const searchParams = useSearchParams();
  const query = searchParams?.get("query") || "";
  const pathname = usePathname();

  useEffect(() => {
    if (!token) {
      console.log("Token is not available yet");
      return;
    }

    const fetchCandidatos = async () => {
      try {
        console.log("query", query);
        const data = await getCandidatos(currentPage, pageSize, token, query);
        setCandidatos(data.data);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Failed to fetch candidates", error);
      }
    };

    fetchCandidatos();
  }, [currentPage, token, query, pageSize, setTotalPages, pathname]);

  return (
    <>
      <h1 className="text-4xl font-bold mb-4">Candidatos</h1>
      <Search placeholder="Buscar candidatos" />
      <CandidatosTable candidatos={candidatos} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default function CandidatesPage() {
  return (
    <Suspense fallback={<div>Cargando candidatos...</div>}>
      <CandidatesPageContent />
    </Suspense>
  );
}