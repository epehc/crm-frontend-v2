import api from './api';

export const getAllClientes = async (page: number, pageSize: number, token: string) => {
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

export const getClienteByClienteId = async (id: string) => {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
}

export const getClienteByNit = async (nit: string) => {
    const response = await api.get(`/clientes/nit/${nit}`);
    return response.data;
}

export const createCliente = async (cliente: any) => {
    const response = await api.post('/clientes', cliente);
    return response.data;
}

export const updateCliente = async (id: string, cliente: any) => {
    const response = await api.put(`/clientes/${id}`, cliente);
    return response.data;
}

export const deleteCliente = async (id: string) => {
    const response = await api.delete(`/clientes/${id}`);
    return response.data;
}