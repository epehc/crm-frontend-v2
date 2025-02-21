import { createEvent } from '../../src/services/calendar-service';


describe('Calendar Service', () => {

  describe('createEvent', () => {
    it('should create a new event successfully', async () => {
      const eventDetails = {
        title: 'Test Event',
        date: '2023-10-01',
        summary: 'Test Summary',
        description: 'Test Description',
        startTime: '2023-10-01T10:00:00Z',
        endTime: '2023-10-01T11:00:00Z',
        location: 'Test Location',
        organizer: 'Test Organizer',
        attendee: 'Test Attendee'
      };
      const token = 'test-token';
      const responseData = { id: '123', ...eventDetails };

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => responseData,
      } as Response);

      const result = await createEvent(eventDetails, token);
      expect(result).toEqual(responseData);
      expect(global.fetch).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_CALENDAR_API_URL}/calendar/shared/event`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDetails),
      });
    });

    it('should throw an error if event creation fails', async () => {
      const eventDetails = {
        title: 'Test Event',
        date: '2023-10-01',
        summary: 'Test Summary',
        description: 'Test Description',
        startTime: '2023-10-01T10:00:00Z',
        endTime: '2023-10-01T11:00:00Z',
        location: 'Test Location',
        organizer: 'Test Organizer',
        attendee: 'Test Attendee'
      };
      const token = 'test-token';

      jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: false,
        statusText: 'Creation failed',
      } as Response);

      await expect(createEvent(eventDetails, token)).rejects.toThrow('Failed to create event: Creation failed');
    });
  });
});