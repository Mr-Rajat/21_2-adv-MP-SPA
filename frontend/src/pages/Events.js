import { useLoaderData } from 'react-router-dom';
// This is special hook we can execute to get access to the closest loader data
import EventsList from '../components/EventsList';

const Events = () => {
  const data = useLoaderData();
  const events = data.events;

  return (
    <>
      {/* <EventsList /> */}
      <EventsList events={events} />
    </>
  );
}

export default Events;

export const loader = async() => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // ...
  } else {
    // const resData = await response.json();
    // return resData.events;
    // can also send custom response using Response() for creating respose
    // 1st argument - Any Data
    //  2nd argment - any more data that can be configured about response
    // const res = new Response('any data', {status: 201});
    // return res;

    return response;
  }
}