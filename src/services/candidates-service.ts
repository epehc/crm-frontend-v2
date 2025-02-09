import { Candidato, Contacto, Estudio, ExperienciaLaboral, InformacionPersonal, Mobilidad, Residencia, Vicios } from '@/lib/definitions';
import api from './api';

export const getCandidatos = async (page: number, pageSize: number, token: string, query?: string) => {
    const url = new URL(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/candidatos`);
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
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch candidates: ${response.statusText}`);
    }
    return response.json();
}

export const getCandidato = async (candidato_id:string, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/candidatos/${candidato_id}` ,{
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

export const createCandidato = async (data:any) => {
    const response = await api.post('/candidatos', data);
    return response.data;
}

export const updateCandidato = async (updatedCandidato: Candidato, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/candidatos/${updatedCandidato.candidato_id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCandidato),
    });
    if (!response.ok) {
        throw new Error(`Failed to update candidate: ${response.statusText}`);
    }
    return response.json();
}

export const deleteCandidato = async (id:string) => {
    const response = await api.delete(`/candidatos/${id}`);
    return response.data;
}


//********************************************************************************************************************

export const getContactos = async () => {
    const response = await api.get('/contactos');
    return response.data;
}

export const getContactosByCandidatoId = async (candidato_id:string, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/contactos/candidato/${candidato_id}` ,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch candidate: ${response.statusText}`);
    }
    return response.json();
}

export const createContacto = async (data:any) => {
    const response = await api.post('/contactos', data);
    return response.data;
}

export const updateContacto = async (contacto:Contacto, token:string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/contactos/${contacto.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contacto),
    });
    if (!response.ok) {
        throw new Error(`Failed to update candidate: ${response.statusText}`);
    }
    return response.json();
}

export const deleteContacto = async (id:string) => {
    const response = await api.delete(`/contactos/${id}`);
    return response.data;
}


//********************************************************************************************************************

export const getEstudios = async () => {
    const response = await api.get('/estudios');
    return response.data;
}

export const getEstudiosByCandidatoId = async (candidato_id:string, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/estudios/candidato/${candidato_id}` ,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch candidate: ${response.statusText}`);
    }
    return response.json();
}

export const createEstudio = async (data:any) => {
    const response = await api.post('/estudios', data);
    return response.data;
}

export const updateEstudio = async (estudio: Estudio, token:string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/estudios/${estudio.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(estudio),
    });
    if (!response.ok) {
        throw new Error(`Failed to update candidate: ${response.statusText}`);
    }
    return response.json();
}

export const deleteEstudio = async (id:string) => {
    const response = await api.delete(`/estudios/${id}`);
    return response.data;
}

//********************************************************************************************************************

export const getAllExperienciasLaborales = async () => {
    const response = await api.get('/experiencias-laborales');
    return response.data;
}

export const getExperienciaLaboral = async (id:string) => {
    const response = await api.get(`/experiencias-laborales/${id}`);
    return response.data;
}

export const getExperienciasLaboralesByCandidatoId = async (candidato_id:string, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/experiencias-laborales/candidato/${candidato_id}` ,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch candidate: ${response.statusText}`);
    }
    return response.json();
}

export const createExperienciaLaboral = async (data:any) => {
    const response = await api.post('/experiencias-laborales', data);
    return response.data;
}

export const updateExperienciaLaboral = async (experienciaLaboral: ExperienciaLaboral, token:string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/experiencias-laborales/${experienciaLaboral.id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(experienciaLaboral),
    });
    if (!response.ok) {
        throw new Error(`Failed to update candidate: ${response.statusText}`);
    }
    return response.json();
}

export const deleteExperienciaLaboral = async (id:string) => {
    const response = await api.delete(`/experiencias-laborales/${id}`);
    return response.data;
}

//********************************************************************************************************************

export const getAllInformacionesPersonales = async () => {
    const response = await api.get('/informaciones-personales');
    return response.data;
}

export const getInformacionPersonalByCandidatoId = async (candidato_id: string, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/informaciones-personales/${candidato_id}` ,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch candidate: ${response.statusText}`);
    }
    return response.json();
}

export const createInformacionPersonal = async (data:any) => {
    const response = await api.post('/informaciones-personales', data);
    return response.data;
}

export const updateInformacionPersonal = async (informacionPersonal:InformacionPersonal, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/informaciones-personales/${informacionPersonal.candidato_id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(informacionPersonal),
    });
    if (!response.ok) {
        throw new Error(`Failed to update candidate: ${response.statusText}`);
    }
    return response.json();
}

export const deleteInformacionPersonal = async (id:string) => {
    const response = await api.delete(`/informaciones-personales/${id}`);
    return response.data;
}

//********************************************************************************************************************

export const getAllMobilidades = async () => {
    const response = await api.get('/mobilidades');
    return response.data;
}

export const getMobilidadByCandidatoId = async (candidato_id:string, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/mobilidades/${candidato_id}` ,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch candidate: ${response.statusText}`);
    }
    return response.json();
}

export const createMobilidad = async (data:any) => {
    const response = await api.post('/mobilidades', data);
    return response.data;
}

export const updateMobilidad = async (mobilidades: Mobilidad, token:string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/mobilidades/${mobilidades.candidato_id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mobilidades),
    });
    if (!response.ok) {
        throw new Error(`Failed to update candidate: ${response.statusText}`);
    }
    return response.json();
}

export const deleteMobilidad = async (id:string) => {
    const response = await api.delete(`/mobilidades/${id}`);
    return response.data;
}

//********************************************************************************************************************

export const getAllResidencias = async () => {
    const response = await api.get('/residencias');
    return response.data;
}

export const getResidenciaByCandidatoId = async (candidato_id:string, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/residencias/${candidato_id}` ,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch candidate: ${response.statusText}`);
    }
    return response.json();
}

export const createResidencia = async (data:any) => {
    const response = await api.post('/residencias', data);
    return response.data;
}

export const updateResidencia = async (residencia: Residencia, token:string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/residencias/${residencia.candidato_id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(residencia),
    });
    if (!response.ok) {
        throw new Error(`Failed to update candidate: ${response.statusText}`);
    }
    return response.json();
}

export const deleteResidencia = async (id:string) => {
    const response = await api.delete(`/residencias/${id}`);
    return response.data;
}

//********************************************************************************************************************

export const getAllVicios = async () => {
    const response = await api.get('/vicios');
    return response.data;
}

export const getViciosByCandidatoId = async (candidato_id:string, token: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/vicios/${candidato_id}` ,{
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch candidate: ${response.statusText}`);
    }
    return response.json();
}

export const createVicios = async (data:any) => {
    const response = await api.post('/vicios', data);
    return response.data;
}

export const updateVicios = async (vicios: Vicios, token:string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_CANDIDATES_API_URL}/vicios/${vicios.candidato_id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(vicios),
    });
    if (!response.ok) {
        throw new Error(`Failed to update candidate: ${response.statusText}`);
    }
    return response.json();
}

export const deleteVicios = async (id:string) => {
    const response = await api.delete(`/vicios/${id}`);
    return response.data;
}