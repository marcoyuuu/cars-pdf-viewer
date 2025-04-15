// app/cars/index.tsx

import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { useCarData } from '@/hooks/useCarData';
import { Car } from '../../../types/car';
import CarListItem from '../../../components/CarListItem';

export default function CarListScreen() {
  const { cars } = useCarData();
  const router = useRouter();

  const handlePress = (car: Car) => {
    router.push(`/(tabs)/cars/${car.id}`);
  };
  
  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CarListItem car={item} onPress={() => handlePress(item)} />
        )}
        contentContainerStyle={styles.listContent}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
});
