"use client";

import CandidatosTable from "@/components/ui/candidatos/candidatos-table";

export default function CandidatesPage() {

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Candidatos</h1>
            <CandidatosTable />
        </div>
    );
}
