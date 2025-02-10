'use client'
import Informe from "@/components/ui/candidato-id/informe/informe";
import {Button} from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useCandidatoDataContext } from "@/contexts/useCandidatoDataContext";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";


export default function InformePage(){

    const router = useRouter();

    const {data} = useCandidatoDataContext()
    

    return(
        <>
            <Button className="mb-4"onClick={() => router.push(`/dashboard/candidatos/${data?.candidato?.candidato_id}`)}>
                <ArrowLeftIcon/>
                Regresar
            </Button>
            <Informe/>
        </>
    )
}