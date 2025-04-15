// app/hooks/useCarData.ts

import { useState, useEffect } from 'react';
import { Car } from '../types/car';

type RawCar = {
  name: string;
  description: string;
  pdfFile: string;
};

interface CarData {
  cars: RawCar[];
}

// Import the raw JSON data from the assets folder.
const rawData: CarData = require('../assets/cars/cars.json');

/**
 * A mapping between PDF file names (as defined in your JSON)
 * and the static asset references using require.
 */
const pdfMapping: Record<string, number> = {
  'lamborghini.pdf': require('../assets/cars/pdfs/lamborghini.pdf'),
  'ferrari.pdf': require('../assets/cars/pdfs/ferrari.pdf'),
  'porsche.pdf': require('../assets/cars/pdfs/porsche.pdf'),
  'mercedes.pdf': require('../assets/cars/pdfs/mercedes.pdf'),
  'gtr.pdf': require('../assets/cars/pdfs/gtr.pdf'),
};

/**
 * Custom hook that loads and transforms car data.
 *
 * This hook maps over raw JSON data, attaches a unique ID,
 * and converts PDF filename strings into static asset references.
 */
export const useCarData = (): { cars: Car[] } => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const mappedCars: Car[] = rawData.cars.map((car, index) => ({
      id: String(index),
      name: car.name,
      description: car.description,
      pdf: pdfMapping[car.pdfFile],
    }));

    setCars(mappedCars);
  }, []);

  return { cars };
};
