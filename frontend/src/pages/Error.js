import React from 'react'
import { useRouteError } from 'react-router-dom'

import PageContent from '../components/PageContent'
import MainNavigation from '../components/MainNavigation';

const ErrorPage = () => {
    const error = useRouteError();
    // console.log(error.status);
    // console.log(JSON.parse(error.data));

    let title = "An error occurred!";
    let message = "Something went wrong";

    if (error.status === 500) {
        message = error.data.message
    }

    if (error.status === 404) {
        title = "Not Found!"
        message = 'Could not find resource or page'
    }
    return (
        <>
        <MainNavigation />
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    )
}

export default ErrorPage