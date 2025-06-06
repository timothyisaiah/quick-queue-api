<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## QuickQueue API

The **QuickQueue API** is a full-featured backend designed to manage appointments, provider availability, and reviews/ratings for both clients and service providers. This API provides endpoints for users to register, log in, and manage their appointments with service providers, including real-time availability and conflict checks. Providers can set their availability and receive reviews and ratings from clients.

### Key Features:

1. **User Authentication:**
   - **JWT-based Authentication**: Secure user authentication with JWT for both clients and providers.
   - **User Registration/Login**: Users can register and log in, with proper session management and authentication.
   
2. **Appointments:**
   - **Create & Manage Appointments**: Clients can book, accept, and reject appointments with service providers.
   - **Scheduling Conflicts**: Prevents double-booking for both clients and providers.
   - **Notifications**: Providers and clients receive notifications about appointment requests and status updates.

3. **Provider Availability:**
   - **Set Availability**: Providers can set and manage their availability slots (start and end times).
   - **Availability Conflict Prevention**: The system ensures that new availability slots do not conflict with existing ones.
   - **View Available Slots**: Providers can view their scheduled availability slots.

4. **Reviews and Ratings:**
   - **Leave Reviews**: Clients can leave reviews and ratings for service providers after an appointment.
   - **View Reviews**: Clients can view reviews left by others for a specific provider.
   - **Average Ratings**: Clients can view the average rating of a provider based on all their reviews.
   - **Update/Delete Reviews**: Clients can update or delete their reviews.

### Technologies Used:
- **NestJS**: A powerful backend framework used to build the API.
- **TypeORM**: ORM used for database interaction with PostgreSQL.
- **JWT Authentication**: Secure API with JWT tokens for user authentication.
- **PostgreSQL**: A relational database for storing user and appointment data.

### Endpoints:

- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Log in and receive a JWT token.
- **POST /appointments**: Create a new appointment.
- **GET /appointments**: View all appointments for the logged-in user.
- **PATCH /appointments/:id**: Update appointment details (e.g., accept or reject).
- **DELETE /appointments/:id**: Cancel an appointment.
- **GET /availability**: View all availability slots for the logged-in provider.
- **POST /availability**: Set new availability slots for a provider.
- **PATCH /availability/:id**: Update an existing availability slot.
- **DELETE /availability/:id**: Remove an availability slot.
- **POST /reviews**: Leave a review for a provider.
- **GET /reviews/provider/:providerId**: View all reviews for a provider.
- **PATCH /reviews/:id**: Update an existing review.
- **DELETE /reviews/:id**: Delete a review.




## Project Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ pnpm install
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
#   q u i c k - q u e u e - a p i 
 
 