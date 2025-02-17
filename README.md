<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Project discription
This project is a backend service designed for managing a simple e-commerce system. It includes essential entities like products, vendors, users, and carts. The system provides RESTful API endpoints to handle operations like adding products to the catalog, managing vendors and users, and processing carts. The application is built using NestJS for a scalable, modular architecture and MongoDB for database management, ensuring efficient handling of data and operations.


  
## Database Design

1. **ERD Diagram**

![image](https://github.com/user-attachments/assets/4509652f-74cc-4c8f-a0b3-4c4f1d525d35)

  As we see here we have 4 entities. The relation between them as follows
  
    One-to-Many between vendor and product.
    One-to-One between user and cart.
    One-to_Many between cart and product.

2. **Use Case Diagram**

![image](https://github.com/user-attachments/assets/172f366a-bc65-4171-939c-c6bfb19fe969)

  This diagram describe roles and actions in this app. I focused more on customer and vendor actions instead of admin
  because i didn't merge auth module to handle some privileges.



## Application Setup

1. **Clone the repository**
    ```bash
      git clone https://github.com/ahmedabdalkaderr/cartify.git
    ```
2. **Install dependencies**
    ```
     npm install
    ```
3. **Setting Up MongoDB URI**

    To connect to a MongoDB database, you need to set up a MongoDB URI. Create a .env file in the root directory of your     project and add the following line:
    ```
     URI=mongodb://<username>:<password>@<host>:<port>/<database>
    ```
    Replace username, password, host, port, and database with your actual MongoDB connection details. 

    Or if you will use your local host (**but be sure that mongodb is activated in your device**):
    ```
     URI=mongodb://127.0.0.1:27017/dinamo-task
    ```
4. **Running the app**
   ```
    npm run start:dev
   ```
5. **Testing**   
   to run unit testing files:
   ```
    npm run test
   ```

## REST Endpoints
To view the full API documentation, follow these steps:

1. **Start the Application**:
    Make sure your application is running. You can start it in development mode using:
    ```
    npm run start:dev
    ```

2. **Open Swagger UI**:
    Once the application is running, open your web browser and navigate to:
    ```
     http://localhost:3000/api
    ```
    after navigating you will see end points look like this :
     ![image](https://github.com/user-attachments/assets/a97e7ce9-cb86-47dc-8441-4a4faaa62d66)


## Authentication Strategy

1. **Authentication Workflow**:
   
    **Registration/Login**: Users register and log in, receiving a JWT upon successful authentication.

    **Token Storage**: The JWT is stored securely (e.g., in local storage) on the client side. 

    **Request Authorization**: For each request, the JWT is sent in the HTTP headers to verify the user's identity and.       permissions.

    **Role-Based Access Control**: The server checks the JWT and user role to ensure that the user can perform the       requested actions.

2. **User Roles and Actions**:
   
   **Admin**: Add, view, modify, and delete users and vendor.
   
   **Customers**: View current products and manage their shopping cart details (add, view, modify, delete items).
   
   **Vendors**: Add, view, modify, and delete their products.
