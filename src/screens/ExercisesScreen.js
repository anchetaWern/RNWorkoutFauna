import React, { useState, useEffect, useContext } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { List, withTheme } from "react-native-paper";

import AddExerciseModal from "../components/AddExerciseModal";

import { getExercises, getWorkoutsByExercise, saveExercise } from "../data";

import { AppContext } from "../context/AppContext";

import { groupWorkouts } from "../helpers/DataFormatter";

function ExercisesScreen({ navigation, theme }) {
  const { fonts, colors } = theme;

  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);

  const [searchExercise, setSearchExercise] = useState("");

  const {
    isAddingExercise,
    setIsAddingExercise,
    setWorkoutHistory,
  } = useContext(AppContext);

  useEffect(() => {
    getExercises().then((res) => {
      setExercises(res);
      setFilteredExercises(res);
    });
  }, []);

  useEffect(() => {
    const filtered = exercises.filter((item) => {
      return item.data.name.startsWith(searchExercise);
    });

    setFilteredExercises(filtered);
  }, [searchExercise]);

  const createExercise = (name, category, primary_muscle) => {
    saveExercise(name, category, primary_muscle).then(() => {
      getExercises().then((res) => {
        setExercises(res);
        setFilteredExercises(res);
      });
    });

    setIsAddingExercise(false);
  };

  const gotoWorkoutScreen = (item_id, item_data) => {
    getWorkoutsByExercise(item_id).then((res) => {
      const grouped_workouts = groupWorkouts(res);
      setWorkoutHistory(grouped_workouts);
    });

    navigation.navigate("Workout", {
      screen: "CurrentWorkout",
      params: {
        exercise_id: item_id,
        exercise: item_data,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.searchContainer]}>
        <TextInput
          value={searchExercise}
          placeholder="Search Exercise"
          onChangeText={(text) => setSearchExercise(text)}
          style={[styles.input, { backgroundColor: colors.white }]}
        />
      </View>

      <View style={styles.box}>
        {filteredExercises.map((item) => {
          return (
            <List.Item
              title={item.data.name}
              description={item.data.muscle}
              key={item.data.name}
              onPress={() => gotoWorkoutScreen(item.ref.id, item.data)}
            />
          );
        })}
      </View>

      <AddExerciseModal
        isAddingExercise={isAddingExercise}
        setIsAddingExercise={setIsAddingExercise}
        createExercise={createExercise}
      />
    </View>
  );
}

export default withTheme(ExercisesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  box: {
    marginTop: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    height: 50,
    fontSize: 16,
  },
});
