# Cardio-Vision-BE

This repository contains the Cardio-Vision Backed. Please follow the instructions below to set up and run the project.

## Tools and Technologies Used

- Node.js
- Express.js
- MySQL
- Sequelize
- Postman

## Installation

To set up the project on your local machine, follow these steps:

1. Clone the repository:
- git clone [repository_url]

2. Install the dependencies:
- npm install

3. Configure the database:
- Open the `connection.js` file and update the MySQL database credentials.

4. Run the application:
- npm start

## Usage

1. API Documentation:
- Refer to the API documentation provided by EasyCash for details on available endpoints, request payloads, parameters, and response formats.

2. Postman Collection:
- Import the provided Postman collection file (`EasyCash.postman_collection.json`) into Postman.
- Configure the environment variables in Postman:
  - Set the `{{url}}` variable to the URL where the application is running.

3. Make API requests:
- Use the imported Postman collection to make requests to the available API endpoints.
- Follow the API documentation to provide the necessary request payloads and parameters.

4. Usage with Postman File:
- Attached to this project is a Postman collection file (`EasyCash.postman_collection.json`).
- Import this file into Postman to have easy access to preconfigured API requests.


## Note

Make sure to exclude the `node_modules` directory by adding it to the `.gitignore` file.

