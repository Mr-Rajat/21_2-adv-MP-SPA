import React from 'react'
import EventForm from '../components/EventForm'
import { json, redirect } from 'react-router-dom'

const NewEvent = () => {
  return (
    <EventForm />
  )
}

export default NewEvent
export const action = async ({ request, params }) => {
  const data = await request.formData();
  // get() to get access to different form input values that were submitted.
  // get('formfield Name value')
  // const enteredTitle = data.get('title');

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  }
  // console.log(eventData);
  const response = await fetch('http://localhost:8080/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData),
  });

  if( !response.ok ){
    throw json({message: 'Could not save events.'}, { status: 500})
  }

  return redirect('/events');
}