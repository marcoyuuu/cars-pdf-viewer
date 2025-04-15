// components/CarListItem.tsx

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Car } from '@/types/car';
import { ThemedText } from '@/components/ThemedText';

type Props = {
  car: Car;
  onPress: () => void;
};

export default function CarListItem({ car, onPress }: Props) {
  // Pull bgColor from the car JSON, or fall back to a neutral color
  const backgroundColor = (car as any).bgColor || '#f4f4f4';

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor }]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Use Figma-like typography */}
      <ThemedText type="cardTitle" style={styles.title}>
        {car.name}
      </ThemedText>
      <ThemedText type="cardDescription" style={styles.description}>
        {car.description}
      </ThemedText>

      {/* A right-aligned arrow. Feel free to swap with IconSymbol if you prefer. */}
      <ThemedText style={styles.arrow}>›</ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    position: 'relative',
    // Mild shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.18,
    shadowRadius: 3.0,
    elevation: 3, // for Android
  },
  title: {
    marginBottom: 4,
  },
  description: {
    // Additional styling if needed (e.g., spacing)
  },
  arrow: {
    position: 'absolute',
    right: 16,
    top: '50%',
    fontSize: 24,
    color: '#333',
    transform: [{ translateY: -10 }],
  },
});
