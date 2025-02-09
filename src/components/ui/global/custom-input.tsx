import {Input} from "@/components/ui/input";


export default function CustomInput({name, onChange, value, readOnly}: {name?:string, onChange?:React.ChangeEventHandler<HTMLInputElement>; value: string, readOnly: boolean}) {
    return (<Input className='w-4/5' name={name} onChange={onChange} value={value} readOnly={readOnly}></Input>)
}