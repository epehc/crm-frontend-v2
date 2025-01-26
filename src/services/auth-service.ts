import api from './api';

export const login = async (token: string) => {
    const response = await api.post('/auth/google', { token });
    return response.data;
}

export const assignRoles = async (roles: string[]) => {
    const response = await api.post('/auth/roles/assign', { roles });
    return response.data;
}

export const makeAdmin = async (email: string) => {
    const response = await api.post('/auth/roles/make-admin', { email });
    return response.data;
}

export const removeAdmin = async (email: string) => {
    const response = await api.post('/auth/roles/remove-admin', { email });
    return response.data;
}

const authService = {
    getUserRoles: async (token: string) => {
        const response = await api.get("/roles", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    },
};

export default authService;