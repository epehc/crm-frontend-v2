import { Factura } from "@/lib/definitions";
import CustomInput from "../global/custom-input";
import {Label} from "@/components/ui/label";


export default function FacturaComponent({factura}:{factura: Factura}){

    return(

        <div className="bg-gray-50 shadow-md rounded-lg p-6 w-4/6 mb-10">
            <div className='flex items-center mb-4'>
                <h2 className="text-xl font-bold">Factura</h2>
                <span className='mx-3'></span>
                <p className='text-sm'>{factura.fecha}</p>
            </div>
            <div className='flex flex-col space-y-4'>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <Label><strong>Cliente:</strong></Label>
                        <CustomInput value={factura.cliente} readOnly={true}/>
                        <Label><strong>Numero de Factura:</strong></Label>
                        <CustomInput value={factura.numero_factura} readOnly={true}/>
                        <Label><strong>Fecha de Factura:</strong></Label>
                        <CustomInput value={factura.fecha_factura} readOnly={true}/>
                        <Label><strong>Fecha de Vencimiento:</strong></Label>
                        <CustomInput value={factura.fecha_vencimiento} readOnly={true}/>
                    </div>
                    <div>
                        <Label><strong>Subtotal:</strong></Label>
                        <CustomInput value={factura.subtotal} readOnly={true}/>
                        <Label><strong>IVA:</strong></Label>
                        <CustomInput value={factura.iva} readOnly={true}/>
                        <Label><strong>Total:</strong></Label>
                        <CustomInput value={factura.total} readOnly={true}/>
                    </div>
                    <div>
                        <Label><strong>Estado:</strong></Label>
                        <CustomInput value={factura.estado} readOnly={true}/>
                    </div>
                </div>
            </div>

        </div>
    )
}