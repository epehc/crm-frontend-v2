import { getAllClientes, updateCliente } from "@/services/clients-service";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Cliente, EstadoFactura, Factura } from "./definitions";
import { getAllFacturas, updateFactura } from "@/services/invoices-service";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const updateClientSaldoPendiente = async (token: string) => {
    try {
        // Fetch all clients
        const clientesResponse = await getAllClientes(token);
        const allClientes: Cliente[] = clientesResponse;

        // Fetch all facturas
        const facturasResponse = await getAllFacturas(token);
        const allFacturas: Factura[] = facturasResponse;

        // Recalculate saldo_pendiente for each client
        for (const cliente of allClientes) {
            const clientFacturas = allFacturas.filter(factura => factura.client_id === cliente.client_id);
            const newSaldoPendiente = clientFacturas.reduce((total, factura) => {
              const pending = Math.max(0, factura.total - factura.abonado);
              return total + pending;
            }, 0);

            // Update the client with the new saldo_pendiente
            const updatedCliente = {
                ...cliente,
                saldo_pendiente: newSaldoPendiente
            };

            await updateCliente(updatedCliente, token);
            console.log(`Updated saldo_pendiente for client ${cliente.nombre}: ${newSaldoPendiente}`);
        }

        console.log('All clients updated successfully');
    } catch (error) {
        console.error('Error updating clients:', error);
    }
};

export const formatFacturaDates = async (factura: Factura, token: string) => {
  const fecha = new Date(factura.fecha);
  const fechaVencimiento = new Date(factura.fecha_vencimiento);

  const updatedFactura = {
      ...factura,
      fecha: formatDate(fecha),
      fecha_vencimiento: formatDate(fechaVencimiento)
  };

  await updateFactura(updatedFactura, token);
  console.log('Updated factura:', updatedFactura);
    
}


export const updateFacturasVencidas = async (token: string) => {
    try {
        // Fetch all facturas 
        const facturasResponse = await getAllFacturas(token);
        const allFacturas: Factura[] = facturasResponse;

        // Fetch all clients 
        const clientesResponse = await getAllClientes(token);
        const allClientes = clientesResponse;

        const today = new Date();

        for (const factura of allFacturas) {
            // Check if fecha_vencimiento is set and has passed, and that it's not already marked as 'vencida'
            if (factura.fecha_vencimiento && factura.saldo_pendiente> 0 && new Date(factura.fecha_vencimiento)  < today && factura.estado !== 'vencida') {
                
                // Update factura estado
                const updatedFactura: Factura = {
                    ...factura,
                    estado: 'vencida'
                };
                await updateFactura(updatedFactura, token);
                console.log(`Factura ${factura.factura_id} marked as vencida`);

                // Find the corresponding client
                const client = allClientes.find((c: Cliente) => c.client_id === factura.client_id);
                if (client) {
                    // Retract the pending amount from saldo_pendiente and add it to saldo_vencido
                    const newSaldoPendiente = client.saldo_pendiente - factura.saldo_pendiente;
                    const newSaldoVencido = (client.saldo_vencido || 0) + factura.saldo_pendiente;

                    const updatedCliente = {
                        ...client,
                        saldo_pendiente: newSaldoPendiente,
                        saldo_vencido: newSaldoVencido
                    };

                    await updateCliente(updatedCliente, token);
                    console.log(`Updated client ${client.nombre}: saldo_pendiente=${newSaldoPendiente}, saldo_vencido=${newSaldoVencido}`);
                }
            }
        }

        console.log('Successfully updated vencidas');
    } catch (error) {
        console.error('Error updating facturas vencidas:', error);
    }
};

export const updateFacturasAndClientsSaldo = async (token: string) => {
  try {
      // Fetch all facturas and clients with one API call each
      const facturasResponse = await getAllFacturas(token);
      const allFacturas: Factura[] = facturasResponse.data || facturasResponse;

      const clientesResponse = await getAllClientes(token);
      const allClientes = clientesResponse.data || clientesResponse;

      const today = new Date();

      // First, mark overdue facturas as "vencida" if not already marked
      for (const factura of allFacturas) {
        const [day, month, year] = factura.fecha_vencimiento.split('/');
        const fechaVencimientoDate = new Date(+year, +month - 1, +day);

          if (
              factura.fecha_vencimiento &&
              fechaVencimientoDate < today &&
              factura.saldo_pendiente > 0 &&
              factura.estado !== EstadoFactura.VENCIDA
          ) {
              const updatedFactura: Factura = {
                  ...factura,
                  estado: EstadoFactura.VENCIDA
              };
              await updateFactura(updatedFactura, token);
              console.log(`Factura ${factura.factura_id} marked as vencida`);
          }
      }

      // Re-fetch the updated facturas to have the latest state
      const updatedFacturasResponse = await getAllFacturas(token);
      const updatedFacturas: Factura[] = updatedFacturasResponse.data || updatedFacturasResponse;

      // Now recalculate each client's saldos based on all of their facturas
      for (const cliente of allClientes) {
          const clientFacturas = updatedFacturas.filter(
              (factura) => factura.client_id === cliente.client_id
          );
          let newSaldoPendiente = 0;
          let newSaldoVencido = 0;
          for (const factura of clientFacturas) {
              // pending = total - abonado (ensure no negatives)
              const pending = Math.max(0, factura.total - factura.abonado);
              if (factura.estado === EstadoFactura.VENCIDA) {
                  newSaldoVencido += pending;
              } else {
                  newSaldoPendiente += pending;
              }
          }

          const updatedCliente = {
              ...cliente,
              saldo_pendiente: newSaldoPendiente,
              saldo_vencido: newSaldoVencido
          };

          await updateCliente(updatedCliente, token);
          console.log(
              `Updated client ${cliente.nombre}: saldo_pendiente=${newSaldoPendiente}, saldo_vencido=${newSaldoVencido}`
          );
      }

      console.log('Successfully updated facturas and client saldos.');
  } catch (error) {
      console.error('Error updating facturas and clients:', error);
  }
};
