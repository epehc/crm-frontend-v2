import {ExperienciaLaboral} from "@/lib/definitions";
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";
import {Textarea} from "@/components/ui/textarea";

export default function ExperienciaLaboralComponent({experienciaLaboral}: {experienciaLaboral: ExperienciaLaboral[]}) {

    return(
        <div>
            <h2 className="text-3xl font-bold mb-4">Experiencia Laboral</h2>
            {experienciaLaboral.map((trabajo: ExperienciaLaboral) => (
                <div key={trabajo.id} className="bg-gray-50 shadow-md rounded-lg p-6 w-4/6 mb-10">
                    <div className='flex items-center mb-4'>
                        <h2 className="text-xl font-bold">{trabajo.puesto}</h2>
                        <span className='mx-3'></span>
                        <p className='text-sm'>{trabajo.fecha_inicio} - {trabajo.fecha_fin}</p>
                    </div>
                    <div className='flex flex-col space-y-4'>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label><strong>Empresa:</strong></Label>
                                <CustomInput value={trabajo.empresa} readOnly={true}/>
                                <Label><strong>Direccion de Empresa:</strong></Label>
                                <CustomInput value={trabajo.direccion_empresa} readOnly={true}/>
                                <Label><strong>Telefono de Empresa:</strong></Label>
                                <CustomInput value={trabajo.telefono_empresa} readOnly={true}/>
                                <Label><strong>Ultimo Salario:</strong></Label>
                                <CustomInput value={trabajo.salario} readOnly={true}/>
                            </div>
                            <div>
                                <Label><strong>Jefe:</strong></Label>
                                <CustomInput value={trabajo.jefe_nombre} readOnly={true}/>
                                <Label><strong>Telefono de Jefe:</strong></Label>
                                <CustomInput value={trabajo.jefe_telefono} readOnly={true}/>
                                <Label><strong>Motivo de Salida:</strong></Label>
                                <CustomInput value={trabajo.motivo_salida} readOnly={true}/>
                            </div>
                            <div>
                                <Label><strong>Responsabilidades:</strong></Label>
                                <Textarea value={trabajo.responsabilidades} readOnly={true}/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    )
}