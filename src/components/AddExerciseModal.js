import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  IconButton,
  Modal,
  Portal,
  Provider,
  withTheme,
} from "react-native-paper";

import SectionHeader from "./SectionHeader";
import RadioSelector from "./RadioSelector";

import { categories, muscles } from "../data";

function AddExerciseModal({
  theme,
  isAddingExercise,
  setIsAddingExercise,
  isAddingExercisecreateExercise,
  createExercise,
}) {
  const { colors, fonts } = theme;

  const [name, setName] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [primary_muscle, setPrimaryMuscle] = useState(muscles[0]);

  return (
    <Provider>
      <Portal>
        <Modal
          visible={isAddingExercise}
          onDismiss={setIsAddingExercise}
          contentContainerStyle={[
            {
              backgroundColor: colors.white,
            },
            styles.modal,
          ]}
        >
          <React.Fragment>
            <View>
              <View style={styles.headerContainer}>
                <Text style={{ fontSize: fonts.big }}>Add Exercise</Text>

                <IconButton
                  icon="close"
                  color={colors.text}
                  size={fonts.icon}
                  onPress={() => setIsAddingExercise(false)}
                />
              </View>

              <SectionHeader theme={theme} text="Exercise Name" />

              <TextInput
                mode="flat"
                underlineColor={colors.white}
                theme={{ roundness: 0 }}
                style={styles.input}
                onChangeText={(text) => setName(text)}
                value={name}
              />

              <View style={styles.sectionContainer}>
                <SectionHeader theme={theme} text="Category" />
                <RadioSelector
                  data={categories}
                  selectedValue={category}
                  setSelectedValue={setCategory}
                />
              </View>

              <View style={styles.sectionContainer}>
                <SectionHeader theme={theme} text="Muscle" />
                <RadioSelector
                  data={muscles}
                  selectedValue={primary_muscle}
                  setSelectedValue={setPrimaryMuscle}
                />
              </View>

              <View style={styles.box}>
                <Button
                  onPress={() => {
                    createExercise(name, category, primary_muscle);

                    setName("");
                    setCategory(categories[0]);
                    setPrimaryMuscle(muscles[0]);

                    Alert.alert("Created", "Exercise Created!");
                  }}
                >
                  Create Exercise
                </Button>
              </View>
            </View>
          </React.Fragment>
        </Modal>
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  modal: {
    padding: 20,
  },
  headerContainer: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionContainer: {
    marginTop: 20,
  },
  box: {
    marginTop: 20,
  },
  input: {
    fontSize: 15,
    height: 58,
    width: "100%",
    marginBottom: 10,
    marginTop: 6,
  },
});

export default withTheme(AddExerciseModal);
