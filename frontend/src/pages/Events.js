import { useLoaderData, json, defer, Await } from 'react-router-dom';
// This is special hook we can execute to get access to the closest loader data
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

const Events = () => {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  )

}

export default Events;

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.'};
    // throw { message: 'could not fetch events.' };
    // throw new Response(JSON.stringify({message: 'Could not fetch events.'}), {
    //   status:500,
    // });
    throw json({ message: 'Could not fetch events.' }, {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData.events
    // const resData = await response.json();
    // return resData.events;
    // can also send custom response using Response() for creating respose
    // 1st argument - Any Data
    //  2nd argment - any more data that can be configured about response
    // const res = new Response('any data', {status: 201});
    // return res;

    // return response;
  }
}

export const loader = () => {
  return defer({
    events: loadEvents()
  });
}