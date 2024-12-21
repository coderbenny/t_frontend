# Event Management System

This repository is an Event Management System built with Next.js, featuring multiple interactive components for creating, managing, and checking in to events. The project utilizes TailwindCSS and DaisyUI for responsive, aesthetic styling, offering users a seamless and visually pleasing experience.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
  - [Add User](#add-user)
  - [Create Event](#create-event)
  - [Sell Ticket](#sell-ticket)
  - [Check-In](#check-in)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Event Management System enables users to manage events by creating events, adding users, selling tickets, and performing ticket check-ins. Each component of the application is tailored for specific actions within the event management flow and provides real-time feedback for better user interaction.

![Website Preview](/tnew.jpg)


## Features

- **Add User**: Adds a new user with fields for username, email, and phone number.
- **Create Event**: Allows event creation with fields for event name, date, description, and capacity.
- **Sell Ticket**: Sells tickets by associating a user with an event and optionally applying a discount code.
- **Check-In**: Verifies ticket information for check-in, providing real-time feedback.

## Technologies Used

- [Next.js](https://nextjs.org/) - A React framework for building server-rendered applications.
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework for custom styling.
- [DaisyUI](https://daisyui.com/) - Component library built on TailwindCSS for quick, aesthetic styling.
- [Node.js](https://nodejs.org/) - JavaScript runtime for server-side scripting.

## Installation

To set up the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/coderbenny/t_frontend.git
   cd event-management-system
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `next.config.mjs` file in the root directory with the following default format:

   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     reactStrictMode: true,
   };

   export default nextConfig;
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:3000`.

## Usage

### Add User
Adds a new user with fields for username, email, and phone number.

### Create Event
Allows event creation with fields for event name, date, description, and capacity.

### Sell Ticket
Sells tickets by associating a user with an event and optionally applying a discount code.

### Check-In
Verifies ticket information for check-in, providing real-time feedback.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit them with a meaningful message.
4. Push your branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Open a pull request detailing the changes you made.

Please ensure your code adheres to the project's coding standards and includes relevant tests.

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute the code as you see fit. See the LICENSE file for more details.
