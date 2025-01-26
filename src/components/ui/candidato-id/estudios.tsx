import {Estudio} from "@/lib/definitions";
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";

export default function EstudiosComponent({ estudios }: { estudios: Estudio[] }) {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">Estudios</h2>
            <div className="grid grid-cols-3 gap-4">
                {estudios.map((estudio:Estudio) => (
                    <div key={estudio.id} className="bg-gray-50 shadow-md rounded-lg p-6">
                        <h2 className="text-xl font-bold mb-4">{estudio.titulo}</h2>
                        <div className='flex flex-col space-y-4'>
                            <div>
                                <Label><strong>Institucion:</strong></Label>
                                <CustomInput value={estudio.institucion} readOnly={true}/>
                                <Label><strong>Grado:</strong></Label>
                                <CustomInput value={estudio.grado} readOnly={true}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}