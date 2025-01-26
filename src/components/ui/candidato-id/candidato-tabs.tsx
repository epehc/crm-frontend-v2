'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function CandidatoTabs() {

    return (
        <Tabs defaultValue='info'>
            <div className='flex justify-center align-middle'>
                <TabsList className=''>
                    <TabsTrigger value='info'>Informacion Personal</TabsTrigger>
                    <TabsTrigger value='contactos'>Contactos</TabsTrigger>
                    <TabsTrigger value='estudios'>Estudios</TabsTrigger>
                    <TabsTrigger value='experiencia'>Experiencia Laboral</TabsTrigger>
                    <TabsTrigger value='mobilidad'>Mobilidad</TabsTrigger>
                    <TabsTrigger value='residencia'>Residencia</TabsTrigger>
                    <TabsTrigger value='vicios'>Vicios</TabsTrigger>
                </TabsList>
            </div>
            <TabsContent value='info'>Informacion Personal</TabsContent>
            <TabsContent value='contactos'>Contactos</TabsContent>
            <TabsContent value='estudios'>Estudios</TabsContent>
            <TabsContent value='experiencia'>Experiencia Laboral</TabsContent>
            <TabsContent value='mobilidad'>Mobilidad</TabsContent>
            <TabsContent value='residencia'>Residencia</TabsContent>
            <TabsContent value='vicios'>Vicios</TabsContent>
        </Tabs>
    )
}