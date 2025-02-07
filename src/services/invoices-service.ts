import { Factura, NuevaFactura, NuevoPago } from '@/lib/definitions';
import api from './api';

export const getAllFacturas = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_INVOICES_API_URL}/facturas/all`,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch invoices: ${response.statusText}`);
    }
    return response.json();
}


export const getFacturas = async (page: number, pageSize: number, token: string, query?:string) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_INVOICES_API_URL}/facturas`);
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
        throw new Error(`Failed to fetch invoices: ${response.statusText}`);
    }
    return response.json();
}

export const getFacturaByFacturaId = async (factura_id: string) => {
    const response = await api.get(`/facturas/${factura_id}`);
    return response.data;
}

export const getFacturasByClienteId = async (client_id: string, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_INVOICES_API_URL}/facturas/cliente/${client_id}`,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch invoices: ${response.statusText}`);
    }
    return response.json();
}

export const getFacturasByNit = async (nit: string) => {
    const response = await api.get(`/facturas/nit/${nit}`);
    return response.data;
}

export const createFactura = async (factura: NuevaFactura, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_INVOICES_API_URL}/facturas`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(factura),
    })
    if (!response.ok) {
        console.log("Failed to create invoice: ", response.statusText);
        throw new Error(`Failed to create invoice: ${response.statusText}`);
    }
    return response.json();
}

export const updateFactura = async (factura: Factura, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_INVOICES_API_URL}/facturas/${factura.factura_id}`, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(factura),
    })
    if (!response.ok) {
        throw new Error(`Failed to update invoice: ${response.statusText}`);
    }
    return response.json();
}

export const deleteFactura = async (factura_id: string) => {
    const response = await api.delete(`/facturas/${factura_id}`);
    return response.data;
}

export const getLatestFacturas = async () => {
    const response = await api.get('/facturas/latest');
    return response.data;
}

export const anularFactura = async (factura_id: number, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_INVOICES_API_URL}/facturas/anular-factura/${factura_id}`, {
        method: "PUT",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error(`Failed to update invoice: ${response.statusText}`);
    }
    return response.json();
}

//***************************************************************

export const getAllPagos = async (token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_INVOICES_API_URL}/pagos/`,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch payments: ${response.statusText}`);
    }
    return response.json();
}

export const getPagoByPagoId = async (pago_id: string) => {
    const response = await api.get(`/pagos/${pago_id}`);
    return response.data;
}

export const getPagosByFacturaId = async (factura_id: number, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_INVOICES_API_URL}/pagos/factura/${factura_id}`,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw new Error(`Failed to fetch payments: ${response.statusText}`);
    }
    return response.json();
}

export const createPago = async (nuevoPago: NuevoPago, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_INVOICES_API_URL}/pagos`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoPago),
    })
    if (!response.ok) {
        throw new Error(`Failed to create payment: ${response.statusText}`);
    }
    return response.json();
}

export const updatePago = async (pago_id: string, pago: any) => {
    const response = await api.put(`/pagos/${pago_id}`, pago);
    return response.data;
}

export const deletePago = async (pago_id: string) => {
    const response = await api.delete(`/pagos/${pago_id}`);
    return response.data;
}

