import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useAction, getTicket, registerAttendee } from 'wasp/client/operations';

const TicketPage = () => {
  const { ticketId } = useParams();
  const { data: ticket, isLoading, error } = useQuery(getTicket, { id: parseInt(ticketId) });
  const registerAttendeeFn = useAction(registerAttendee);
  const [attendeeName, setAttendeeName] = useState('');
  const [attendeeEmail, setAttendeeEmail] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleRegisterAttendee = () => {
    registerAttendeeFn({ ticketId: parseInt(ticketId), name: attendeeName, email: attendeeEmail });
    setAttendeeName('');
    setAttendeeEmail('');
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Ticket Details</h1>
      <div className='bg-gray-100 p-4 mb-4 rounded-lg'>
        <div>Ticket ID: {ticket.id}</div>
        <div>Price: {ticket.price}</div>
        <div>Event ID: {ticket.eventId}</div>
      </div>
      <h2 className='text-xl font-bold mb-4'>Register Attendee</h2>
      <input
        type='text'
        placeholder='Name'
        className='px-1 py-2 border rounded text-lg mb-2'
        value={attendeeName}
        onChange={(e) => setAttendeeName(e.target.value)}
      />
      <input
        type='text'
        placeholder='Email'
        className='px-1 py-2 border rounded text-lg mb-2'
        value={attendeeEmail}
        onChange={(e) => setAttendeeEmail(e.target.value)}
      />
      <button
        onClick={handleRegisterAttendee}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
      >
        Register Attendee
      </button>
    </div>
  );
}

export default TicketPage;