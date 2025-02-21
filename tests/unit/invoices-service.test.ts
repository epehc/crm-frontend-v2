import fetchMock from 'jest-fetch-mock';
import {
  getFacturas,
  getFacturasByClienteId,
  createFactura,
  updateFactura,
  anularFactura,
} from '../../src/services/invoices-service';

describe('Invoices Service', () => {
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

  it('should fetch facturas with pagination', async () => {
    await testFetchFunction(getFacturas, [1, 10, token], `${process.env.NEXT_PUBLIC_INVOICES_API_URL}/facturas?page=1&pageSize=10`, 'GET');
  });

  it('should fetch facturas by cliente ID', async () => {
    await testFetchFunction(getFacturasByClienteId, ['123', token], `${process.env.NEXT_PUBLIC_INVOICES_API_URL}/facturas/cliente/123`, 'GET');
  });

  it('should create a factura', async () => {
    const nuevaFactura = { amount: 100, customer: 'Test Customer' };
    await testFetchFunction(createFactura, [nuevaFactura, token], `${process.env.NEXT_PUBLIC_INVOICES_API_URL}/facturas`, 'POST', nuevaFactura);
  });

  it('should update a factura', async () => {
    const factura = { factura_id: '123', amount: 100 };
    await testFetchFunction(updateFactura, [factura, token], `${process.env.NEXT_PUBLIC_INVOICES_API_URL}/facturas/123`, 'PUT', factura);
  });

  it('should annul a factura', async () => {
    await testFetchFunction(anularFactura, [123, token], `${process.env.NEXT_PUBLIC_INVOICES_API_URL}/facturas/anular-factura/123`, 'PUT');
  });
});