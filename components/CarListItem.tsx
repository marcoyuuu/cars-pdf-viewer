// app/components/CarListItem.tsx

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Car } from '../types/car';
import { ThemedText } from '@/components/ThemedText';

type CarListItemProps = {
  car: Car;
  onPress: () => void;
};

const CarListItem: React.FC<CarListItemProps> = ({ car, onPress }) => {
    return (
        <TouchableOpacity
        style={styles.card}
        onPress={() => {
            console.log(`🟢 Tapped on ${car.name}`);
            onPress();
        }}>
        <ThemedText type="title" style={styles.title}>
            {car.name}
        </ThemedText>
        <ThemedText type="default" style={styles.description}>
            {car.description}
        </ThemedText>
        </TouchableOpacity>
    );
};

export default CarListItem;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f4f4f4',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});
