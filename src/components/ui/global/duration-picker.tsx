'use client'

import * as React from "react"
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import {ClockIcon} from "@heroicons/react/24/outline";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";


export function DurationPicker({ onChange }: { onChange: (duration: number) => void }) {
    const [duration, setDuration] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if(duration) {
            onChange(duration)
            setIsOpen(false)
        }
    }, [duration])

    return(
        <Select open={isOpen} onOpenChange={setIsOpen}>
            <SelectTrigger className={cn(
                "w-[240px] justify-start text-left font-normal",
                !duration && "text-muted-foreground"
            )}>
                <ClockIcon className='h-5 w-5 ml-1'/>
                <span className='mr-2'></span>
                <SelectValue placeholder={"Seleccionar Duracion"}/>
            </SelectTrigger>
            <SelectContent className="w-auto p-0" align="start">
                <SelectItem value="30" onSelect={() => setDuration(30)}>30 minutos</SelectItem>
                <SelectItem value="45" onSelect={() => setDuration(45)}>45 minutos</SelectItem>
                <SelectItem value="60" onSelect={() => setDuration(60)}>60 minutos</SelectItem>
            </SelectContent>
        </Select>
    )
}