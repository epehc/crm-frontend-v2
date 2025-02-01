import api from './api';
import {NuevaPersonaContacto, NuevoCliente} from "@/lib/definitions";

export const getClientes = async (page: number, pageSize: number, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/clientes?page=${page}&pageSize=${pageSize}`,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch clientes: ${response.statusText}`);
    }
    return response.json();
}

export const getClienteByClienteId = async (client_id: string, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/clientes/${client_id}` ,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        console.error(response)
        throw new Error(`Failed to fetch candidato: ${response.statusText}`);
    }
    return response.json();
}

export const getClienteByNit = async (nit: string) => {
    const response = await api.get(`/clientes/nit/${nit}`);
    return response.data;
}

export const createCliente = async (nuevoCliente: NuevoCliente, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/clientes`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoCliente),
    })
    if (!response.ok) {
        throw new Error(`Failed to create event: ${response.statusText}`);
    }
    return response.json();
};

export const updateCliente = async (id: string, cliente: any) => {
    const response = await api.put(`/clientes/${id}`, cliente);
    return response.data;
}

export const deleteCliente = async (client_id: string, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/clientes/${client_id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error(`Failed to delete cliente: ${response.statusText}`);
    }
    return response.json();
}


//---------------------------------------------------------

export const getPersonasContactoByClienteId = async (client_id: string, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/personas-contacto/${client_id}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch Personas de Contacto para el cliente con client_id ${client_id}: ${response.statusText}`);
    }
    return response.json();
}

export const createPersonaContacto = async (personaContacto: NuevaPersonaContacto, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/personas-contacto/`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(personaContacto),
    })
    if (!response.ok) {
        throw new Error(`Failed to create event: ${response.statusText}`);
    }
    return response.json();
};

export const deletePersonaContacto = async (persona_contacto_id: string, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/personas-contacto/${persona_contacto_id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error(`Failed to delete persona contacto: ${response.statusText}`);
    }
    return response.json();
}
