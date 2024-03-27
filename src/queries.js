import { HttpError } from 'wasp/server';

export const getEvent = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }
  const event = await context.entities.Event.findUnique({
    where: { id: args.id },
    include: { tickets: { include: { Attendee: true } } }
  });
  if (!event) { throw new HttpError(404, 'No event with id ' + args.id); }
  return event;
}

export const getEvents = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }
  return context.entities.Event.findMany();
}

export const getTicket = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }
  const ticket = await context.entities.Ticket.findUnique({ where: { id: args.id } });
  if (!ticket) { throw new HttpError(404, 'No ticket with id ' + args.id); }
  return ticket;
}

export const getAttendees = async (args, context) => {
  if (!context.user) { throw new HttpError(401); }

  const event = await context.entities.Event.findUnique({
    where: { id: args.eventId },
    include: { Attendee: true }
  });

  if (!event) { throw new HttpError(404, `Event with id ${args.eventId} not found`); }

  return event.Attendee;
}