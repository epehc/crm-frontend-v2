import { InformacionPersonal} from '@/lib/definitions';
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";

export default function InformacionPersonalComponent({informacionPersonal}: {informacionPersonal: InformacionPersonal | null}) {

    if(!informacionPersonal){
        return <div>Loading...</div>
    }

    return(
        <div>
            <h2 className="text-3xl font-bold mb-4">Informacion Personal</h2>
            <div className="bg-gray-50 shadow-md rounded-lg p-6 w-4/5">
                <div className='flex flex-col space-y-4'>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label><strong>DPI:</strong></Label>
                            <CustomInput value={informacionPersonal.dpi} readOnly={true}/>
                            <Label><strong>Fecha de Nacimiento:</strong></Label>
                            <CustomInput value={informacionPersonal.fecha_nacimiento} readOnly={true}/>
                            <Label><strong>Edad:</strong></Label>
                            <CustomInput value={informacionPersonal.edad} readOnly={true}/>
                            <Label><strong>Nacionalidad:</strong></Label>
                            <CustomInput value={informacionPersonal.nacionalidad} readOnly={true}/>
                            <Label><strong>Estado Civil:</strong></Label>
                            <CustomInput value={informacionPersonal.estado_civil} readOnly={true}/>
                            <Label><strong>Personas Dependientes:</strong></Label>
                            <CustomInput value={informacionPersonal.personas_dependientes} readOnly={true}/>
                        </div>
                        <div>
                            <Label><strong>Nivel de Estudios:</strong></Label>
                            <CustomInput value={informacionPersonal.nivel_estudios} readOnly={true}/>
                            <Label><strong>Estudios Adicionales:</strong></Label>
                            <CustomInput value={informacionPersonal.estudios_adicionales} readOnly={true}/>
                            <Label><strong>Adjetivos:</strong></Label>
                            <CustomInput value={informacionPersonal.adjetivos} readOnly={true}/>
                            <Label><strong>Software:</strong></Label>
                            <CustomInput value={informacionPersonal.software} readOnly={true}/>
                            <Label><strong>Idiomas:</strong></Label>
                            <CustomInput value={informacionPersonal.idiomas} readOnly={true}/>
                        </div>
                        <div>
                            <Label><strong>Partido Politico:</strong></Label>
                            <CustomInput value={informacionPersonal.partido_politico} readOnly={true}/>
                            <Label><strong>Sindicato:</strong></Label>
                            <CustomInput value={informacionPersonal.sindicato} readOnly={true}/>
                            <Label><strong>Impedimento Fisico:</strong></Label>
                            <CustomInput value={informacionPersonal.impedimento_fisico} readOnly={true}/>
                            <Label><strong>Enfermedad:</strong></Label>
                            <CustomInput value={informacionPersonal.enfermedad} readOnly={true}/>
                            <Label><strong>Religion:</strong></Label>
                            <CustomInput value={informacionPersonal.religion} readOnly={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}