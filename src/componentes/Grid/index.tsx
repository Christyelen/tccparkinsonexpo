import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-paper';

const Grid = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={styles.col}>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={3}
    />
  );
};

const styles = StyleSheet.create({
  col: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
  },
});

export default Grid;
