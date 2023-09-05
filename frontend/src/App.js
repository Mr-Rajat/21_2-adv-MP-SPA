// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
//   DONE
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
//   DONE
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// DONE
// 4. Add properly working links to the MainNavigation
// DONE
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// DONE
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// DONE
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
// DONE

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home';
import Events, { loader as eventsLoader } from './pages/Events';
import EventDetail, { action as deleteEventAction, loader as eventDetailLoader } from './pages/EventDetail';
import NewEvent from './pages/NewEvent';
import EditEvent from './pages/EditEvent';
import RootLayout from './pages/Root';
import EventsRootLayout from './pages/EventsRoot';
import ErrorPage from './pages/Error';
import { action as manipulateEventAction} from './components/EventForm'
function App() {

  const router = createBrowserRouter([
    {
      path: '/', element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        {
          path: 'events', element: <EventsRootLayout />,
          children: [
            {
              index: true,
              element: <Events />,
              loader: eventsLoader
            },
            {
              path: ':eventId',
              loader: eventDetailLoader,
              id: 'event-detail',
              children: [
                {
                  index: true,
                  element: <EventDetail />,
                  action: deleteEventAction,
                },

                { path: 'edit', element: <EditEvent />, action: manipulateEventAction }
              ]
            },
            { path: 'new', element: <NewEvent />, action: manipulateEventAction},
          ]
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
