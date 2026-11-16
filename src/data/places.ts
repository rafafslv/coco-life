import type { PlaceId } from '../gameLogic';

export type PlaceDefinition = {
  id: PlaceId;
  name: string;
  emoji: string;
  color: number;
  x: number;
  y: number;
  tagline: string;
};

export const PLACES: PlaceDefinition[] = [
  { id: 'home', name: 'Cloud Home', emoji: '🏡', color: 0xffc6a7, x: 480, y: 150, tagline: 'Your cozy little home' },
  { id: 'cafe', name: 'Coco Café', emoji: '🍰', color: 0xffd66e, x: 700, y: 245, tagline: 'A sweet place for treats' },
  { id: 'studio', name: 'Style Studio', emoji: '👒', color: 0xd7b5ff, x: 700, y: 420, tagline: 'Try a brand-new look' },
  { id: 'park', name: 'Petal Park', emoji: '🌷', color: 0x9fdf9b, x: 480, y: 485, tagline: 'Flowers, trees and sunshine' },
  { id: 'garage', name: 'Speed Garage', emoji: '🚗', color: 0x9edcff, x: 260, y: 420, tagline: 'Choose a car and cruise' },
  { id: 'plaza', name: 'Play Plaza', emoji: '🎡', color: 0xffb8d4, x: 260, y: 245, tagline: 'The heart of Coco Life' }
];
