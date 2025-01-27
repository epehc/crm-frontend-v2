import {Residencia} from "@/lib/definitions";
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";

export default function ResidenciaComponent ({residencia}: {residencia: Residencia | null}) {

    if(!residencia){
        return <div>Loading...</div>
    }

    return(
        <div>
            <h2 className="text-3xl font-bold mb-4">Residencia</h2>
            <div className="bg-gray-50 shadow-md rounded-lg p-6 w-4/5">
                <div className='flex flex-col space-y-4'>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label><strong>Calle:</strong></Label>
                            <CustomInput value={residencia.calle} readOnly={true}/>
                            <Label><strong>Zona:</strong></Label>
                            <CustomInput value={residencia.zona} readOnly={true}/>
                            <Label><strong>Municipio:</strong></Label>
                            <CustomInput value={residencia.municipio} readOnly={true}/>
                        </div>
                        <div>
                            <Label><strong>Departamento:</strong></Label>
                            <CustomInput value={residencia.departamento} readOnly={true}/>
                            <Label><strong>Pais de Residencia:</strong></Label>
                            <CustomInput value={residencia.pais_de_residencia} readOnly={true}/>
                            <Label><strong>Vive Con:</strong></Label>
                            <CustomInput value={residencia.vive_con} readOnly={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}