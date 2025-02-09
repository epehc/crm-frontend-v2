'use client'

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {CalendarIcon, ClockIcon} from "@heroicons/react/24/outline";
import {useState} from "react";
import {Candidato, Evento} from "@/lib/definitions";
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {cn} from "@/lib/utils";
import {useSession} from "next-auth/react";
import {createEvent} from "@/services/calendar-service";
import { useToast } from "@/hooks/use-toast";


export default function AgendarEntrevistaDialog({candidato, shortVersion}: {candidato: Candidato, shortVersion: boolean}) {
    const {data: session} = useSession();
    const token = session?.accessToken as string;
    const organizer = session?.user.email as string;

    const {toast} = useToast();

    const [dateTime, setDateTime] = useState<string>("");
    const [title, setTitle] = useState<string>(`Entrevista con ${candidato.nombre}`)
    const [description, setDescription] = useState<string>("")
    const [duration, setDuration] = useState<number>(30)
    const [isSelectOpen, setIsSelectOpen] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)


    useEffect(() => {
        console.log("AgendarEventoDialog rendered");
    }, []);

    const handleChangeDateTime = (e: React.ChangeEvent<HTMLInputElement>)=> {
        setDateTime(e.target.value)
    }

    const handleChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    const handleChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleChangeDuration = (duration: number)=> {
        setDuration(duration)
        console.log(duration)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(!dateTime || !duration || !organizer ){
            toast({
                title: "Error",
                description: "Por favor llena todos los campos",
            });
            return
        }

        const startTime = new Date(dateTime).toISOString()
        const endTime = new Date(new Date(dateTime).getTime() + duration * 60000).toISOString()

        const eventDetails: Evento = {
            summary: title,
            description,
            startTime,
            endTime,
            organizer,
            attendee: candidato.correo,
        }

        console.log("Event details: ", eventDetails)

        try{
            const response = await createEvent(eventDetails, token);
            toast({
                title: "Entrevista Agendada",
                description: "Entrevista agendada exitosamente",
            });
            console.log("Event created: ", response)
            setIsDialogOpen(false)
        }catch (error){
            console.error("Failed to create event", error)
            toast({
                title: "Error",
                description: "Error al agendar entrevista",
            });
        }

    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>
                    <CalendarIcon/>
                    {shortVersion ? "" : "Agendar Entrevista"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Agendar Entrevista con {candidato.nombre}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Titulo:
                            </Label>
                            <Textarea className='w-[240px] justify-start text-left font-normal' value={title}
                                    onChange={handleChangeTitle} placeholder={`Entrevista con ${candidato.nombre}`}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Descripcion:
                            </Label>
                            <Textarea className='w-[240px] justify-start text-left font-normal' value={description}
                                    onChange={handleChangeDescription} placeholder={`Entrevista para ${candidato.puesto_aplicado}`}/>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-2">
                            <Label className="text-right">
                                Fecha y hora:
                            </Label>
                            <Input
                                type="datetime-local"
                                value={dateTime}
                                onChange={handleChangeDateTime}
                                className="w-[240px] justify-start text-left font-normal border rounded p-2"
                            />

                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Duracion:
                            </Label>
                            <Select open={isSelectOpen} onOpenChange={setIsSelectOpen} value={String(duration)}
                                    onValueChange={(value) => handleChangeDuration(Number(value))}>
                                <SelectTrigger className={cn(
                                    "w-[240px] justify-between text-left font-normal",
                                    !duration
                                )}>
                                    <div className='flex items-center justify-between'>
                                        <SelectValue placeholder={"Seleccionar Duracion"}/>
                                        <ClockIcon className='h-5 w-5 ml-1'/>
                                    </div>
                                </SelectTrigger>
                                <SelectContent className="w-auto p-0" align="start">
                                    <SelectItem value="30">30 minutos</SelectItem>
                                    <SelectItem value="45">45 minutos</SelectItem>
                                    <SelectItem value="60">60 minutos</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">
                            <CalendarIcon/>
                            Agendar Entrevista
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
