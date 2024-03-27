import React from 'react';
import { useQuery, getAttendees } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const Attendees = () => {
  const { data: attendees, isLoading, error } = useQuery(getAttendees);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {attendees.map((attendee) => (
        <div key={attendee.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{attendee.name}</div>
          <div>{attendee.email}</div>
        </div>
      ))}
    </div>
  );
}

export default Attendees;