import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useAction, getEvent, createTicket } from 'wasp/client/operations';

const EventPage = () => {
  const { eventId } = useParams();
  const { data: event, isLoading, error } = useQuery(getEvent, { id: eventId });
  const createTicketFn = useAction(createTicket);
  const [ticketPrice, setTicketPrice] = useState(0);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateTicket = () => {
    createTicketFn({ eventId, price: ticketPrice });
    setTicketPrice(0);
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>{event.title}</h1>
      <p className='mb-2'>{event.description}</p>
      <p className='mb-2'>Date: {event.date}</p>
      <p className='mb-2'>Location: {event.location}</p>
      <div className='mb-4'>Tickets Price: $<input type='number' value={ticketPrice} onChange={(e) => setTicketPrice(parseFloat(e.target.value))} /></div>
      <button onClick={handleCreateTicket} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Create Ticket</button>
      <Link to={`/event/${eventId}/attendees`} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'>View Attendees</Link>
    </div>
  );
}

export default EventPage;