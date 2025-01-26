import { Mobilidad} from '@/lib/definitions';
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";

export default function MobilidadComponent({ mobilidad }: { mobilidad: Mobilidad }) {

    /*
    licencia: string;
    licencia_tipo: string;
    licencia_fecha_expiracion: string;
    tiempo_conduciendo: string;
    vehiculo: string;
    vehiculo_tipo: string;
    vehiculo_modelo: string;
    viaje_interior: string;
    viaje_exterior: string;
     */
    return(
        <div>
            <h2 className="text-3xl font-bold mb-4">Mobilidad</h2>
            <div className="bg-gray-50 shadow-md rounded-lg p-6 w-4/5">
                <div>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label><strong>Licencia:</strong></Label>
                            <CustomInput value={mobilidad.licencia} readOnly={true}/>
                            <Label><strong>Tipo de Licencia:</strong></Label>
                            <CustomInput value={mobilidad.licencia_tipo} readOnly={true}/>
                            <Label><strong>Fecha de Expiracion:</strong></Label>
                            <CustomInput value={mobilidad.licencia_fecha_expiracion} readOnly={true}/>
                            <Label><strong>Tiempo Conduciendo:</strong></Label>
                            <CustomInput value={mobilidad.tiempo_conduciendo} readOnly={true}/>
                        </div>
                        <div>
                            <Label><strong>Vehiculo:</strong></Label>
                            <CustomInput value={mobilidad.vehiculo} readOnly={true}/>
                            <Label><strong>Tipo de Vehiculo:</strong></Label>
                            <CustomInput value={mobilidad.vehiculo_tipo} readOnly={true}/>
                            <Label><strong>Modelo de Vehiculo:</strong></Label>
                            <CustomInput value={mobilidad.vehiculo_modelo} readOnly={true}/>
                        </div>
                        <div>
                            <Label><strong>Viaje Interior:</strong></Label>
                            <CustomInput value={mobilidad.viaje_interior} readOnly={true}/>
                            <Label><strong>Viaje Exterior:</strong></Label>
                            <CustomInput value={mobilidad.viaje_exterior} readOnly={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}