# Appointment Scheduling System

## Introduction

The Appointment Scheduling System is a robust application designed for managing appointments and scheduling services. It supports various types of services, multiple service providers, and custom buffer times to ensure smooth scheduling. This system allows users to create, view, update, and delete appointments and services, with an easy-to-use API for integration.

## Installation

1.  **Clone the Repository**

    ```
    git clone https://github.com/yourusername/appointment-scheduling-system.git
    cd appointment-scheduling-system
    ```

2.  **Install Dependencies**

    Ensure you have [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed. Then, run:

    ```
    pnpm install
    ```

3.  **Set Up the Database**

    Configure your database settings in `.env`. Create a `.env` file in the root directory and add your database configuration:

    ```
    DATABASE_URL=your-database-connection-string
    ```

4.  **Run Database Migrations**

    Apply the initial database schema:

    ```
    npx prisma migrate deploy
    ```

5.  **Start the Application**

    Start the server:

    ```
    pnpm start
    ```

    The application will be running on `http://localhost:3000`.

## Architecture

The project follows the Clean Architecture pattern and is organized into the following modules:

- **appointments**: Manages appointment scheduling and related operations.
- **providers**: Handles service providers, their services, and availability.
- **services**: Manages different types of services offered.
- **users**: Manages user data and authentication.

### Project Structure

```
src/
  modules/
    appointments/
      controllers/
      repositories/
      usecases/
      entities/
    providers/
      controllers/
      repositories/
      usecases/
      entities/
    services/
      controllers/
      repositories/
      usecases/
      entities/
    users/
      controllers/
      repositories/
      usecases/
      entities/
  infrastructure/
    database/
      prismaClient.ts
  shared/
    errors/
    middlewares/
  app.ts
  server.ts
```

## Models

The following models are used in the application:

- **User**: Represents a user in the system.
- **Service**: Represents a service offered.
- **Provider**: Represents a service provider.
- **Appointment**: Represents an appointment for a service.

### Prisma Schema

The Prisma schema file `prisma/schema.prisma` defines the structure of the database tables. Ensure the models are aligned with your application logic.

## Endpoints

### Users

- **Create User**  
  `POST /users`  
  Request Body: `{ 'name': 'string', 'email': 'string', 'password': 'string' }`  
  Response: `201 Created`
- **Get User by ID**  
  `GET /users/:id`  
  Response: `200 OK` or `404 Not Found`
- **Get All Users**  
  `GET /users`  
  Response: `200 OK`
- **Update User**  
  `PUT /users/:id`  
  Request Body: `{ 'name': 'string', 'email': 'string', 'password': 'string' }`  
  Response: `200 OK`
- **Delete User**  
  `DELETE /users/:id`  
  Response: `204 No Content`

### Services

- **Create Service**  
  `POST /services`  
  Request Body: `{ 'name': 'string', 'duration': number }`  
  Response: `201 Created`
- **Get Service by ID**  
  `GET /services/:id`  
  Response: `200 OK` or `404 Not Found`
- **Get All Services**  
  `GET /services`  
  Response: `200 OK`
- **Update Service**  
  `PUT /services/:id`  
  Request Body: `{ 'name': 'string', 'duration': number }`  
  Response: `200 OK`
- **Delete Service**  
  `DELETE /services/:id`  
  Response: `204 No Content`

### Providers

- **Create Provider**  
  `POST /providers`  
  Request Body: `{ 'name': 'string', 'services': [number[]] }`  
  Response: `201 Created`
- **Get Provider by ID**  
  `GET /providers/:id`  
  Response: `200 OK` or `404 Not Found`
- **Get All Providers**  
  `GET /providers`  
  Response: `200 OK`
- **Update Provider**  
  `PUT /providers/:id`  
  Request Body: `{ 'name': 'string', 'services': [number[]] }`  
  Response: `200 OK`
- **Delete Provider**  
  `DELETE /providers/:id`  
  Response: `204 No Content`

### Appointments

- **Create Appointment**  
  `POST /appointments`  
  Request Body: `{ 'userId': number, 'providerId': number, 'serviceId': number, 'startTime': 'string' }`  
  Response: `201 Created`
- **Get Appointment by ID**  
  `GET /appointments/:id`  
  Response: `200 OK` or `404 Not Found`
- **Get All Appointments**  
  `GET /appointments`  
  Response: `200 OK`
- **Update Appointment**  
  `PUT /appointments/:id`  
  Request Body: `{ 'userId': number, 'providerId': number, 'serviceId': number, 'startTime': 'string' }`  
  Response: `200 OK`
- **Delete Appointment**  
  `DELETE /appointments/:id`  
  Response: `204 No Content`

## Additional Information

- **Testing**  
  Ensure you write unit tests and integration tests for your use cases and controllers.
- **Error Handling**  
  Implement proper error handling and validation throughout your application.

## Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request. Ensure your code adheres to the project's coding standards and passes all tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
