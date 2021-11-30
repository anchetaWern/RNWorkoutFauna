import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import { Button, IconButton, withTheme } from "react-native-paper";

import { useRoute } from "@react-navigation/native";

import SetItem from "../components/SetItem";

import {
  saveWorkout,
  updateWorkout,
  deleteWorkout,
  getWorkoutsByExercise,
} from "../data";

import { groupWorkouts, filterTodaysWorkout } from "../helpers/DataFormatter";

import { AppContext } from "../context/AppContext";

function WorkoutScreen({ navigation, theme }) {
  const route = useRoute();

  const { colors, fonts } = theme;

  const {
    isAddingWorkout,
    setIsAddingWorkout,
    workoutHistory,
    setWorkoutHistory,
  } = useContext(AppContext);

  const [selectedSet, setSelectedSet] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [weight, setWeight] = useState(0);
  const [reps, setReps] = useState(0);

  const [todaysWorkout, setTodaysWorkout] = useState([]);

  const currentAction = selectedIndex !== null ? "Update" : "Add";
  const disableDelete = selectedIndex !== null ? false : true;

  const syncWorkoutHistory = () => {
    getWorkoutsByExercise(route.params.params.exercise_id).then((res) => {
      const grouped_workouts = groupWorkouts(res);
      setWorkoutHistory(grouped_workouts);
    });
  };

  const saveAction = () => {
    if (selectedIndex !== null) {
      updateWorkout(selectedSet.id, weight, reps).then(() =>
        syncWorkoutHistory()
      );
    } else {
      if (route.params) {
        saveWorkout(route.params.params.exercise_id, weight, reps).then(() =>
          syncWorkoutHistory()
        );
      }
    }
  };

  const deleteSet = () => {
    deleteWorkout(selectedSet.id).then(() => syncWorkoutHistory());
  };

  const increment = (type, value) => {
    if (type === "weight") {
      setWeight(weight + 1);
    } else if (type === "reps") {
      setReps(reps + 1);
    }
  };

  const decrement = (type, value) => {
    if (value >= 1) {
      if (type === "weight") {
        setWeight(value - 1);
      } else if (type === "reps") {
        setReps(value - 1);
      }
    }
  };

  const selectSet = (item, index) => {
    setSelectedSet(item);
    setSelectedIndex(index);

    setWeight(parseInt(item.weight));
    setReps(parseInt(item.reps));
  };

  useEffect(() => {
    if (route.params) {
      syncWorkoutHistory();

      setSelectedSet(null);
      setSelectedIndex(null);
      setWeight(0);
      setReps(0);
    }
  }, [route.params]);

  useEffect(() => {
    if (workoutHistory) {
      const todays_workout = filterTodaysWorkout(workoutHistory);
      setTodaysWorkout(todays_workout);
    }
  }, [workoutHistory]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.field}>
          <Text>WEIGHT (LB)</Text>
          <View style={styles.inputContainer}>
            <IconButton
              icon="minus"
              size={fonts.icon}
              style={{ backgroundColor: colors.background }}
              onPress={() => decrement("weight", weight)}
            />

            <TextInput
              keyboardType="number-pad"
              style={[styles.input, { fontSize: fonts.big }]}
              onChangeText={(text) => setWeight(text)}
              value={weight.toString()}
            />

            <IconButton
              icon="plus"
              size={fonts.icon}
              style={{ backgroundColor: colors.background }}
              onPress={() => increment("weight", weight)}
            />
          </View>
        </View>

        <View style={styles.field}>
          <Text>REPS</Text>
          <View style={styles.inputContainer}>
            <IconButton
              icon="minus"
              size={fonts.icon}
              style={{ backgroundColor: colors.background }}
              onPress={() => decrement("reps", reps)}
            />

            <TextInput
              keyboardType="number-pad"
              style={[styles.input, { fontSize: fonts.big }]}
              onChangeText={(text) => setReps(text)}
              value={reps.toString()}
            />

            <IconButton
              icon="plus"
              size={fonts.icon}
              style={{ backgroundColor: colors.background }}
              onPress={() => increment("reps", reps)}
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button color={colors.text} onPress={() => saveAction()}>
          {currentAction}
        </Button>

        <Button
          labelStyle={{ color: colors.text }}
          disabled={disableDelete}
          onPress={() => deleteSet()}
        >
          Delete
        </Button>
      </View>

      <View style={styles.setContainer}>
        {todaysWorkout.map((item, index) => {
          const isSelected = index === selectedIndex;
          return (
            <SetItem
              item={item}
              index={index}
              key={index}
              onPress={() => {
                selectSet(item, index);
              }}
              isSelected={isSelected}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

export default withTheme(WorkoutScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  field: {
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
  },
  input: {
    width: 60,
    textAlign: "center",
  },
  iconButton: {
    backgroundColor: "#ccc",
  },
  buttonContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  setContainer: {
    marginTop: 30,
  },
});
