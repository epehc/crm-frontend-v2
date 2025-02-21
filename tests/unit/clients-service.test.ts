import fetchMock from 'jest-fetch-mock';
import {
  getClientes,
  getClienteByClienteId,
  createCliente,
  updateCliente,
  deleteCliente,
  getPersonasContactoByClienteId,
  createPersonaContacto,
  updatePersonaContacto,
  deletePersonaContacto,
} from '../../src/services/clients-service';

describe('Clients Service', () => {
  afterEach(() => {
    fetchMock.resetMocks();
  });

  const token = 'test-token';

  const mockFetch = (response: any, ok = true) => {
    fetchMock.mockResponseOnce(JSON.stringify(response), {
      status: ok ? 200 : 400,
      statusText: ok ? 'OK' : 'Error',
      headers: { 'Content-Type': 'application/json' }
    });
  };

  const testFetchFunction = async (
    fn: Function,
    args: any[],
    expectedUrl: string,
    expectedMethod: string,
    expectedBody?: any
  ) => {
    const response = { data: 'test' };
    mockFetch(response); // This remains the same
  
    const result = await fn(...args);
    expect(result).toEqual(response);
  
    // Build expected options:
    const expectedOptions: any = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      ...(expectedBody && { body: JSON.stringify(expectedBody) }),
    };
  
    // Only include `method` if it isn't GET.
    if (expectedMethod !== 'GET') {
      expectedOptions.method = expectedMethod;
    }
  
    expect(fetchMock).toHaveBeenCalledWith(expectedUrl, expectedOptions);
  };

  it('should fetch clientes with pagination', async () => {
    await testFetchFunction(getClientes, [1, 10, token], `${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/clientes?page=1&pageSize=10`, 'GET');
  });

  it('should fetch a cliente by ID', async () => {
    await testFetchFunction(getClienteByClienteId, ['123', token], `${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/clientes/123`, 'GET');
  });

  it('should create a cliente', async () => {
    const nuevoCliente = { name: 'Test' };
    await testFetchFunction(createCliente, [nuevoCliente, token], `${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/clientes`, 'POST', nuevoCliente);
  });

  it('should update a cliente', async () => {
    const cliente = { client_id: '123', name: 'Test' };
    await testFetchFunction(updateCliente, [cliente, token], `${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/clientes/123`, 'PUT', cliente);
  });

  it('should delete a cliente', async () => {
    await testFetchFunction(deleteCliente, ['123', token], `${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/clientes/123`, 'DELETE');
  });

  it('should fetch personas contacto by cliente ID', async () => {
    await testFetchFunction(getPersonasContactoByClienteId, ['123', token], `${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/personas-contacto/123`, 'GET');
  });

  it('should create a persona contacto', async () => {
    const personaContacto = { name: 'Test' };
    await testFetchFunction(createPersonaContacto, [personaContacto, token], `${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/personas-contacto/`, 'POST', personaContacto);
  });

  it('should update a persona contacto', async () => {
    const personaContacto = { persona_contacto_id: '123', name: 'Test' };
    await testFetchFunction(updatePersonaContacto, [personaContacto, token], `${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/personas-contacto/123`, 'PUT', personaContacto);
  });

  it('should delete a persona contacto', async () => {
    await testFetchFunction(deletePersonaContacto, ['123', token], `${process.env.NEXT_PUBLIC_CLIENTS_API_URL}/personas-contacto/123`, 'DELETE');
  });
});