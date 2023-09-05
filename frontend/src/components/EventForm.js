import { Form, useActionData, useNavigate, useNavigation, json, redirect } from 'react-router-dom';
// import {  } from 'react-router-dom'

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
  const data = useActionData();
  // it gives us access to the data return by action and provide access to the closest action.
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  return (
    // this Form component omit the actual form submit and send its data to the action there it submit as the part of form
    <Form method={method} className={classes.form}>
      { data && data.errors && <ul>
        {Object.values(data.errors).map(err => 
          <li key={err}>{err}</li>)}</ul>}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" defaultValue={event ? event.title : ''} required />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" defaultValue={event ? event.image : ''} required />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" defaultValue={event ? event.date : ''} required />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" defaultValue={event ? event.description : ''} required />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting? 'Submitting...' : 'Save'}</button>
      </div>
    </Form>
  );
}

export default EventForm;

export const action = async ({ request, params }) => {
  const method = request.method;
  const data = await request.formData();
  // console.log(request)
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
  let url = 'http://localhost:8080/events';

  if(method === 'PATCH'){
    const eventId = params.eventId;
    url = 'http://localhost:8080/events/' + eventId; 
  }
  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if( !response.ok ){
    throw json({message: 'Could not save events.'}, { status: 500})
  }

  return redirect('/events');
}