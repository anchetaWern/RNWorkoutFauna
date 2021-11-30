import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { withTheme } from "react-native-paper";

function SetItem({ index, item, theme, onPress, isSelected }) {
  const { fonts, colors } = theme;
  const bgColor = isSelected ? colors.background : colors.default;

  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[styles.container, { backgroundColor: bgColor, padding: 10 }]}
      >
        <View style={[styles.index, { backgroundColor: colors.background }]}>
          <Text style={{ fontSize: fonts.big }}>{index + 1}</Text>
        </View>

        <View style={styles.inline}>
          <Text style={{ fontSize: fonts.big }}>{item.weight}</Text>
          <Text style={{ fontSize: fonts.small, color: colors.text }}> lb</Text>
        </View>

        <View style={styles.inline}>
          <Text style={{ fontSize: fonts.big }}>{item.reps}</Text>
          <Text style={{ fontSize: fonts.small, color: colors.text }}>
            {" "}
            reps
          </Text>
        </View>

        <View></View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingLeft: 20,
  },
  index: {
    width: 40,
    padding: 5,
    borderRadius: 40,
    alignItems: "center",
  },
  inline: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
});

export default withTheme(SetItem);
