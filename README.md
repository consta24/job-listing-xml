# Job Listing Web App

## Overview

This is a web application that allows users to add, search and view job listings.  
The application allows users to search for jobs by title, company, years of experience, and education.
Every job is stored in an XML file and validated through front-end form validation and XSD.

## Installation

To install the app, clone the repository and run `npm install`:

> git clone https://github.com/consta24/job-listing-xml-web-app.git  
> cd job-listing-web-app  
> npm install  
> npm start

Navigate to http://localhost:3000 to view the application

## Technologies

- `Node.js` and `Express.js` for back-end development
- `Handlebars.js` for server-side templating
- `Libxmljs` for parsing XML data
- `xmlbuilder2` for building XML received from front-end
- `xsd-schema-validator` to validate XMLs before saving data

## Features

- Search for jobs by title, company, years of experience and education using XPath queries
- Validate job listing data against an XSD schema before saving
- Combine multiple search options to narrow down job listings
- Browse all job listings and view job details
- Add a new job listing
- Responsive design for mobile and desktop
