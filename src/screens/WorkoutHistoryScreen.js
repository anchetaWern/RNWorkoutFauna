import React, { useState, useContext } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { withTheme } from "react-native-paper";

import { fromUnixTime, format } from "date-fns";

import { AppContext } from "../context/AppContext";

import SetItem from "../components/SetItem";

import { getWorkoutsByExercise } from "../data";

function WorkoutHistoryScreen({ theme }) {
  const { fonts } = theme;

  const { workoutHistory } = useContext(AppContext);

  return (
    <ScrollView style={styles.container}>
      {Object.keys(workoutHistory)
        .reverse()
        .map((key, date) => {
          const day_workouts = workoutHistory[key];

          const formatted_date = format(
            fromUnixTime(day_workouts[0]["time_created"]),
            "yyyy, MMMM dd"
          );

          return (
            <View style={styles.card} key={date}>
              <View style={styles.sectionHeader}>
                <Text style={{ fontSize: fonts.regular }}>
                  {formatted_date}
                </Text>
              </View>

              <View>
                {day_workouts.map((item, index) => {
                  return <SetItem item={item} index={index} key={index} />;
                })}
              </View>
            </View>
          );
        })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  card: {
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 10,
  },
});

export default withTheme(WorkoutHistoryScreen);
