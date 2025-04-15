/// app/(tabs)/cars.tsx

import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { useCarData } from '@/hooks/useCarData';
import { Car } from '@/types/car';
import CarListItem from '@/components/CarListItem';

export default function CarListScreen() {
  const { cars } = useCarData();
  const router = useRouter();

  const handlePress = (car: Car) => {
    router.push(`/cars/${car.id}` as const);
  };

  return (
    <ThemedView style={styles.container}>
      {/* Figma-like Header */}
      <Text style={styles.header}>Cars</Text>

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
    backgroundColor: '#fff', 
    paddingTop: 40,    // Enough top padding for a simple header
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 32,
  },
});
