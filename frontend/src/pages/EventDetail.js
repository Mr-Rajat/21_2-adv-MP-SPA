import React from 'react'
import { json, useParams } from 'react-router-dom'
import EventItem from '../components/EventItem';

const EventDetail = () => {
  const params = useParams();

  return (
    <>
      <EventItem event={}/>
      
    </>
  )
}

export default EventDetail

export const loader = async({request, params}) => {
  // loader also get access to route value as params. as it cannot use any hook inside it. Loader accept 2 parameters
  const id = params.eventId;
  const response = await fetch('http://localhost:8080/events/'+ id);
  if(!response.ok){
    throw json({message: 'Could not fetch details for selected event.'}, {
      status : 500,
    })
  } else {
    return response;
  }
}