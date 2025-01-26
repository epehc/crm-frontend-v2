import api from "./api";

export const createEvent = async (eventDetails: any) => {
    const response = await api.post("/calendar/shared/event", eventDetails);
    return response.data;
};
