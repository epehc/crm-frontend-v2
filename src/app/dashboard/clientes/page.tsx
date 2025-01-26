"use client";

import ClientesTable from "@/components/ui/clientes/clientes-table";

export default function ClientsPage() {

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Clientes</h1>
            <ClientesTable />
        </div>
    );
}
