import React from 'react'
import { json, redirect, useParams, useRouteLoaderData } from 'react-router-dom'
import EventItem from '../components/EventItem';

const EventDetail = () => {
  const params = useParams();
  const data = useRouteLoaderData('event-detail');
  // console.log(data);
  return (
    <>
      <EventItem event={data.event} />

    </>
  )
}

export default EventDetail

export const loader = async ({ request, params }) => {
  // loader also get access to route value as params. as it cannot use any hook inside it. Loader accept 2 parameters
  const id = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + id);
  if (!response.ok) {
    throw json({ message: 'Could not fetch details for selected event.' }, {
      status: 500,
    })
  } else {
    return response;
  }
}

export const action = async ({ params, request }) => {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,

  });

  if (!response.ok) {
    throw json({ message: 'Could not delete event.' }, {
      status: 500,
    });
  }

  return redirect('/events'); 

}