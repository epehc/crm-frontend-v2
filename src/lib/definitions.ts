//CandidatoData

export type CandidatoData = {
    candidato: Candidato | null;
    informacionPersonal: InformacionPersonal | null;
    contactos: Contacto[];
    estudios: Estudio[];
    experienciaLaboral: ExperienciaLaboral[];
    mobilidad: Mobilidad | null;
    residencia: Residencia | null;
    vicios: Vicios | null;
}

export type InformeTexts = {
    desenvolvimiento: string;
    referencias: string;
}

//Candidatos
export type Candidato = {
    candidato_id: string;
    nombre: string;
    puesto_aplicado: string;
    como_se_entero: string;
    genero: string;
    telefono_whatsapp: string;
    telefono: string;
    correo: string;
    aspiracion_salarial: string;
    timestamp: string;
    comentarios: string;
}

export type Contacto = {
    id: string;
    candidato_id: string;
    parentezco: string;
    nombre: string;
    trabajo: string;
    telefono: string;

}

export type Estudio ={
    id: string;
    candidato_id: string
    institucion: string;
    titulo: string;
    grado: string;
}

export type ExperienciaLaboral ={
    id: string;
    candidato_id: string;
    empresa: string;
    puesto: string;
    fecha_inicio: string;
    fecha_fin: string;
    telefono_empresa: string;
    direccion_empresa: string;
    jefe_nombre: string;
    jefe_telefono: string;
    motivo_salida: string;
    responsabilidades: string;
    salario: string;
}

export type InformacionPersonal= {
    candidato_id: string;
    dpi: string;
    fecha_nacimiento: string;
    edad: string;
    nacionalidad: string;
    estado_civil: string;
    personas_dependientes: string;
    nivel_estudios: string;
    estudios_adicionales: string;
    adjetivos: string;
    software: string;
    idiomas: string;
    partido_politico: string;
    sindicato: string;
    impedimento_fisico: string;
    enfermedad: string;
    religion: string;
}

export type Mobilidad = {
    candidato_id: string;
    licencia: string;
    licencia_tipo: string;
    licencia_fecha_expiracion: string;
    tiempo_conduciendo: string;
    vehiculo: string;
    vehiculo_tipo: string;
    vehiculo_modelo: string;
    viaje_interior: string;
    viaje_exterior: string;
}

export type Residencia = {
    candidato_id: string;
    vive_con: string;
    calle: string;
    zona: string;
    municipio: string;
    departamento: string;
    pais_de_residencia: string;
}

export type Vicios = {
    candidato_id: string;
    fuma: string;
    alcohol: string;
    alcohol_frecuencia: string;
    drogas: string;
    tatuajes: string;
}

//---------------------------------------------------------
// Calendario

export type Evento = {
    summary: string;
    description: string;
    startTime: string;
    endTime: string;
    organizer: string;
    attendee: string;
}


//---------------------------------------------------------
// Clientes

export interface NuevoCliente  {
    nombre: string;
    direccion: string;
    telefono: string;
    nit: string;
    credito_por_dias: number;
}

export interface Cliente extends NuevoCliente {
    client_id: string;
    plazas: string[];
    saldo_pendiente: number;
    saldo_vencido: number;
}

export interface NuevaPersonaContacto {
    client_id: string;
    nombre: string;
    telefono: string;
    correo: string;
}

export interface PersonaContacto extends NuevaPersonaContacto {
    persona_contacto_id: string;
}

//---------------------------------------------------------
// Facturas

export interface NuevaFactura {
    client_id: string;
    cliente_nombre: string;
    estado: EstadoFactura;
    fecha: string;
    fecha_vencimiento: string;
    total: number;
    iva: number;
    total_sin_iva: number;
    abonado: number;
    saldo_pendiente: number;
    nit: string;
    descripcion: string;
}

export interface Factura extends NuevaFactura {
    factura_id: number;
}

export interface NuevoPago {
    factura_id: number;
    fecha: string;
    monto: number;
    boleta_pago: string;
}

export interface Pago extends NuevoPago {
    pago_id: string;
    
}

export enum EstadoFactura {
    CREADA = 'creada',
    PAGADA = 'pagada',
    PARCIAL = 'parcial',
    VENCIDA = 'vencida',
    ANULADA = 'anulada'
}