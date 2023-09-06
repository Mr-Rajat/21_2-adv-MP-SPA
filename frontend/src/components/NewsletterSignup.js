import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
    // fetcher should be use whenver we want to trigger an action or also a loader with loader() without actually navigating to the page to which to loader belong or the page to which the action belong (fetcher provides diff methods like Form, Submit etc)
    const fetcher = useFetcher();
    const { data, state } = fetcher;

    useEffect(()=> {
        if (state === 'idle' && data && data.message) {
            window.alert(data.message);
        }
    }, [data, state]);

    // fetcher.
  return (
    <fetcher.Form method="post" action='/newsletter' className={classes.newsletter}>
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;