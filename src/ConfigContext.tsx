import React from 'react';

export interface Settings {
  yearRange: [number, number];
  priceRange: [number, number];
  setYearRange: React.Dispatch<[number, number]>;
  setPriceRange: React.Dispatch<[number, number]>;
}

export const defaultSettings: Settings = {
  yearRange: [2004, 2020],
  priceRange: [0, 33],
  setYearRange: () => [2004, 2020],
  setPriceRange: () => [0, 33],
};

const ConfigContext = React.createContext<Settings>(defaultSettings);

export default ConfigContext;
