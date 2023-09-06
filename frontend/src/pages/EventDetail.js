import React, { Suspense } from 'react'
import { Await, defer, json, redirect, useParams, useRouteLoaderData } from 'react-router-dom'
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

const EventDetail = () => {
  const params = useParams();
  const { event, events } = useRouteLoaderData('event-detail');
  // console.log(data);
  return (
    <>
    <Suspense fallback={ <p style={{textAlign: 'center'}}>Loading...</p>}>
    <Await resolve={event}>
      {loadedEvent => <EventItem event={loadedEvent} />}
    </Await>
    </Suspense>
    
    <Suspense fallback={ <p style={{textAlign: 'center'}}>Loading...</p>}>
    <Await resolve={events}>
      {loadedEvents => <EventsList events={loadedEvents}/> }
    </Await>
    </Suspense>
      
      

    </>
  )
}

export default EventDetail;

const loadEvent= async(id) => {
  
  const response = await fetch('http://localhost:8080/events/' + id);
  if (!response.ok) {
    throw json({ message: 'Could not fetch details for selected event.' }, {
      status: 500,
    })
  } else {
    const resData = await response.json();
    return resData.event;
  }

}

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json({ message: 'Could not fetch events.' }, {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.events
  }
}

export const loader = async ({ request, params }) => {
  // loader also get access to route value as params. as it cannot use any hook inside it. Loader accept 2 parameters
  const id = params.eventId;
  
  return defer({
    event: loadEvent(id),
    events: loadEvents(),
  })
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