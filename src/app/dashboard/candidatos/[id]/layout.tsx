'use client'

import { CandidatoDataProvider } from "@/contexts/useCandidatoDataContext"

export default function CandidatoLayout({children} : {children: React.ReactNode}) {

    return(
        <CandidatoDataProvider>
            {children}
        </CandidatoDataProvider>
    )
}