import {
    Candidato, Cliente,
    Contacto,
    Estudio,
    ExperienciaLaboral, Factura,
    InformacionPersonal,
    Mobilidad, Pago,
    Residencia, Vicios
} from "@/lib/definitions";

export const dummyCandidatos: Candidato[] = [
    {
        candidato_id: "1",
        nombre: "John Doe",
        puesto_aplicado: "Software Engineer",
        como_se_entero: "LinkedIn",
        genero: "Male",
        telefono_whatsapp: "1234567890",
        telefono: "0987654321",
        correo: "john.doe@example.com",
        aspiracion_salarial: "50000",
        timestamp: "2023-01-01T12:00:00Z"
    },
    {
        candidato_id: "2",
        nombre: "Jane Smith",
        puesto_aplicado: "Product Manager",
        como_se_entero: "Indeed",
        genero: "Female",
        telefono_whatsapp: "2345678901",
        telefono: "9876543210",
        correo: "jane.smith@example.com",
        aspiracion_salarial: "60000",
        timestamp: "2023-01-02T12:00:00Z"
    }
];

export const dummyContactos: Contacto[] = [
    {
        id: "1",
        candidato_id: "1",
        parentezco: "Friend",
        nombre: "Alice Johnson",
        trabajo: "Teacher",
        telefono: "1231231234"
    },
    {
        id: "2",
        candidato_id: "2",
        parentezco: "Colleague",
        nombre: "Bob Brown",
        trabajo: "Engineer",
        telefono: "2342342345"
    }
];

export const dummyEstudios: Estudio[] = [
    {
        id: "1",
        candidato_id: "1",
        institucion: "MIT",
        titulo: "BSc Computer Science",
        grado: "Bachelor"
    },
    {
        id: "2",
        candidato_id: "2",
        institucion: "Harvard",
        titulo: "MBA",
        grado: "Master"
    }
];

export const dummyExperienciasLaborales: ExperienciaLaboral[] = [
    {
        id: "1",
        candidato_id: "1",
        empresa: "Tech Corp",
        puesto: "Developer",
        fecha_inicio: "2020-01-01",
        fecha_fin: "2022-01-01",
        telefono_empresa: "1231231234",
        direccion_empresa: "123 Tech Street",
        jefe_nombre: "Mr. Boss",
        jefe_telefono: "1231231234",
        motivo_salida: "Career Growth",
        responsabilidades: "Developing software",
        salario: "50000"
    },
    {
        id: "2",
        candidato_id: "2",
        empresa: "Business Inc",
        puesto: "Manager",
        fecha_inicio: "2019-01-01",
        fecha_fin: "2021-01-01",
        telefono_empresa: "2342342345",
        direccion_empresa: "456 Business Avenue",
        jefe_nombre: "Ms. Leader",
        jefe_telefono: "2342342345",
        motivo_salida: "New Opportunity",
        responsabilidades: "Managing projects",
        salario: "60000"
    }
];

export const dummyInformacionPersonal: InformacionPersonal[] = [
    {
        candidato_id: "1",
        dpi: "123456789",
        nacionalidad: "American",
        estado_civil: "Single",
        religion: "None",
        software: "MS Office",
        partido_politico: "None",
        sindicato: "None",
        impedimento_fisico: "None",
        enfermedad: "None",
        personas_dependientes: "0",
        edad: "30",
        fecha_nacimiento: "1993-01-01",
        idiomas: "English",
        nivel_estudios: "BSc",
        estudios_adicionales: "None",
        adjetivos: "Hardworking, Punctual"
    },
    {
        candidato_id: "2",
        dpi: "987654321",
        nacionalidad: "Canadian",
        estado_civil: "Married",
        religion: "Christian",
        software: "Google Suite",
        partido_politico: "None",
        sindicato: "None",
        impedimento_fisico: "None",
        enfermedad: "None",
        personas_dependientes: "2",
        edad: "35",
        fecha_nacimiento: "1988-01-01",
        idiomas: "English, French",
        nivel_estudios: "MBA",
        estudios_adicionales: "None",
        adjetivos: "Dedicated, Organized"
    }
];

export const dummyMobilidad: Mobilidad[] = [
    {
        candidato_id: "1",
        licencia: "Yes",
        licencia_tipo: "B",
        licencia_fecha_expiracion: "2025-01-01",
        tiempo_conduciendo: "10 years",
        vehiculo: "Yes",
        vehiculo_tipo: "Car",
        vehiculo_modelo: "Toyota",
        viaje_interior: "Yes",
        viaje_exterior: "No"
    },
    {
        candidato_id: "2",
        licencia: "Yes",
        licencia_tipo: "A",
        licencia_fecha_expiracion: "2024-01-01",
        tiempo_conduciendo: "5 years",
        vehiculo: "Yes",
        vehiculo_tipo: "Motorcycle",
        vehiculo_modelo: "Honda",
        viaje_interior: "Yes",
        viaje_exterior: "Yes"
    }
];

export const dummyResidencias: Residencia[] = [
    {
        candidato_id: "1",
        vive_con: "Alone",
        calle: "123 Main St",
        zona: "1",
        municipio: "Cityville",
        departamento: "Techland",
        pais_de_residencia: "USA"
    },
    {
        candidato_id: "2",
        vive_con: "Family",
        calle: "456 Elm St",
        zona: "2",
        municipio: "Townsville",
        departamento: "Bizland",
        pais_de_residencia: "Canada"
    }
];

export const dummyVicios: Vicios[] = [
    {
        candidato_id: "1",
        fuma: "No",
        alcohol: "Occasionally",
        alcohol_frecuencia: "Once a month",
        drogas: "No",
        tatuajes: "No"
    },
    {
        candidato_id: "2",
        fuma: "Yes",
        alcohol: "Regularly",
        alcohol_frecuencia: "Once a week",
        drogas: "No",
        tatuajes: "Yes"
    }
];

export const dummyClientes: Cliente[] = [
    {
        client_id: "1",
        nombre: "Client A",
        direccion: "789 Business Rd",
        telefono: "1231231234",
        nit: "123456789",
        plazas: ["Plaza 1", "Plaza 2"],
        saldo_pendiente: 1000,
        credito_por_dias: 30,
        saldo_vencido: 200
    },
    {
        client_id: "2",
        nombre: "Client B",
        direccion: "101 Business St",
        telefono: "2342342345",
        nit: "987654321",
        plazas: ["Plaza 3", "Plaza 4"],
        saldo_pendiente: 2000,
        credito_por_dias: 60,
        saldo_vencido: 400
    }
];

export const dummyFacturas: Factura[] = [
    {
        factura_id: '1',
        cliente_id: '1001',
        cliente_nombre: 'Cliente A',
        estado: 'creada',
        fecha: '2023-10-01',
        fecha_vencimiento: '2023-10-31',
        iva: 120,
        total_despues_iva: 880,
        total: 1000,
        abonado: 200,
        saldo_pendiente: 800,
        nit: '123456789',
        pagos: ['Pago 1'],
    },
    {
        factura_id: '2',
        cliente_id: '1002',
        cliente_nombre: 'Cliente B',
        estado: 'parcial',
        fecha: '2023-09-15',
        fecha_vencimiento: '2023-10-30',
        iva: 180,
        total_despues_iva: 1320,
        total: 1500,
        abonado: 1500,
        saldo_pendiente: 0,
        nit: '987654321',
        pagos: ['Pago 1', 'Pago 2'],
    },
    {
        factura_id: '3',
        cliente_id: '1003',
        cliente_nombre: 'Cliente C',
        estado: 'pagada',
        fecha: '2023-08-20',
        fecha_vencimiento: '2023-09-19',
        iva: 240,
        total_despues_iva: 1760,
        total: 2000,
        abonado: 500,
        saldo_pendiente: 1500,
        nit: '112233445',
        pagos: ['Pago 1'],
    },
    {
        factura_id: '4',
        cliente_id: '1004',
        cliente_nombre: 'Cliente D',
        estado: 'vencida',
        fecha: '2023-07-10',
        fecha_vencimiento: '2023-10-08',
        iva: 300,
        total_despues_iva: 2200,
        total: 2500,
        abonado: 0,
        saldo_pendiente: 2500,
        nit: '556677889',
        pagos: [],
    },
    {
        factura_id: '5',
        cliente_id: '1005',
        cliente_nombre: 'Cliente E',
        estado: 'anulada',
        fecha: '2023-06-05',
        fecha_vencimiento: '2023-09-03',
        iva: 360,
        total_despues_iva: 2640,
        total: 3000,
        abonado: 1000,
        saldo_pendiente: 2000,
        nit: '998877665',
        pagos: ['Pago 1'],
    },
];

export const dummyPagos: Pago[] = [
    {
        pago_id: "1",
        factura_id: "1",
        fecha: "2023-01-15",
        monto: 1300,
        boleta_pago: "BP123"
    },
    {
        pago_id: "2",
        factura_id: "2",
        fecha: "2023-01-20",
        monto: 2500,
        boleta_pago: "BP124"
    }
];