# Zeara — Product Requirements Document (PRD)

**Version:** 1.0  
**Project:** Zeara  
**Product Type:** Web Application  
**Status:** Planning & UI/UX Design

---

## 1. Product Overview

Zeara is an all-in-one fitness tracking platform that helps users plan workout routines, record training sessions, and analyze their fitness progress.

The platform combines workout planning, exercise management, workout logging, and progress analytics into one integrated application.

### 1.1 Product Vision

To provide an organized and accessible platform that helps people manage their workout activities and understand their training progress.

### 1.2 Product Objectives

- Allow users to create and manage workout routines.
- Provide an exercise library with built-in and custom exercises.
- Enable users to record workout sessions and performance.
- Help users monitor training progress through statistics and analytics.
- Provide a centralized platform for workout management.

---

## 2. Target Users

Zeara is designed for:

| User Type | Needs |
|---|---|
| Beginners | Organize workouts and learn to track training activities. |
| Gym Enthusiasts | Record exercises, sets, reps, and weights. |
| Regular Exercisers | Monitor workout consistency and performance. |
| Fitness Trackers | Analyze training history and progress over time. |

---

## 3. Product Scope

### 3.1 MVP (Minimum Viable Product)

The initial version will include:

1. User Authentication
2. Dashboard
3. Workout Planner
4. Exercise Library
5. Workout Logger
6. Workout History
7. Progress Analytics
8. User Profile & Settings

### 3.2 Future Features

The following features may be considered for future versions:

- Rest timer.
- Workout calendar.
- Advanced training analytics.
- Training insights and recommendations.
- Workout data export.
- Social workout features.
- AI-assisted training analysis.

These features are not part of the initial MVP scope.

---

## 4. Functional Requirements

### 4.1 User Authentication

**Description:**  
Users must be able to create accounts and securely access their personal workout data.

**Requirements:**

- FR-01: Users can register an account.
- FR-02: Users can log in using their credentials.
- FR-03: Users can log out of their accounts.
- FR-04: Users can manage their account information.
- FR-05: Users can only access their own private workout data.

### 4.2 Dashboard

**Description:**  
The dashboard provides an overview of the user's workout activities and progress.

**Requirements:**

- FR-06: Display workout statistics.
- FR-07: Display total completed workout sessions.
- FR-08: Display recent workout activities.
- FR-09: Display training volume summaries.
- FR-10: Display workout frequency.
- FR-11: Provide quick access to workout-related features.

### 4.3 Workout Planner

**Description:**  
Users can browse existing workout templates and create their own workout routines.

**Requirements:**

- FR-12: Users can browse pre-built workout templates.
- FR-13: Users can copy a template into their personal routines.
- FR-14: Users can customize copied templates.
- FR-15: Users can create custom workout routines.
- FR-16: Users can name and describe their routines.
- FR-17: Users can organize exercises into training days.
- FR-18: Users can add or remove exercises from routines.
- FR-19: Users can configure target sets and repetitions.
- FR-20: Users can edit and delete their personal routines.

### 4.4 Exercise Library

**Description:**  
The exercise library allows users to browse available exercises and manage their own custom exercises.

**Requirements:**

- FR-21: Display a built-in exercise collection.
- FR-22: Users can search exercises by name.
- FR-23: Users can filter exercises by muscle group.
- FR-24: Users can filter exercises by equipment.
- FR-25: Users can view exercise details and instructions.
- FR-26: Users can create custom exercises.
- FR-27: Users can edit their custom exercises.
- FR-28: Users can delete their custom exercises.

### 4.5 Workout Logger

**Description:**  
Users can record their actual workout performance during a training session.

**Requirements:**

- FR-29: Users can start a workout session.
- FR-30: Users can select exercises for a session.
- FR-31: Users can record individual sets.
- FR-32: Users can enter weight and repetitions for each set.
- FR-33: Users can add or remove sets.
- FR-34: Users can mark sets as completed.
- FR-35: Users can finish and save a workout session.

### 4.6 Workout History

**Description:**  
Users can review their previous workout sessions and training records.

**Requirements:**

- FR-36: Display a list of previous workout sessions.
- FR-37: Users can view individual workout session details.
- FR-38: Display completed exercises and their recorded sets.
- FR-39: Users can filter workout history by date.

### 4.7 Progress Analytics

**Description:**  
Progress Analytics helps users understand their training performance through recorded workout data.

**Requirements:**

- FR-40: Display training volume over time.
- FR-41: Display weight progression for exercises.
- FR-42: Display repetition progression for exercises.
- FR-43: Track personal records for heaviest weight.
- FR-44: Track personal records for highest repetitions.
- FR-45: Display completed sets.
- FR-46: Display workout frequency by week and month.

### 4.8 Profile & Settings

**Description:**  
Users can manage their personal account information and application preferences.

**Requirements:**

- FR-47: Display user profile information.
- FR-48: Allow users to update their profile information.
- FR-49: Provide account and application settings.

---

## 5. Business Rules

The following rules define how Zeara should process and display workout data.

### 5.1 Workout Completion

- Only completed workout sessions count toward workout frequency.
- Only completed sets are included in training volume calculations.

### 5.2 Training Volume

Training volume is calculated using:

**Training Volume = Weight × Repetitions**

For multiple completed sets:

**Total Volume = Sum of (Weight × Repetitions)**

The system should handle bodyweight exercises separately when external weight is not recorded, to avoid misleading volume calculations.

### 5.3 Personal Records

Personal records are tracked separately for:

- Heaviest weight lifted.
- Highest repetitions achieved.

Estimated one-repetition maximum (1RM) may be considered in a future version.

### 5.4 Routine Templates

- Users can copy pre-built workout templates.
- Customizing a copied template must not modify the original built-in template.
- Users can only manage their own custom routines.

### 5.5 Custom Exercises

- Users can create and manage their own custom exercises.
- Users must not be able to modify another user's private custom exercises.

### 5.6 User Data

- Workout records must belong to the correct user account.
- Users must not be able to access another user's private workout records.

---

## 6. Application Pages

### 6.1 Public Pages

| Page | Purpose |
|---|---|
| Landing Page | Introduce Zeara and its main features. |
| Sign Up | Allow new users to register. |
| Sign In | Allow existing users to access their accounts. |

### 6.2 Authenticated Pages

| Page | Purpose |
|---|---|
| Dashboard | Show workout overview and statistics. |
| Workout Planner | Browse and manage workout routines. |
| Routine Detail | View and customize workout routines. |
| Exercise Library | Browse and manage exercises. |
| Exercise Detail | Display exercise information and instructions. |
| Active Workout | Record an ongoing workout session. |
| Workout History | Review previous workout sessions. |
| Session Detail | Display the details of a completed session. |
| Progress Analytics | Analyze workout performance and progress. |
| Profile & Settings | Manage user information and preferences. |

---

## 7. Non-Functional Requirements

### 7.1 Usability

- The interface should be intuitive and easy to navigate.
- Workout logging should be straightforward.
- Important workout information should be easy to read.

### 7.2 Responsiveness

- The application should support desktop, tablet, and mobile screen sizes.
- Layouts should adapt to different screen dimensions.

### 7.3 Performance

- Pages should load efficiently.
- Interactions should feel responsive.
- Data retrieval should be handled efficiently.

### 7.4 Security

- Authentication credentials must be handled securely.
- Private user data must be protected.
- Users must only access data they are authorized to access.

### 7.5 Maintainability

- The application should use reusable components.
- Code should be organized into logical modules.
- The project should be maintainable and extensible.

---

## 8. Out of Scope

The following are excluded from the initial MVP:

- Social networking and public workout feeds.
- Direct messaging between users.
- AI-generated workout plans.
- Integration with wearable devices.
- Nutrition and calorie tracking.
- Payment and subscription systems.

These features may be reconsidered in future development.

---

## 9. Success Criteria

The initial version of Zeara will be considered successful when:

1. Users can register, log in, and access their accounts.
2. Users can create and manage workout routines.
3. Users can browse and manage exercises.
4. Users can record and save workout sessions.
5. Users can review their workout history.
6. Users can view basic progress analytics.
7. Workout data is stored and associated with the correct user account.
8. The application works across desktop and mobile layouts.

---

## 10. Open Decisions

The following details still need to be finalized during design and technical planning:

- Final technology stack.
- Exact authentication method.
- Exercise database structure and initial exercise collection.
- Detailed workout session editing rules.
- Handling of bodyweight and assisted exercises in analytics.
- Exact dashboard layout and analytics visualizations.
- API design and database schema.

---

## 11. Document Status

**Version:** 1.0  
**Status:** Initial Draft  
**Last Updated:** November 2026

This PRD may evolve as the project progresses through UI/UX design, technical planning, implementation, and testing.
