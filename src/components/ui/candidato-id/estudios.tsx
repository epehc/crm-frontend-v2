import {Estudio} from "@/lib/definitions";
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";
import EstudioComponent from "./estudio";

export default function EstudiosComponent({ estudios }: { estudios: Estudio[] }) {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Estudios</h2>
            <div className="grid grid-cols-3 gap-4">
                {estudios.map((estudio:Estudio) => (
                    <EstudioComponent estudio={estudio} key={estudio.id}/>
                ))}
            </div>
        </div>
    )
}