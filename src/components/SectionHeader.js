import React from "react";
import { View, Text, StyleSheet } from "react-native";

function SectionHeader({ theme, text }) {
  const { fonts } = theme;

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: fonts.regular }}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});

export default SectionHeader;
