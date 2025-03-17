### Smart Pump Backend

## Project Description

This project provides the backend API for the SMART Pump frontend application. The API allows users to:

1.  Login via email and password

2.  Check their account balance

3.  Update their personal details

The application is built using Node.js and lowdb as the database.

Table of Contents

*  Installation

*  Usage

*  API Endpoints

*  Environment Configuration

*  Bonus Features

License

## Installation

To set up and run the project locally, follow these steps:

# Clone the repository
git clone <repo-url>

# Navigate to the project directory
cd smart-pump-be

# Install dependencies
npm install

## Usage

Running the application

You can start the application in different environments using the following commands:
# Start in production mode
npm run start

# Start in development mode with nodemon
npm run start:dev

# Start in staging mode
npm run start:stage

# Start in test mode
npm test

## Docker Setup
To run the application inside a Docker container, follow the steps below:

1. Build the Docker image
You need to build the Docker image for the application. Run the following command in the root directory of the project:

bash
Copy
Edit
docker build -t smart-pump-be .
* This will create a Docker image tagged smart-pump-backend.

2. Run the Docker container
Once the image is built, you can run the application in a Docker container. Use the following command to start it:

bash
Copy
Edit
docker run -p 3030:8080 smart-pump-be
* This command will start the Express app inside the container and expose port 3030 to your host machine. You can access the application at http://localhost:3030.