import api from './api';

export const getAllFacturas = async (page: number, pageSize: number, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_INVOICES_API_URL}/facturas?page=${page}&pageSize=${pageSize}`,{
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

export const getFacturasByClienteId = async (cliente_id: string) => {
    const response = await api.get(`/facturas/cliente/${cliente_id}`);
    return response.data;
}

export const getFacturasByNit = async (nit: string) => {
    const response = await api.get(`/facturas/nit/${nit}`);
    return response.data;
}

export const createFactura = async (factura: any) => {
    const response = await api.post('/facturas', factura);
    return response.data;
}

export const updateFactura = async (factura_id: string, factura: any) => {
    const response = await api.put(`/facturas/${factura_id}`, factura);
    return response.data;
}

export const deleteFactura = async (factura_id: string) => {
    const response = await api.delete(`/facturas/${factura_id}`);
    return response.data;
}

export const getLatestFacturas = async () => {
    const response = await api.get('/facturas/latest');
    return response.data;
}

//***************************************************************

export const getAllPagos = async () => {
    const response = await api.get('/pagos');
    return response.data;
}

export const getPagoByPagoId = async (pago_id: string) => {
    const response = await api.get(`/pagos/${pago_id}`);
    return response.data;
}

export const getPagosByFacturaId = async (factura_id: string) => {
    const response = await api.get(`/pagos/factura/${factura_id}`);
    return response.data;
}

export const createPago = async (pago: any) => {
    const response = await api.post('/pagos', pago);
    return response.data;
}

export const updatePago = async (pago_id: string, pago: any) => {
    const response = await api.put(`/pagos/${pago_id}`, pago);
    return response.data;
}

export const deletePago = async (pago_id: string) => {
    const response = await api.delete(`/pagos/${pago_id}`);
    return response.data;
}

