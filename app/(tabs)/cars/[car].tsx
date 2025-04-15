import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { WebView } from 'react-native-webview';
import { Asset } from 'expo-asset';
import { ThemedView } from '@/components/ThemedView';
import { useCarData } from '@/hooks/useCarData';
import { Car } from '../../../types/car';

export default function CarPDFViewer() {
  // Retrieve the dynamic route parameter (car ID) from Expo Router.
  const { car: carId } = useLocalSearchParams<{ car: string }>();
  const { cars } = useCarData();
  const [sourceUri, setSourceUri] = useState<string | null>(null);

  // Find the specific car using the provided id.
  const selectedCar: Car | undefined = cars.find((item) => item.id === carId);

  useEffect(() => {
    if (selectedCar) {
      // Resolve the static asset using Expo Asset. 
      // `require()` returns a numeric reference which is resolved to a URI.
      const asset = Asset.fromModule(selectedCar.pdf);
      if (asset.uri) {
        setSourceUri(asset.uri);
      }
    }
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
