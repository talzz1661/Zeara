# Zeara — Sitemap & User Flow

**Version:** 1.0  
**Project:** Zeara  
**Document Type:** Sitemap & User Flow  
**Status:** Initial Draft

---

## 1. Overview

This document defines the information architecture, application pages, navigation structure, and primary user journeys of Zeara.

It serves as a reference for UI/UX design and application development.

## 2. Application Structure

Zeara is divided into two main areas:

1. Public Area — Pages accessible before authentication.
2. Authenticated Area — Pages accessible after users log in.

### 2.1 Public Pages

| Page | Description |
|---|---|
| Landing Page | Introduces Zeara and its main features. |
| Sign Up | Allows new users to create an account. |
| Sign In | Allows existing users to log in. |

### 2.2 Authenticated Pages

| Page | Description |
|---|---|
| Dashboard | Displays workout summaries and recent activities. |
| Workout Planner | Displays workout templates and personal routines. |
| Routine Detail | Displays the exercises and structure of a routine. |
| Create/Edit Routine | Allows users to create or modify routines. |
| Exercise Library | Displays built-in and custom exercises. |
| Exercise Detail | Displays exercise information and instructions. |
| Create/Edit Exercise | Allows users to manage custom exercises. |
| Active Workout | Allows users to record an ongoing workout. |
| Workout History | Displays previous workout sessions. |
| Session Detail | Displays detailed information about a completed session. |
| Progress Analytics | Displays workout statistics and performance trends. |
| Profile | Displays and manages user profile information. |
| Settings | Allows users to manage application preferences and account settings. |

---

## 3. Sitemap

The following structure represents the planned application hierarchy.

```text
ZEARA
│
├── Public Area
│   ├── Landing Page
│   ├── Sign Up
│   └── Sign In
│
└── Authenticated Area
    │
    ├── Dashboard
    │
    ├── Workout Planner
    │   ├── Workout Templates
    │   ├── My Routines
    │   ├── Routine Detail
    │   ├── Create Routine
    │   └── Edit Routine
    │
    ├── Exercise Library
    │   ├── Exercise Collection
    │   ├── Exercise Detail
    │   ├── Create Custom Exercise
    │   └── Edit Custom Exercise
    │
    ├── Active Workout
    │   ├── Workout Session
    │   ├── Exercise Selection
    │   ├── Set Logging
    │   └── Workout Summary
    │
    ├── Workout History
    │   ├── Session List
    │   └── Session Detail
    │
    ├── Progress Analytics
    │   ├── Training Volume
    │   ├── Exercise Progression
    │   ├── Personal Records
    │   └── Workout Frequency
    │
    └── Account
        ├── Profile
        └── Settings
```

---

## 4. Navigation Structure

### 4.1 Primary Navigation

The authenticated application should provide access to the following main sections:

| Navigation Item | Destination |
|---|---|
| Dashboard | Dashboard |
| Workout Planner | Workout Planner |
| Exercise Library | Exercise Library |
| Workout History | Workout History |
| Progress Analytics | Progress Analytics |

### 4.2 Account Navigation

Account-related options should be accessible through the user profile menu.

- Profile
- Settings
- Logout

### 4.3 Navigation Principles

- Primary navigation should remain consistent across authenticated pages.
- Users should be able to return to the Dashboard easily.
- Secondary actions should be grouped with their related modules.
- Navigation should adapt to mobile screen sizes.

---

## 5. Primary User Flows

### 5.1 New User Registration

**Goal:** Allow a new user to create an account and access Zeara.

```text
Landing Page
     |
     v
   Sign Up
     |
     v
Enter Registration Details
     |
     v
Validate Input
     |
     v
Account Created
     |
     v
  Dashboard
```

**Expected Behavior:**

- Users enter the required registration information.
- The application validates the submitted information.
- If registration succeeds, the user gains access to the authenticated application.
- If registration fails, an appropriate error message is displayed.

### 5.2 Existing User Login

**Goal:** Allow registered users to access their accounts.

```text
Landing Page
     |
     v
   Sign In
     |
     v
Enter Credentials
     |
     v
Validate Credentials
     |
     v
Authentication Successful?
     |
   Yes / No
     |
     v
  Dashboard
```

If authentication fails, the application should display an error message and allow the user to try again.

### 5.3 Create a Workout Routine

**Goal:** Allow users to create a personal workout routine.

```text
Dashboard
    |
    v
Workout Planner
    |
    v
Create Routine
    |
    v
Enter Routine Name
    |
    v
Add Training Days
    |
    v
Add Exercises
    |
    v
Configure Sets and Reps
    |
    v
Save Routine
    |
    v
Routine Detail
```

Users should also be able to create a routine by copying a pre-built template and customizing it.

### 5.4 Browse and Manage Exercises

**Goal:** Allow users to find exercises or create custom exercises.

```text
Dashboard
    |
    v
Exercise Library
    |
    v
Search / Filter Exercises
    |
    v
Select Exercise
    |
    v
Exercise Detail
```

For custom exercises:

```text
Exercise Library
    |
    v
Create Custom Exercise
    |
    v
Enter Exercise Information
    |
    v
Save Exercise
    |
    v
Exercise Library
```

### 5.5 Start and Record a Workout

**Goal:** Allow users to record their actual workout performance.

```text
Dashboard / Workout Planner
          |
          v
     Select Routine
          |
          v
      Start Workout
          |
          v
     Active Workout
          |
          v
     Select Exercise
          |
          v
      Record Sets
          |
          v
 Enter Weight and Reps
          |
          v
    Mark Sets Complete
          |
          v
      Next Exercise
          |
          v
     Finish Workout
          |
          v
    Workout Summary
          |
          v
      Save Session
```

Users should be able to add or remove sets while recording a workout.

### 5.6 Review Workout History

**Goal:** Allow users to review previous training sessions.

```text
Dashboard
    |
    v
Workout History
    |
    v
Browse Sessions
    |
    v
Select a Session
    |
    v
Session Detail
    |
    v
Review Exercises and Set Records
```

Users should be able to filter sessions by date.

### 5.7 Analyze Workout Progress

**Goal:** Allow users to understand their training performance.

```text
Dashboard
    |
    v
Progress Analytics
    |
    v
Select Metric
    |
    ├── Training Volume
    ├── Weight Progression
    ├── Repetition Progression
    ├── Personal Records
    └── Workout Frequency
          |
          v
     View Analytics
```

---

## 6. Important Navigation and Access Rules

- Unauthenticated users must sign in or register before accessing private application pages.
- Authenticated users should be redirected to the Dashboard after successful login.
- Users should only access their own personal workout data.
- Built-in exercises and templates should be available to all users.
- Custom exercises and personal routines should be managed by their respective owners.
- Users should be able to navigate between related modules without losing important context.

---

## 7. Responsive Navigation

### Desktop

- Use a persistent sidebar for primary navigation.
- Display account options in a profile menu.
- Use the available content area for page information.

### Tablet

- Use a collapsible sidebar or compact navigation.
- Maintain access to all primary modules.

### Mobile

- Use a compact navigation pattern appropriate for smaller screens.
- Ensure workout logging controls remain easy to access.
- Prioritize important workout information and actions.

---

## 8. Open Design Decisions

The following details will be finalized during UI/UX design:

- Whether the sidebar is fixed or collapsible.
- Whether the workout logger uses a dedicated full-screen interface.
- How routine templates are presented.
- How exercise filters are displayed.
- How analytics categories are organized.
- How mobile navigation should work.
- Whether workout summaries appear as a separate page or modal.

---

## 9. Document Status

**Version:** 1.0  
**Status:** Initial Draft  
**Last Updated:** November 2026

This document may be updated as the application structure and user experience evolve.
