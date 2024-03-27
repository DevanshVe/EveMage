import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, getEvents } from 'wasp/client/operations';

const HomePage = () => {
  const { data: events, isLoading, error } = useQuery(getEvents);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {events.map((event) => (
        <Link key={event.id} to={`/event/${event.id}`} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{event.title}</div>
          <div>{event.date}</div>
          <div>{event.location}</div>
        </Link>
      ))}
    </div>
  );
}

export default HomePage;