# Scheduling App

## Overview

The Scheduling App is designed to facilitate meeting bookings, user authentication, and interaction with a PostgreSQL database. It utilizes various libraries and frameworks, including React, Express, PostgreSQL, Passport.js, and several other tools for enhanced functionality.

## Features

- User registration and authentication
- Meeting scheduling and booking
- Email notifications for meeting confirmations
- Google Calendar integration
- Data fetching and state management using React Query

## Technologies Used

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: For handling routing in the application.
- **React Hook Form**: For managing form state.
- **React Hot Toast**: For displaying toast notifications.
- **DevExtreme**: For UI components and data visualization.
- **FullCalendar**: For calendar and event management.
- **Add-to-Calendar Button**: For adding events to calendars.
- **React Spinners**: For loading indicators.

### Backend

- **Express**: A web application framework for Node.js.
- **PostgreSQL**: A powerful, open-source relational database system.
- **Passport.js**: For authentication.
- **Bcrypt**: For hashing passwords.
- **EmailJS**: For sending emails.
- **dotenv**: For managing environment variables.

## Setup and Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/your-username/scheduling-app.git
   cd scheduling-app

2. **Change directory to client and scheduling-app and install dependncies**
   ```sh
   cd client/scheduling-app
   npm install

3. **Create a .env file in src/services/ and store your google calendar credentials**
   ```sh
   CALENDAR_URL=your_google_calendar_url
   CALENDAR_ID=your_google_calendar_id
   PUBLIC_KEY=your_google_calendar_public_key

4. **Start the client**
   ```sh
   npm run dev
6. **Return to original directory and change to server/ and install dependncies**
   ```sh
   cd ../..
   cd serevr/
   npm install
7. **Create the required tables (session, meetings, users) on pgAdmin 4 or vercel(or any hosting service)**
   ```sh
   CREATE TABLE session (
    sid VARCHAR PRIMARY KEY,
    sess JSON NOT NULL,
    expire TIMESTAMP WITHOUT TIME ZONE NOT NULL
   );

   CREATE TABLE meetings (
 	id SERIAL PRIMARY KEY,
	meeting_date DATE NOT NULL,
	start_time TIME NOT NULL,
	duration INT NOT NULL,
	end_time TIME NOT NULL,
	studentId VARCHAR(7),
	FOREIGN KEY (studentId) REFERENCES users(studentId)
   );

   CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    lname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    meeting_count INT DEFAULT 0
   );
   
8. **Create a .env and store the database credentials**
   ```sh
   only uses these with pgAdmin 4
   PG_USER=your_pg_use
   PG_PASSWORD=your_pg_password
   PG_HOST=your_pg_host (localhost)
   PG_PORT=your_pg_port (5432)
   PG_DATABASE=your_pg_databasename
   only uses the link if database is hosted (like on vercel)
   POSTGRES_URL=your_postgres_connection_string
9. **Start the server**
   ```sh
   nodemon index.js

## Note
This project was initially intended to be used with students for scheduling meetings, but the idea was later abandoned. The application includes comprehensive functionality for handling meeting scheduling, user authentication, and integration with external services like Google Calendar and EmailJS.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License.
   
