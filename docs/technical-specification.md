# Zeara — Technical Specification

**Version:** 1.0  
**Project:** Zeara  
**Document Type:** Technical Specification  
**Status:** Initial Draft

---

## 1. Introduction

This document describes the proposed technical architecture, technology stack, application structure, database design, and API requirements for Zeara.

It serves as a technical reference for developers during implementation.

The technical decisions in this document are preliminary and may change as the project evolves.

## 2. System Architecture

Zeara is planned as a full-stack web application consisting of three primary layers:

1. Frontend — Handles the user interface and user interactions.
2. Backend — Handles business logic, authentication, and data processing.
3. Database — Stores user accounts, workout routines, exercises, and training records.

### 2.1 High-Level Architecture

```text
             USER
               |
               v
        FRONTEND (React)
               |
          HTTP / API
               |
               v
       BACKEND (Node.js)
               |
               v
          DATABASE
          (PostgreSQL)
```

The frontend communicates with the backend through API requests. The backend processes requests and interacts with the database.

## 3. Proposed Technology Stack

The following technologies are proposed for the initial implementation.

| Layer | Proposed Technology | Purpose |
|---|---|---|
| UI/UX Design | Figma | Interface design and prototyping |
| Frontend | React | Building the user interface |
| Programming Language | JavaScript | Application development |
| Styling | Tailwind CSS | Interface styling |
| Backend | Node.js | Server-side JavaScript runtime |
| Backend Framework | Express.js | API development |
| Database | PostgreSQL | Relational data storage |
| Version Control | Git & GitHub | Source code management |
| Deployment | To be determined | Hosting the application |

**Note:** This stack is a proposal, not a finalized decision.

## 4. Frontend Architecture

### 4.1 Responsibilities

The frontend is responsible for:

- Rendering application pages.
- Handling user interactions.
- Managing UI state.
- Validating user input before submission.
- Communicating with backend APIs.
- Displaying workout data and analytics.

### 4.2 Proposed Frontend Structure

```text
src/
├── assets/
│   ├── images/
│   └── icons/
│
├── components/
│   ├── common/
│   ├── layout/
│   └── fitness/
│
├── pages/
│   ├── Landing/
│   ├── Authentication/
│   ├── Dashboard/
│   ├── WorkoutPlanner/
│   ├── ExerciseLibrary/
│   ├── WorkoutLogger/
│   ├── WorkoutHistory/
│   ├── Analytics/
│   └── Profile/
│
├── services/
│   └── api/
│
├── hooks/
├── utils/
├── styles/
└── App.jsx
```

This is a proposed structure and may be adjusted during implementation.

### 4.3 Component Principles

- Components should be reusable.
- Each component should have a clear responsibility.
- Shared UI elements should be separated from page-specific components.
- Styling should remain consistent with the design system.

## 5. Backend Architecture

### 5.1 Responsibilities

The backend is responsible for:

- User authentication and authorization.
- Processing workout-related requests.
- Managing routines and exercises.
- Saving workout sessions and set records.
- Retrieving workout history.
- Calculating progress statistics.
- Enforcing user data ownership.

### 5.2 Proposed Backend Structure

```text
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── models/
│   ├── utils/
│   └── app.js
│
├── .env.example
└── package.json
```

The backend should separate routing, business logic, and database operations to improve maintainability.

## 6. Database Design

Zeara is expected to use a relational database because its main data entities have clear relationships.

### 6.1 Proposed Database Entities

| Entity | Purpose |
|---|---|
| Users | Stores user account information. |
| Exercises | Stores built-in and custom exercise information. |
| Workout Routines | Stores user workout routines and built-in templates. |
| Routine Days | Organizes routines into training days. |
| Routine Exercises | Connects exercises to routine days. |
| Workout Sessions | Stores individual workout sessions. |
| Session Exercises | Stores exercises performed during a session. |
| Workout Sets | Stores weight, repetitions, and completion status for each set. |

### 6.2 Proposed Relationships

- One user can own multiple workout routines.
- One routine can contain multiple training days.
- One training day can contain multiple exercises.
- One user can have multiple workout sessions.
- One workout session can contain multiple session exercises.
- One session exercise can contain multiple workout sets.
- Exercises can be built-in or user-created.

### 6.3 Simplified Entity Relationship Diagram

```text
USERS
  |
  |----< WORKOUT_ROUTINES
  |           |
  |           |----< ROUTINE_DAYS
  |                      |
  |                      |----< ROUTINE_EXERCISES
  |                                      |
  |                                      v
  |                                  EXERCISES
  |
  |----< WORKOUT_SESSIONS
               |
               |----< SESSION_EXERCISES
                              |
                              |----< WORKOUT_SETS
                              |
                              v
                          EXERCISES
```

This diagram represents the conceptual relationships. Exact foreign keys, constraints, and database columns will be defined during database design.

## 7. API Design

The frontend and backend are expected to communicate through REST APIs.

The following endpoints are preliminary examples.

### 7.1 Authentication

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Register a new user. |
| POST | `/api/auth/login` | Authenticate a user. |
| POST | `/api/auth/logout` | Log out a user. |
| GET | `/api/auth/me` | Retrieve the current user. |

### 7.2 Workout Routines

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/routines` | Retrieve available routines. |
| GET | `/api/routines/:id` | Retrieve routine details. |
| POST | `/api/routines` | Create a routine. |
| PUT | `/api/routines/:id` | Update a routine. |
| DELETE | `/api/routines/:id` | Delete a routine. |

### 7.3 Exercises

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/exercises` | Retrieve exercises. |
| GET | `/api/exercises/:id` | Retrieve exercise details. |
| POST | `/api/exercises` | Create a custom exercise. |
| PUT | `/api/exercises/:id` | Update a custom exercise. |
| DELETE | `/api/exercises/:id` | Delete a custom exercise. |

### 7.4 Workout Sessions

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/sessions` | Retrieve workout history. |
| GET | `/api/sessions/:id` | Retrieve session details. |
| POST | `/api/sessions` | Create a workout session. |
| PUT | `/api/sessions/:id` | Update a workout session. |
| DELETE | `/api/sessions/:id` | Delete a workout session. |

### 7.5 Analytics

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/analytics/overview` | Retrieve general workout statistics. |
| GET | `/api/analytics/volume` | Retrieve training volume data. |
| GET | `/api/analytics/frequency` | Retrieve workout frequency. |
| GET | `/api/analytics/progression` | Retrieve exercise progression. |
| GET | `/api/analytics/records` | Retrieve personal records. |

The exact request bodies, response formats, validation rules, and authorization requirements will be specified before implementation.

## 8. Data Processing Rules

### 8.1 Training Volume

For eligible completed sets:

**Set Volume = Weight × Repetitions**

Total training volume is calculated by summing eligible completed set volumes.

### 8.2 Workout Frequency

Workout frequency is calculated using completed workout sessions.

### 8.3 Personal Records

The system should track:

- Maximum recorded weight.
- Maximum recorded repetitions.

### 8.4 Data Ownership

- Every private workout record must be associated with its owner.
- Users must only access records they are authorized to manage.
- Built-in templates and exercises must be protected from unauthorized modification.

## 9. Security Requirements

- Passwords must be stored using secure password hashing.
- Authentication and authorization must be handled by the backend.
- Private API endpoints must verify user permissions.
- Sensitive credentials must not be committed to GitHub.
- Environment variables should be used for secrets and configuration.
- Input validation must be performed before processing requests.

## 10. Version Control and Collaboration

GitHub will be used for source code management and collaboration.

### 10.1 Branch Strategy

```text
main
  |
  |---- feature/authentication
  |---- feature/dashboard
  |---- feature/workout-planner
  |---- feature/workout-logger
  |---- fix/validation
```

### 10.2 Contribution Workflow

1. Create an issue describing the task.
2. Create a branch for the task.
3. Implement the changes.
4. Test the implementation.
5. Open a Pull Request.
6. Review and merge the changes into the main branch.

## 11. Deployment Strategy

The application will eventually require:

- Frontend hosting.
- Backend hosting.
- Managed database hosting.
- Environment-specific configuration.

The deployment provider and production architecture have not yet been selected.

## 12. Open Technical Decisions

The following decisions remain open:

- Final frontend and backend technology stack.
- Authentication implementation.
- Database schema and constraints.
- API request and response formats.
- Handling of bodyweight and assisted exercises.
- Data validation and error handling.
- Deployment provider.
- Testing framework and testing strategy.

## 13. Technical Status

**Current Phase:** Technical Planning

This document represents the initial technical direction of Zeara. The architecture and implementation details may evolve as development progresses.

---

**Zeara — Plan. Track. Analyze.**
