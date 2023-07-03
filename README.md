# README.md

## Uncle Anne's

Uncle Anne's is a mobile application inspired by the famous Auntie Anne's pretzel franchise. This project is structured into two main directories: `client-mobile` and `server`. The `client-mobile` directory contains the React Native mobile client application built with Expo, while the `server` directory is responsible for backend services. Deployed using Docker

```
.
├── client-mobile
└── server
    ├── orchestrator (port: 4000)
    ├── orchestrator-express (port: 4000)
    └── services
        ├── users - mongodb (port: 4001)
        └── app - postgres (port: 4002)
```

### client-mobile

This directory contains the mobile client application built using React Native and Expo. The application is cross-platform and can run on both iOS and Android devices (Expo). It allows users to browse, order, and customize their pretzels while also earning rewards and participating in promotions.

### server

The server directory is responsible for hosting the backend services and includes an orchestrator and microservices for different functionalities.

#### orchestrator (port: 4000)

The orchestrator is responsible for managing and coordinating the microservices. It listens on port 4000.

#### orchestrator-express (port: 4000)

The orchestrator-express is an express.js version of the orchestrator and also listens on port 4000.

#### services

The services directory contains the microservices that provide specific functionalities for the application.

##### users - mongodb (port: 4001)

The users service is responsible for handling user-related functionalities such as authentication and user management. It uses MongoDB as its database and listens on port 4001.

##### app - postgres (port: 4002)

The app service is responsible for handling application-related functionalities such as data processing, storage, and retrieval. It uses PostgreSQL as its database and listens on port 4002.

## Getting Started

To get started with the project, follow the instructions below:

1. Clone the repository.
2. Install dependencies for both the `client-mobile` and `server` directories.
3. Start the services in the `server` directory.
4. Launch the mobile application using Expo development environment.
