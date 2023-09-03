// import { useLoaderData } from 'react-router-dom';
// This is special hook we can execute to get access to the closest loader data
import EventsList from '../components/EventsList';

const Events = () => {
  // const events = useLoaderData();
  
  return (
    <>
      <EventsList />
      {/* <EventsList events={events} /> */}
    </>
  );
}

export default Events;