
import fs from 'fs';
import path from 'path';
import usersData from '@/data/users.json';

// Define the type for a single user
export type User = (typeof usersData)[0];

export function loadUsers(): User[] {
  // In production or when the file cannot be read dynamically, use the static import.
  try {
    // Read the file dynamically to get the latest content, especially in development.
    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
    const jsonText = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Não foi possível ler o users.json dinamicamente, usando fallback estático.", error);
    // Fallback to the statically imported data if dynamic reading fails.
    return usersData;
  }
}

    