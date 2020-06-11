import React from 'react';

export interface Settings {
  idxMap: number[];
  setIdxMap: React.Dispatch<number[]>;
}

export const defaultSettings: Settings = {
  idxMap: (new Array(200)).fill(undefined).map((_, idx) => idx),
  setIdxMap: () => (new Array(200)).fill(undefined).map((_, idx) => idx),
};

const ConfigContext = React.createContext<Settings>(defaultSettings);

export default ConfigContext;
