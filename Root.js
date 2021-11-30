import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { Button, withTheme } from "react-native-paper";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import ExercisesScreen from "./src/screens/ExercisesScreen";
import WorkoutTabScreen from "./src/screens/WorkoutTabScreen";

import { AppContext } from "./src/context/AppContext";

const Tab = createBottomTabNavigator();

function getHeaderTitle(route) {
  if (route.params) {
    const exercise_name = route.params.params.exercise.name;
    return exercise_name.length > 25
      ? exercise_name.substr(0, 25) + ".."
      : exercise_name;
  }

  return "Workout";
}

function Root({ theme }) {
  const { colors, fonts } = theme;

  const { setIsAddingExercise, setIsAddingWorkout } = useContext(AppContext);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Exercises"
          component={ExercisesScreen}
          options={{
            tabBarLabel: "Exercises",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="dumbbell"
                color={colors.gray}
                size={fonts.icon}
              />
            ),

            headerRight: () => (
              <Button
                icon="plus"
                color={colors.text}
                onPress={() => setIsAddingExercise(true)}
              >
                Add
              </Button>
            ),
          }}
        />

        <Tab.Screen
          name="Workout"
          options={({ route, navigation }) => ({
            tabBarLabel: "Workout",
            headerTitle: getHeaderTitle(route),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="weight-lifter"
                color={colors.gray}
                size={fonts.icon}
              />
            ),
            headerRight: () => (
              <Button
                icon="plus"
                color={colors.text}
                onPress={() => navigation.navigate("Exercises")}
              >
                Add
              </Button>
            ),
          })}
          component={WorkoutTabScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default withTheme(Root);
