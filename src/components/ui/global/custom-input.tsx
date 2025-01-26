import {Input} from "@/components/ui/input";


export default function CustomInput({value, readOnly}: {value: string, readOnly: boolean}) {
    return (<Input className='w-4/5' value={value} readOnly={readOnly}></Input>)
}