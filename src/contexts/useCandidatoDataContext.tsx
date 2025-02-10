'use client'

import { CandidatoData, InformeTexts } from "@/lib/definitions";
import { createContext, useContext, useState } from "react";



interface CandidatoDataContextProps {
    data: CandidatoData | null;
    setData: (data: CandidatoData | null) => void;
    informeTexts: InformeTexts;
    setInformeTexts: (texts: InformeTexts) => void;
    empresa: string;
    setEmpresa: (empresa: string) => void;
}

const CandidatoDataContext = createContext<CandidatoDataContextProps>({
    data: null,
    setData: () => {},
    informeTexts: {
        desenvolvimiento: '',
        referencias: ''
    },
    setInformeTexts: () => {},
    empresa: '',
    setEmpresa: () => {}
});

export function CandidatoDataProvider({ children }: { children: React.ReactNode }) {
    const [data, setData] = useState<CandidatoData | null>(null);
    const [informeTexts, setInformeTexts] = useState<InformeTexts>({
        desenvolvimiento: '',
        referencias: ''
    });
    const [empresa, setEmpresa] = useState<string>('');

    return (
        <CandidatoDataContext.Provider value={{ data, setData, informeTexts, setInformeTexts, empresa, setEmpresa }}>
            {children}
        </CandidatoDataContext.Provider>
    )
}

export function useCandidatoDataContext() {
    return useContext(CandidatoDataContext);
}
