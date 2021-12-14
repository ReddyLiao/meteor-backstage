import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="hero is-fullheight has-background-white-ter">
    <div className="container">
      <div className="columns is-vcentered">
        <div className="column has-text-centered">
          <h1 className="title">404 Page Not Found</h1>
          <p className="subtitle">An unexpected error has occurred. Please contact the site owner.</p>
          <Link to="/" className="button is-info is-hoverable has-text-centered">
            Home
          </Link>
        </div>
        <div className="column has-text-centered">
          <img src="/images/404-robot.gif" alt="Page Not Found." />
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
