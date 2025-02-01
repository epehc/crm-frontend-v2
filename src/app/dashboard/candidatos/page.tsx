"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import CandidatosTable from "@/components/ui/candidatos/candidatos-table";
import Pagination from "@/components/ui/global/pagination";
import { getCandidatos } from "@/services/candidates-service";
import { Candidato } from "@/lib/definitions";
import {PlusIcon} from "@heroicons/react/24/outline";
import {Button} from "@/components/ui/button";
import {Separator} from "@/components/ui/separator";

export default function CandidatesPage() {
    const { data: session } = useSession();
    const token = session?.accessToken as string;
    const searchParams = useSearchParams();
    const router = useRouter();

    const [candidatos, setCandidatos] = useState<Candidato[]>([]);
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

        const fetchCandidatos = async () => {
            try {
                const data = await getCandidatos(currentPage, pageSize, token);
                setCandidatos(data.data);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error("Failed to fetch candidates", error);
            }
        };

        fetchCandidatos();
    }, [currentPage, token]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        router.push(`/dashboard/candidatos?page=${page}`, undefined, { shallow: true });
    };

    return (
        <>
            <h1 className="text-4xl font-bold mb-4">Candidatos</h1>
            <CandidatosTable candidatos={candidatos} />
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    );
}