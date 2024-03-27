import { HttpError } from 'wasp/server'

export const createEvent = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Event.create({
    data: {
      title: args.title,
      description: args.description,
      date: args.date,
      location: args.location,
      tickets: { create: [] },
      owner: { connect: { id: context.user.id } }
    }
  });
}

export const createTicket = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { eventId, price } = args;

  const event = await context.entities.Event.findUnique({
    where: { id: eventId }
  });

  if (!event) { throw new HttpError(404, 'Event not found') };

  const newTicket = await context.entities.Ticket.create({
    data: {
      price: price,
      event: { connect: { id: eventId } }
    }
  });

  return newTicket;
}

export const registerAttendee = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const { ticketId, name, email } = args;

  const ticket = await context.entities.Ticket.findUnique({
    where: { id: ticketId }
  });

  if (!ticket) { throw new HttpError(404, 'Ticket not found') };

  const newAttendee = await context.entities.Attendee.create({
    data: { name, email, ticket: { connect: { id: ticketId } } }
  });

  return newAttendee;
}