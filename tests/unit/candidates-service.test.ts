import fetchMock from 'jest-fetch-mock';
import {
  getCandidatos,
  getCandidato,
  updateCandidato,
  getContactosByCandidatoId,
  updateContacto,
  getEstudiosByCandidatoId,
  updateEstudio,
  getExperienciasLaboralesByCandidatoId,
  updateExperienciaLaboral,
  getInformacionPersonalByCandidatoId,
  updateInformacionPersonal,
  getMobilidadByCandidatoId,
  updateMobilidad,
  getResidenciaByCandidatoId,
  updateResidencia,
  getViciosByCandidatoId,
  updateVicios,
} from '../../src/services/candidates-service';

describe('Candidates Service', () => {
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

  it('should fetch candidatos', async () => {
    await testFetchFunction(getCandidatos, [1, 10, token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/candidatos?page=1&pageSize=10`, 'GET');
  });

  it('should fetch a candidato by ID', async () => {
    await testFetchFunction(getCandidato, ['123', token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/candidatos/123`, 'GET');
  });

  it('should update a candidato', async () => {
    const candidato = { candidato_id: '123', name: 'Test' };
    await testFetchFunction(updateCandidato, [candidato, token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/candidatos/123`, 'PUT', candidato);
  });

  it('should fetch contactos by candidato ID', async () => {
    await testFetchFunction(getContactosByCandidatoId, ['123', token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/contactos/candidato/123`, 'GET');
  });

  it('should update a contacto', async () => {
    const contacto = { id: '123', name: 'Test' };
    await testFetchFunction(updateContacto, [contacto, token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/contactos/123`, 'PUT', contacto);
  });

  it('should fetch estudios by candidato ID', async () => {
    await testFetchFunction(getEstudiosByCandidatoId, ['123', token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/estudios/candidato/123`, 'GET');
  });

  it('should update an estudio', async () => {
    const estudio = { id: '123', name: 'Test' };
    await testFetchFunction(updateEstudio, [estudio, token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/estudios/123`, 'PUT', estudio);
  });

  it('should fetch experiencias laborales by candidato ID', async () => {
    await testFetchFunction(getExperienciasLaboralesByCandidatoId, ['123', token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/experiencias-laborales/candidato/123`, 'GET');
  });

  it('should update an experiencia laboral', async () => {
    const experienciaLaboral = { id: '123', name: 'Test' };
    await testFetchFunction(updateExperienciaLaboral, [experienciaLaboral, token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/experiencias-laborales/123`, 'PUT', experienciaLaboral);
  });

  it('should fetch informacion personal by candidato ID', async () => {
    await testFetchFunction(getInformacionPersonalByCandidatoId, ['123', token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/informaciones-personales/123`, 'GET');
  });

  it('should update informacion personal', async () => {
    const informacionPersonal = { candidato_id: '123', name: 'Test' };
    await testFetchFunction(updateInformacionPersonal, [informacionPersonal, token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/informaciones-personales/123`, 'PUT', informacionPersonal);
  });

  it('should fetch movilidad by candidato ID', async () => {
    await testFetchFunction(getMobilidadByCandidatoId, ['123', token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/mobilidades/123`, 'GET');
  });

  it('should update movilidad', async () => {
    const movilidad = { candidato_id: '123', name: 'Test' };
    await testFetchFunction(updateMobilidad, [movilidad, token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/mobilidades/123`, 'PUT', movilidad);
  });

  it('should fetch residencia by candidato ID', async () => {
    await testFetchFunction(getResidenciaByCandidatoId, ['123', token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/residencias/123`, 'GET');
  });

  it('should update residencia', async () => {
    const residencia = { candidato_id: '123', name: 'Test' };
    await testFetchFunction(updateResidencia, [residencia, token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/residencias/123`, 'PUT', residencia);
  });

  it('should fetch vicios by candidato ID', async () => {
    await testFetchFunction(getViciosByCandidatoId, ['123', token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/vicios/123`, 'GET');
  });

  it('should update vicios', async () => {
    const vicios = { candidato_id: '123', name: 'Test' };
    await testFetchFunction(updateVicios, [vicios, token], `${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/vicios/123`, 'PUT', vicios);
  });
});