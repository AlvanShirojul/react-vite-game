// rules.ts
import { TileType } from './tiles';
import type { Player } from '../types';

export type InteractionType = 'question' | 'challenge';

export interface TileEventResult {
  newPosition: number;
  interaction?: { type: InteractionType; };
  bonusTurnOnSuccess?: boolean;
  penaltyOnFailure?: number;
  message?: string;
  triggerInteraction?: InteractionType; 
}

export function applyTileRule(tileType: TileType, player: Player): TileEventResult {
  switch (tileType) {
    case TileType.BLUE:
      return {
        newPosition: player.position,
        triggerInteraction: 'question', // Digunakan oleh App.tsx untuk memicu modal
        interaction: { type: 'question' },
        bonusTurnOnSuccess: true,
        penaltyOnFailure: 1,
        message: `${player.name}, jawab pertanyaannya!`,
      };

    case TileType.YELLOW:
      return {
        newPosition: player.position,
        triggerInteraction: 'challenge', // Digunakan oleh App.tsx untuk memicu modal
        interaction: { type: 'challenge' },
        bonusTurnOnSuccess: true,
        penaltyOnFailure: 2,
        message: `${player.name}, lakukan tantangannya!`,
      };

    case TileType.GREEN:
      return {
        // Maju 1 langkah, maksimal ke kotak 100
        newPosition: Math.min(player.position + 1, 100),
        message: `${player.name} mendarat di kotak Hijau! Maju 1 langkah!`,
      };

    default:
      return {
        newPosition: player.position,
      };
  }
}