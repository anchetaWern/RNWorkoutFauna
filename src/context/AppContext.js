import React, { useState, useCallback } from "react";

const AppContext = React.createContext();

const AppContextProvider = (props) => {
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [isAddingWorkout, setIsAddingWorkout] = useState(false);

  const [workoutHistory, setWorkoutHistory] = useState([]);

  const value = {
    isAddingExercise,
    setIsAddingExercise,

    isAddingWorkout,
    setIsAddingWorkout,

    workoutHistory,
    setWorkoutHistory,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
