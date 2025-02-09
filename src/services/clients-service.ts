import api from './api';
import {Cliente, NuevaPersonaContacto, NuevoCliente, PersonaContacto} from "@/lib/definitions";

export const getAllClientes = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/clientes/all`,{
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

export const getClientes = async (page: number, pageSize: number, token: string, query?: string) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/clientes`);
    url.searchParams.set('page', page.toString());
    url.searchParams.set('pageSize', pageSize.toString());
    if (query) {
        url.searchParams.set('query', query);
    }
    const response = await fetch(url.toString(),{       
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
        throw new Error(`Failed to create cliente: ${response.statusText}`);
    }
    return response.json();
};

export const updateCliente = async (cliente: Cliente, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/clientes/${cliente.client_id}`, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cliente),
    })
    if (!response.ok) {
        throw new Error(`Failed to update cliente: ${response.statusText}`);
    }
    return response.json();
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

export const updatePersonaContacto = async (personaContacto: PersonaContacto, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/personas-contacto/${personaContacto.persona_contacto_id}`, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(personaContacto),
    })
    if (!response.ok) {
        throw new Error(`Failed to update persona contacto: ${response.statusText}`);
    }
    return response.json();
}

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
