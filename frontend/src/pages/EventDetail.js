import React from 'react'
import { useParams } from 'react-router-dom'

const EventDetail = () => {
  const params = useParams();
  return (
    <>
      <h1>The Event Details</h1>
      {/* here the params.value should be same as defined in route */}
      <p>{params.eventId}</p>
    </>
  )
}

export default EventDetail