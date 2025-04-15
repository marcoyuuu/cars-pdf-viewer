// app/types/car.ts

/**
 * Defines the structure of a car object for the app.
 * The `pdf` property is a static asset reference returned from require.
 */
export interface Car {
    id: string;
    name: string;
    description: string;
    pdf: number; // This uses a number type since require() returns a numeric identifier
  }
  