# Teebay Implementation Documentation

## Table of Contents

1.  Introduction
2.  Project Overview
3.  Technologies Used
4.  Feature Implementation

    - Part 1: Preliminary Features
    - Part 2: Product Management
    - Part 3: Rent and Buy/Sell

5.  Database Design and Modeling
6.  Error Handling and Edge Cases
7.  Suggestions for Testing and Improvements
8.  Prompt Examples for Enhancements
9.  Frontend Routes Guide
10. Deployment Instructions

11. Conclusion

## 1\. Introduction

Teebay is a product renting and buying/selling platform designed using React for the frontend and Express with GraphQL for the backend. The database is managed with Postgres using Prisma ORM, and Apollo Client is employed for managing GraphQL queries and caching.

## 2\. Project Overview

Teebay allows users to:

- Register and log in to their accounts.
- Add, edit, and delete products.
- List all available products.
- Rent or buy products.
- View their transaction history.

## 3\. Technologies Used

- **Frontend:** React, Apollo Client, Mantine UI
- **Backend:** Node.js with Express and GraphQL
- **Database:** Postgres with Prisma ORM
- **Authentication:** JWT tokens with bcrypt for hashing passwords
- **Containerization:** Docker
- **Validation:** React Hook Form and Mantine Forms
- **Version Control:** GitHub

## 4\. Feature Implementation

### Part 1: Preliminary Features

**Login and Registration:**

- Implemented user registration with hashed passwords.
- Used JWT for secure token-based authentication.

**Challenges Solved:**

- **Password Validation:** Enforced password rules for security in both frontend and backend.

### Part 2: Product Management

**Adding Products:**

- Multi-step form implementation with Mantine UI for navigation.
- State management through Apollo Client caching.

**Editing and Deleting Products:**

- GraphQL mutations to update and delete products.
- Cache updated automatically upon mutation success.

**Challenges Solved:**

- **Dynamic Form Handling:** Multi-step forms handled dynamically to allow edits before final submission.
- **Cache Synchronization:** Apollo cache updates ensured consistency without refetching data.
- **Field Validations:** Handled client-side and server-side validations to prevent incomplete submissions.

### Part 3: Rent and Buy/Sell

**Listing Products:**

- Implemented a product list query using Apollo.

**Renting and Buying:**

- GraphQL mutations track product ownership and renting status.
- Implemented optimistic updates for faster UI responses.

**Challenges Solved:**

- **Preventing Double-Booking:** Status checks ensured a product couldn't be rented twice at the same time.
- **Concurrency Handling:** Database transactions avoided conflicts during simultaneous updates.
- **State Consistency:** Immediate feedback provided using Apollo Client's in-memory cache.

## 5\. Database Design and Modeling

**Tables:**

1.  Users - Stores user details and authentication data.
2.  Products - Stores product information including category and status.
3.  Transactions - Logs renting and buying actions.

**Relationships:**

- One-to-many relationship between Users and Products.
- Many-to-many relationship for rented products.

## 6\. Error Handling and Edge Cases

- **Validation Errors:** Server-side validation for invalid inputs.
- **Authentication Errors:** JWT token validation for protected routes.
- **Concurrency Issues:** Database transactions ensure consistency.

## 7\. Suggestions for Testing and Improvements

### Testing Suggestions:

- **Unit Tests:** Use Jest and React Testing Library to test components and utility functions.
- **Integration Tests:** Supertest for backend GraphQL API testing.
- **End-to-End Tests:** Cypress can simulate user interactions and test workflows.

**Test Design (Test-First Approach):**

1.  Define test cases before implementing a feature.
2.  Write tests to validate input handling, API responses, and edge cases.
3.  Implement the feature and ensure all tests pass.
4.  Refactor code while maintaining test coverage.

### Improvements:

- **Pagination Support:** Implement pagination using GraphQL's skip and take arguments.

  - **Backend:** Add query options to handle limits and offsets.
  - **Frontend:** Update Apollo queries to support pagination and dynamically load more products.
  - **UI Enhancement:** Add 'Load More' or infinite scrolling.

## 8\. Prompt Examples for Enhancements

1.  "Guide me through setting up a full-stack project with React (frontend) and Express with GraphQL (backend). Include Docker configuration and Prisma setup with Postgres."
2.  "Help me implement user authentication in my Express-GraphQL backend using bcrypt for password hashing and JWT tokens for authentication. Include token generation and validation with protected routes."
3.  "Provide Prisma schema definitions for a product renting and buying/selling application. Include models for Users, Products, Orders, and Reviews with appropriate relations. (More details in the PDF attached)"
4.  "How to integrate the Apollo Client for GraphQL queries and mutations with caching."
5.  "Provide a Dockerfile and docker-compose configuration to containerize the application. Make sure it includes containers for the Node.js backend, React frontend, and Postgres database."

## 9\. Frontend Routes Guide

- **`/all-products:`** Displays all products available for rent or sale.
- **`/my-products:`** Lists products added by the logged-in user.
- **`/history:`** Shows transaction history, including products rented, bought, or sold by the user.

## 10\. Project Setup Guide

1.  Clone the repository.
2.  `cd teebay`
3.  Then run these two commands: (Make sure you've docker running of your PC.)

    ```bash
    docker-compose build
    docker compose up -d
    ```

4.  Access the app at `http://localhost:3000` for frontend and `http://localhost:4000/graphql` for backend GraphQL Playground.
