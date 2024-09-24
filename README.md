# Express TypeScript Boilerplate

![License](https://img.shields.io/badge/license-MIT-blue.svg)

A powerful and flexible boilerplate for building scalable and maintainable web applications using Express and TypeScript. This template is designed to follow a modular architecture, similar to [Nest.js](https://nestjs.com/), allowing for easy expansion and management of your projects.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Postman Collection](#postman-collection)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- Modular structure for clean code organization
- TypeScript support for improved developer experience
- Easy integration of middleware and services
- Built-in error handling and logging
- Sample endpoints for common use cases
- Simple configuration for database and environment variables

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nakuljhunjhunwala/Express-TS-Boilerplate.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Express-TS-Boilerplate
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Configure environment variables:
   - Create a `.env` file in the root directory and add your configurations.

5. Start the server:
   ```bash
   npm run dev
   ```

## Folder Structure

```
src
├── modules               # Contains all feature modules
│   ├── users             # User module (example)
│   │   ├── controllers   # Contains user-related controllers
│   │   ├── services      # Contains user-related business logic
│   │   ├── repositories   # Handles data persistence
│   │   ├── dtos          # Data Transfer Objects for validation
│   │   └── routes        # API routes for the user module
│   ├── auth              # Authentication module
│   └── ...               # Other modules
├── middlewares           # Custom middleware
├── config                # Configuration files
├── utils                 # Utility functions
└── index.ts             # Entry point of the application
```

## Postman Collection

To explore and test the API endpoints, you can use the provided [Postman collection](./postman.collection.json). This collection includes all the endpoints available in this boilerplate, complete with sample requests and responses.

## Technologies Used

- [Express.js](https://expressjs.com/) - Fast web framework for Node.js
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed programming language
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variable loader

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/myFeature
   ```
3. Commit your changes
   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch
   ```bash
   git push origin feature/myFeature
   ```
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
