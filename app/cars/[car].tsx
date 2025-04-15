// app/cars/[car].tsx

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import { ThemedView } from '@/components/ThemedView';
import { useCarData } from '@/hooks/useCarData';
import { Car } from '../../types/car';

export default function CarPDFViewer() {
  // Retrieve the dynamic route parameter (car ID) from Expo Router.
  const { car: carId } = useLocalSearchParams<{ car: string }>();
  const { cars } = useCarData();
  const [sourceUri, setSourceUri] = useState<string | null>(null);

  // Find the specific car using the provided id.
  const selectedCar: Car | undefined = cars.find((item) => item.id === carId);

  useEffect(() => {
    async function preparePDF() {
      if (selectedCar) {
        // Resolve the static asset for the PDF using Expo Asset.
        const asset = Asset.fromModule(selectedCar.pdf);
        // If the asset does not have a local URI, force download.
        if (!asset.localUri) {
          try {
            await asset.downloadAsync();
          } catch (error) {
            console.error('Error downloading PDF asset:', error);
          }
        }
        // Use the localUri if available, otherwise fall back to asset.uri.
        setSourceUri(asset.localUri || asset.uri);
      }
    }
    preparePDF();
  }, [selectedCar]);

  // If no matching car is found or the asset hasn't resolved yet, show a loading indicator.
  if (!selectedCar || !sourceUri) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <WebView
        source={{ uri: sourceUri }}
        style={styles.webview}
        originWhitelist={['*']}
        // Optionally include additional props for handling PDF zoom and navigation.
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
