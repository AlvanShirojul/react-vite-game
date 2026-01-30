
import React from 'react';

export type GameStatus =
    | 'NOT_STARTED'
    | 'IN_PROGRESS'
    | 'GAME_OVER';

export interface Avatar {
  name: string;
  component: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface Player {
    id: number;
    position: number;
    avatar: Avatar['component'];
    color: string;
    name: string;
    stepsToMove?: number;
    moveDirection?: 1 | -1;
}

export interface Question {
    question: string;
    options: string[];
    answer: string;
}
export interface Challenge {
    Challenge: string;
}
