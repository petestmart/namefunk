import React from 'react';
import './AboutPage.css';

const AboutPage = () => (
  <div>
    <div>
      <h2>The Function Naming Tool For Programmers</h2>
      <p className="aboutBody">
        NameFunk is the application for programmers around the globe to cut down on decision fatigue by telling you what to name your functions.  Simply enter a term that defines your project and NameFunk will provide you with ideas.  Create an account to save your function names and come back later to reference them.
      </p>
      <h3>Built With</h3>
      <p className="aboutBody">
        This version uses React, Redux, Express, Passport, and PostgreSQL
      </p>
      <h3>Additional Technologies</h3>
      <ul>
        <li>HTML5</li>
        <li>CSS</li>
        <li>Node.js</li>
        <li>Express</li>
        <li>Axios</li>
        <li>Material UI</li>
        <li>SweetAlert</li>
        <li>API from Merriam-Webster (for finding similar words)</li>
      </ul>
      <h3>Authors</h3>
      <ul>
        <li>Pete St. Martin</li>
      </ul>
      <h3>Acknowledgements</h3>
      <ul>
        <li>Dane Smith</li>
        <li>Dev Jana</li>
        <li>Ally Boyd</li>
        <li>Chris Black</li>
        <li>Luke Schlangen</li>
        <li>Kris Szafranski</li>
        <li>Mary Mosman</li>
      </ul>
    </div>
  </div>
);

export default AboutPage;
