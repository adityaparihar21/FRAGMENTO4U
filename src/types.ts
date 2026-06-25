/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'pour' | 'fold';
  tags?: string[];
  image?: string;
  elevation?: string;
  origin?: string;
  tastingNotes?: string[];
  customizable?: boolean;
}

export interface CartItem {
  id: string; // unique item instance id (including customizations)
  menuItem: MenuItem;
  quantity: number;
  customizations?: {
    milk?: 'Oat' | 'Almond' | 'Whole' | 'None';
    grind?: 'Whole Bean' | 'Fine (Espresso)' | 'Medium (Filter)' | 'Coarse (French Press)';
    notes?: string;
  };
}

export interface LotMeta {
  origin: string;
  subRegion: string;
  elevation: string;
  process: string;
  score: string;
  roastLevel: string;
  varietal: string;
  notes: string[];
}

export interface RitualStep {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  image?: string;
}

export interface PreOrder {
  id: string;
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  pickupTime: string;
  specialInstructions?: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'ready';
  createdAt: string;
}

export interface UserProfile {
  name: string;
  phone: string;
  email?: string;
  isLoggedIn: boolean;
}

