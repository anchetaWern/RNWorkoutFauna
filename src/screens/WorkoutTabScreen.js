import React, { useState } from "react";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import WorkoutScreen from "./WorkoutScreen";
import WorkoutHistoryScreen from "./WorkoutHistoryScreen";

const Tab = createMaterialTopTabNavigator();

function WorkoutTabScreen({ route }) {
  return (
    <Tab.Navigator>
      <Tab.Screen
        initialParams={route.params}
        name="CurrentWorkout"
        options={{
          title: "Today",
        }}
        component={WorkoutScreen}
      />
      <Tab.Screen
        initialParams={route.params}
        name="WorkoutHistory"
        options={{
          title: "History",
        }}
        component={WorkoutHistoryScreen}
      />
    </Tab.Navigator>
  );
}

export default WorkoutTabScreen;
