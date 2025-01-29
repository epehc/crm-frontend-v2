import {Evento} from "@/lib/definitions";

export const createEvent = async (eventDetails: Evento, token: string) => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_CALENDAR_API_URL}/calendar/shared/event`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDetails),
    })
    if (!response.ok) {
        throw new Error(`Failed to create event: ${response.statusText}`);
    }
    return response.json();
};
