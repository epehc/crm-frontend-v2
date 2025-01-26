'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {CalendarIcon} from "@heroicons/react/24/outline";
import {dummyCandidatos} from "@/lib/dummy-data";
import {DatePicker} from "@/components/ui/global/date-picker";
import {useState} from "react";
import {DurationPicker} from "@/components/ui/global/duration-picker";

export default function AgendarEntrevistaDialog() {
    const [date, setDate] = useState<Date>()
    const [duration, setDuration] = useState<number>()
    const candidato = dummyCandidatos[0]

    const handleChangeDate = (date: Date)=> {
        setDate(date)
        console.log('date', date)
    }

    const handleChangeDuration = (duration: number)=> {
        setDuration(duration)
        console.log('duration', duration)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>
                    <CalendarIcon/>
                    Agendar Entrevista
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Agendar Entrevista con {candidato.nombre}</DialogTitle>
                    <DialogDescription>
                        Agregue los detalles para la entrevista
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label  className="text-right">
                            Fecha:
                        </Label>
                        <DatePicker onChange={handleChangeDate}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">
                            Duracion:
                        </Label>
                        <DurationPicker onChange={handleChangeDuration}/>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">
                        <CalendarIcon/>
                        Agendar Entrevista
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
