import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ZearaDesktopLandingPage from "./ZearaDesktopLandingPage";
import ZearaSignIn from "./ZearaSignIn";
import ZearaSignUp from "./ZearaSignUp";
import ZearaFitnessDashboard from "./ZearaFitnessDashboard";
import ZearaWorkoutPlanner from "./ZearaWorkoutPlanner";
import ZearaRoutineDetail from "./ZearaRoutineDetail";
import ZearaCreateRoutine from "./ZearaCreateRoutine";
import ZearaActiveWorkout from "./ZearaActiveWorkout";
import ZearaExerciseLibrary from "./ZearaExerciseLibrary";
import ZearaExerciseDetail from "./ZearaExerciseDetail";
import ZearaWorkoutHistory from "./ZearaWorkoutHistory";
import ZearaProgressAnalytics from "./ZearaProgressAnalytics";
import ZearaProfileSettings from "./ZearaProfileSettings";
import CreateCustomExerciseModal from "./CreateCustomExerciseModal";
import { ExerciseSavedSuccessToast } from "./components/ZearaToasts";

function useZearaNav() {
  const navigate = useNavigate();

  return (menu) => {
    if (menu === "Landing") navigate("/");
    if (menu === "Dashboard") navigate("/dashboard");
    if (menu === "Workout Planner") navigate("/planner");
    if (menu === "Active Workout") navigate("/active");
    if (menu === "Exercise Library") navigate("/exercises");
    if (menu === "Workout History") navigate("/history");
    if (menu === "Progress Analytics") navigate("/analytics");
    if (menu === "Profile & Settings" || menu === "Settings")
      navigate("/settings");
  };
}

function LandingWrapper() {
  const navigate = useNavigate();

  return (
    <ZearaDesktopLandingPage
      onSignIn={() => navigate("/signin")}
      onGetStarted={() => navigate("/signup")}
      onExploreDemo={() => navigate("/dashboard")}
    />
  );
}

function SignInWrapper({ currentUser, onAuthSuccess }) {
  const navigate = useNavigate();

  return (
    <ZearaSignIn
      onSuccess={(form) => {
        const derivedName =
          currentUser?.email === form.email && currentUser?.fullName
            ? currentUser.fullName
            : form.email
                .split("@")[0]
                .replace(/[._-]/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase());

        onAuthSuccess({
          fullName: derivedName || "Athallah",
          email: form.email,
        });
        navigate("/dashboard");
      }}
      onSwitchToSignUp={() => navigate("/signup")}
      onForgotPassword={() =>
        alert("Password reset link has been sent to your email.")
      }
    />
  );
}

function SignUpWrapper({ onAuthSuccess }) {
  const navigate = useNavigate();

  return (
    <ZearaSignUp
      onSuccess={(form) => {
        onAuthSuccess({
          fullName: form.fullName.trim(),
          email: form.email.trim(),
        });
        navigate("/dashboard");
      }}
      onSwitchToSignIn={() => navigate("/signin")}
    />
  );
}

function DashboardWrapper({ user }) {
  const navigate = useNavigate();
  const handleMenuNavigate = useZearaNav();

  return (
    <ZearaFitnessDashboard
      user={user}
      onNavigate={handleMenuNavigate}
      onStartWorkout={() => navigate("/active")}
      onCreateRoutine={() => navigate("/planner/new")}
    />
  );
}

function PlannerWrapper({ user }) {
  const navigate = useNavigate();
  const handleMenuNavigate = useZearaNav();

  return (
    <ZearaWorkoutPlanner
      user={user}
      onNavigate={handleMenuNavigate}
      onStartWorkout={(routine) =>
        navigate("/active", { state: { routine } })
      }
      onCreateRoutine={() => navigate("/planner/new")}
      onViewRoutine={(routine) =>
        navigate("/planner/detail", { state: { routine } })
      }
    />
  );
}

function RoutineDetailWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleMenuNavigate = useZearaNav();
  const routine = location.state?.routine;

  return (
    <ZearaRoutineDetail
      routine={routine}
      onNavigate={handleMenuNavigate}
      onBack={() => navigate("/planner")}
      onStartWorkout={(selectedRoutine) =>
        navigate("/active", {
          state: { routine: selectedRoutine || routine },
        })
      }
    />
  );
}

function CreateRoutineWrapper() {
  const navigate = useNavigate();
  const handleMenuNavigate = useZearaNav();

  return (
    <ZearaCreateRoutine
      onNavigate={handleMenuNavigate}
      onBack={() => navigate("/planner")}
      onSaveRoutine={() => navigate("/planner")}
    />
  );
}

function ActiveWorkoutWrapper({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleMenuNavigate = useZearaNav();
  const routine = location.state?.routine;

  return (
    <ZearaActiveWorkout
      user={user}
      routine={routine}
      onNavigate={handleMenuNavigate}
      onFinishWorkout={() => navigate("/history")}
      onCancelWorkout={() => navigate("/dashboard")}
    />
  );
}

function ExerciseLibraryWrapper({
  user,
  customExercises,
  onAddCustomExercise,
  openModalInitially = false,
}) {
  const navigate = useNavigate();
  const handleMenuNavigate = useZearaNav();

  return (
    <>
      <ZearaExerciseLibrary
        user={user}
        customExercises={customExercises}
        onNavigate={handleMenuNavigate}
        onCreateExercise={() => navigate("/exercises/new")}
        onStartWorkout={() => navigate("/active")}
        onViewExercise={(exercise) =>
          navigate("/exercises/detail", { state: { exercise } })
        }
      />
      <CreateCustomExerciseModal
        isOpen={openModalInitially}
        onClose={() => navigate("/exercises")}
        onSave={(newEx) => {
          onAddCustomExercise(newEx);
          navigate("/exercises");
        }}
      />
    </>
  );
}

function ExerciseDetailWrapper({ user }) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleMenuNavigate = useZearaNav();
  const exercise = location.state?.exercise;

  return (
    <ZearaExerciseDetail
      user={user}
      exercise={exercise}
      onNavigate={handleMenuNavigate}
      onBack={() => navigate("/exercises")}
    />
  );
}

function WorkoutHistoryWrapper({ user }) {
  const handleMenuNavigate = useZearaNav();

  return (
    <ZearaWorkoutHistory
      user={user}
      onNavigate={handleMenuNavigate}
    />
  );
}

function ProgressAnalyticsWrapper({ user }) {
  const handleMenuNavigate = useZearaNav();

  return (
    <ZearaProgressAnalytics
      user={user}
      onNavigate={handleMenuNavigate}
    />
  );
}

function ProfileSettingsWrapper({ user, onUpdateUser }) {
  const handleMenuNavigate = useZearaNav();

  return (
    <ZearaProfileSettings
      user={user}
      onUpdateUser={onUpdateUser}
      onNavigate={handleMenuNavigate}
    />
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("zeara_user");
      return saved ? JSON.parse(saved) : { fullName: "Alex Morgan" };
    } catch {
      return { fullName: "Alex Morgan" };
    }
  });

  const [customExercises, setCustomExercises] = useState([]);
  const [savedExerciseName, setSavedExerciseName] = useState(null);

  useEffect(() => {
    if (!savedExerciseName) return;
    const timer = setTimeout(() => setSavedExerciseName(null), 4000);
    return () => clearTimeout(timer);
  }, [savedExerciseName]);

  const handleAuthSuccess = (userData) => {
    setCurrentUser(userData);
    try {
      localStorage.setItem("zeara_user", JSON.stringify(userData));
    } catch {
      // Abaikan jika storage penuh
    }
  };

  const handleAddCustomExercise = (newEx) => {
    setCustomExercises((prev) => [newEx, ...prev]);
    setSavedExerciseName(newEx.name);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingWrapper />} />
        <Route
          path="/signin"
          element={
            <SignInWrapper
              currentUser={currentUser}
              onAuthSuccess={handleAuthSuccess}
            />
          }
        />
        <Route
          path="/signup"
          element={<SignUpWrapper onAuthSuccess={handleAuthSuccess} />}
        />
        <Route
          path="/dashboard"
          element={<DashboardWrapper user={currentUser} />}
        />
        <Route
          path="/planner"
          element={<PlannerWrapper user={currentUser} />}
        />
        <Route path="/planner/detail" element={<RoutineDetailWrapper />} />
        <Route path="/planner/new" element={<CreateRoutineWrapper />} />
        <Route
          path="/active"
          element={<ActiveWorkoutWrapper user={currentUser} />}
        />
        <Route
          path="/exercises"
          element={
            <ExerciseLibraryWrapper
              user={currentUser}
              customExercises={customExercises}
              onAddCustomExercise={handleAddCustomExercise}
            />
          }
        />
        <Route
          path="/exercises/new"
          element={
            <ExerciseLibraryWrapper
              user={currentUser}
              customExercises={customExercises}
              onAddCustomExercise={handleAddCustomExercise}
              openModalInitially={true}
            />
          }
        />
        <Route
          path="/exercises/detail"
          element={<ExerciseDetailWrapper user={currentUser} />}
        />
        <Route
          path="/history"
          element={<WorkoutHistoryWrapper user={currentUser} />}
        />
        <Route
          path="/analytics"
          element={<ProgressAnalyticsWrapper user={currentUser} />}
        />
        <Route
          path="/settings"
          element={
            <ProfileSettingsWrapper
              user={currentUser}
              onUpdateUser={handleAuthSuccess}
            />
          }
        />
      </Routes>

      {savedExerciseName && (
        <ExerciseSavedSuccessToast
          exerciseName={savedExerciseName}
          onClose={() => setSavedExerciseName(null)}
        />
      )}
    </BrowserRouter>
  );
}