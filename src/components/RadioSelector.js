import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

function RadioSelection({ data, selectedValue, setSelectedValue }) {
  return (
    <RadioButton.Group
      onValueChange={(val) => setSelectedValue(val)}
      value={selectedValue}
    >
      <View style={styles.container}>
        {data.map((item) => {
          return (
            <View key={item} style={styles.item}>
              <RadioButton.Android value={item} />
              <Text>{item}</Text>
            </View>
          );
        })}
      </View>
    </RadioButton.Group>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
});

export default RadioSelection;
