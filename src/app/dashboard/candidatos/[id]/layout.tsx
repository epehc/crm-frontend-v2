
import CandidatoInfo from "@/components/ui/candidato-id/candidato-info";
import {dummyCandidatos} from "@/lib/dummy-data";

export default function Layout({ children }: { children: React.ReactNode }) {

    const candidato = dummyCandidatos[0]

    return (
        <div>
            <CandidatoInfo candidato={candidato}/>
            <div>{children}</div>
        </div>
    );
}