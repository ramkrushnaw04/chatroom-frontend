// context.js

import { createContext } from 'react';

export const Context = createContext();

export function capitalize(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str; // Return as-is for non-string inputs or empty strings
  }
  return str.charAt(0).toUpperCase() + str.slice(1);
}
