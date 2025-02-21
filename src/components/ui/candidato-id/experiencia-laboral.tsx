import {ExperienciaLaboral} from "@/lib/definitions";
import TrabajoComponent from "./trabajo";

export default function ExperienciaLaboralComponent({experienciaLaboral}: {experienciaLaboral: ExperienciaLaboral[]}) {

    return(
        <div>
            <h2 className="text-3xl font-bold mb-4">Experiencia Laboral</h2>
            {experienciaLaboral.map((trabajo: ExperienciaLaboral) => (
                <TrabajoComponent trabajo={trabajo} key={trabajo.id}/>
            ))}
        </div>

    )
}