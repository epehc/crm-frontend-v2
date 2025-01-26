import {Vicios} from "@/lib/definitions";
import {Label} from "@/components/ui/label";
import CustomInput from "@/components/ui/global/custom-input";

export default function ViciosComponent({vicios}: {vicios: Vicios}) {

    return(
        <div>
            <h2 className="text-3xl font-bold mb-4">Vicios</h2>
            <div className="bg-gray-50 shadow-md rounded-lg p-6 w-4/5">
                <div className='flex flex-col space-y-4'>
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Label><strong>Fuma:</strong></Label>
                            <CustomInput value={vicios.fuma} readOnly={true}/>
                            <Label><strong>Alcohol:</strong></Label>
                            <CustomInput value={vicios.alcohol} readOnly={true}/>
                            <Label><strong>Alcohol Frecuencia:</strong></Label>
                            <CustomInput value={vicios.alcohol_frecuencia} readOnly={true}/>
                        </div>
                        <div>
                            <Label><strong>Drogas:</strong></Label>
                            <CustomInput value={vicios.drogas} readOnly={true}/>
                            <Label><strong>Tatuajes:</strong></Label>
                            <CustomInput value={vicios.tatuajes} readOnly={true}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}