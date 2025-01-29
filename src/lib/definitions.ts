

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

export type Evento = {
    summary: string;
    description: string;
    startTime: string;
    endTime: string;
    organizer: string;
    attendee: string;
}


export type Cliente = {
    client_id: string;
    nombre: string;
    direccion: string;
    telefono: string;
    persona_contacto: string;
    telefono_persona_contacto: string;
    email_persona_contacto: string;
    nit: string;
    plazas: string[];
    saldo_pendiente: number;
    credito_por_dias: number;
    saldo_vencido: number;
}

export type Factura = {
    factura_id: string;
    fecha: string;
    cliente_id: string;
    nit: string;
    total: number;
    estado: string;
    productos: any[];
    saldo_vencido: number;
    credito_por_dias: number;
    fecha_vencimiento: string;
    iva: number;
}

export type Pago = {
    pago_id: string;
    factura_id: string;
    fecha: string;
    monto: number;
    monto_retenido: number;
    boleta_pago: string;
}