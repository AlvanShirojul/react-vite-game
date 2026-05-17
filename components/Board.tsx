
import React from 'react';
import { SNAKES_AND_LADDERS } from '../constants';
import type { Player } from '../types';
import { TILE_COLORS, TileType } from '../game/tiles';
import { BOARD_TILES } from '../game/tiles';
import { TILE_IMAGES } from '../game/tiles'; // Pastikan TILE_IMAGES diimpor

interface BoardProps {
    players: Player[];
    onTileClick?: (position: number) => void;
    highlightedTile?: number;
    onPlayerTokenClick?: (playerId: number | string) => void;
}

const BOARD_DIMENSION = 10;

const boardSquares: number[] = [];
for (let rowIdxFromTop = 0; rowIdxFromTop < BOARD_DIMENSION; rowIdxFromTop++) {
    const row: number[] = [];
    const rowIdxFromBottom = (BOARD_DIMENSION - 1) - rowIdxFromTop;
    const startNum = rowIdxFromBottom * BOARD_DIMENSION + 1;
    for (let j = 0; j < BOARD_DIMENSION; j++) {
        row.push(startNum + j);
    }
    if (rowIdxFromBottom % 2 === 1) {
        row.reverse();
    }
    boardSquares.push(...row);
}

const colorPalette = [
    '#2fd06a', // hijau
    '#facc15', // kuning
    '#3b82f6', // biru
];

const getSquareCoords = (squareNumber: number): { x: number; y: number } => {
    const normalizedNumber = squareNumber - 1;
    const rowFromBottom = Math.floor(normalizedNumber / BOARD_DIMENSION);
    const y = (BOARD_DIMENSION - 1) - rowFromBottom;
    const colOnRow = normalizedNumber % BOARD_DIMENSION;
    let x: number;
    if (rowFromBottom % 2 === 0) {
        x = colOnRow;
    } else {
        x = (BOARD_DIMENSION - 1) - colOnRow;
    }
    return { x, y };
};

interface GamePieceProps {
    player: Player;
    offsetStyle: React.CSSProperties;
}

// FIX: Changed component definition to use React.FC to correctly type props and handle the 'key' prop.
const GamePiece: React.FC<GamePieceProps & { onTokenClick?: (id: number | string) => void }> = ({ player, offsetStyle, onTokenClick }) => {
    const { x, y } = getSquareCoords(player.position);
    
    const containerStyle = {
        left: `${x * 10 + 5}%`, // center of the cell (each cell = 10%)
        top: `${y * 10 + 5}%`,
        transform: 'translate(-50%, -50%)', // center token on the point
        transition: 'left 0.28s ease-in-out, top 0.28s ease-in-out, transform 0.28s ease-in-out',
        zIndex: player.position,
        position: 'absolute' as const,
    };

    const Avatar = player.avatar;
    return (
        <div className={`absolute w-[10%] h-[10%] p-1 min-w-[28px] min-h-[28px] max-w-[64px] max-h-[64px]`} style={{ ...containerStyle, pointerEvents: 'none' }}>
            <div 
                className={`w-full h-full rounded-full shadow-lg flex items-center justify-center text-white border-2 border-white transition-transform duration-300`} 
                style={{ backgroundColor: player.color, ...offsetStyle, pointerEvents: 'auto' }}
                onClick={() => onTokenClick?.(player.id)}
            >
                <Avatar className="w-full h-full p-1" />
            </div>
        </div>
    );
};

const snakeStyles = [
  { fill: 'url(#snakePattern1)', stroke: '#15803d' },
  { fill: 'url(#snakePattern2)', stroke: '#78350f' },
  { fill: 'url(#snakePattern3)', stroke: '#7e22ce' },
  { fill: 'url(#snakePattern4)', stroke: '#1f2937' },
];

const ladderStyles = [
  { stroke: '#92400e', type: 'wood' },
  { stroke: '#082914', type: 'bamboo' },
  { stroke: '#be123c', type: 'red' },
];

interface SnakeProps {
  from: number;
  to: number;
  style: typeof snakeStyles[0];
}

// FIX: Changed component definition to use React.FC to correctly type props and handle the 'key' prop.
const Snake: React.FC<SnakeProps> = ({ from, to, style }) => {
  const start = getSquareCoords(from);
  const end = getSquareCoords(to);
  
  // Koordinat skala grid
    const startX = start.x * 10 + 5;
    const startY = start.y * 10 + 5;
    const endX = end.x * 10 + 5;
    const endY = end.y * 10 + 5;
    const dx = endX - startX;
const dy = endY - startY;
const length = Math.sqrt(dx * dx + dy * dy);
const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 180;

  // Vektor normal untuk kelokan
  const nx = -dy / length;
  const ny = dx / length;

  // KONFIGURASI BENTUK
  const waves = 4;     
  const amplitude = 6;  
  const segments = 120;   // Semakin tinggi semakin mulus
  
  let pointsArray: {x: number, y: number}[] = [];
  let pathData = `M ${startX} ${startY}`;

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    // Menggunakan Sinus untuk kelokan badan
    const waveOffset = Math.sin(t * Math.PI * waves) * amplitude * Math.sin(t * Math.PI);    
    const x = startX + dx * t + nx * waveOffset;
    const y = startY + dy * t + ny * waveOffset;
    
    pointsArray.push({x, y});
    if (i > 0) {
        pathData += ` L ${x} ${y}`;
    }
  }

    return (
        <g filter="url(#snakeShadow)">
      {/* Outline/Garis Luar Badan */}
      <path
        d={pathData}
        fill="none"
        stroke={style.stroke} 
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Isi Badan dengan Pattern Sisik */}
      <path
        d={pathData}
        fill="none"
        stroke={style.fill} // Ini akan memanggil pattern seperti url(#snakePattern1)
        strokeWidth={2.0}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bagian Kepala (Gunakan sudut dinamis) */}
      <g transform={`translate(${startX}, ${startY}) rotate(${angle}) scale(0.8)`}>
        {/* Lidah Bercabang */}
        <path
          d="M 2 0 L 5 0 M 5 0 L 7 -1.5 M 5 0 L 7 1.5"
          stroke="#ce1120"
          strokeWidth={1}
          fill="none"
        />
        
                {/* Bentuk Kepala Oval/Berlian (tanpa border) */}
                <path
                    d="M -1 -2.5 C 2 -3, 4 -2, 4 0 C 4 2, 2 3, -1 2.5 C -2.5 2, -2.5 -2, -1 -2.5 Z"
                    fill={style.fill}
                />

        {/* Mata */}
        <circle cx={1.5} cy={-1.2} r={0.6} fill="#000000" />
        <circle cx={1.5} cy={1.2} r={0.6} fill="#000000" />
      </g>
    </g>
  );
};

interface LadderProps {
  from: number;
  to: number;
  style: typeof ladderStyles[0];
}

// FIX: Changed component definition to use React.FC to correctly type props and handle the 'key' prop.
const Ladder: React.FC<LadderProps> = ({ from, to, style }) => {
    const start = getSquareCoords(from);
    const end = getSquareCoords(to);
    const startX = start.x * 10 + 5;
    const startY = start.y * 10 + 5;
    const endX = end.x * 10 + 5;
    const endY = end.y * 10 + 5;
    const angle = Math.atan2(endY - startY, endX - startX);
    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const numRungs = Math.round(length / 2.5);
    const railOffset = 1.2;
    const rail1X1 = startX - railOffset * Math.sin(angle);
    const rail1Y1 = startY + railOffset * Math.cos(angle);
    const rail1X2 = endX - railOffset * Math.sin(angle);
    const rail1Y2 = endY + railOffset * Math.cos(angle);
    const rail2X1 = startX + railOffset * Math.sin(angle);
    const rail2Y1 = startY - railOffset * Math.cos(angle);
    const rail2X2 = endX + railOffset * Math.sin(angle);
    const rail2Y2 = endY - railOffset * Math.cos(angle);

    return (
        <g stroke={style.stroke} strokeWidth="0.8" strokeLinecap="round">
            <line x1={rail1X1} y1={rail1Y1} x2={rail1X2} y2={rail1Y2} />
            <line x1={rail2X1} y1={rail2Y1} x2={rail2X2} y2={rail2Y2} />
            {Array.from({ length: numRungs }).map((_, i) => {
                const progress = (i + 1) / (numRungs + 1);
                const rungX1 = rail1X1 + progress * (rail1X2 - rail1X1);
                const rungY1 = rail1Y1 + progress * (rail1Y2 - rail1Y1);
                const rungX2 = rail2X1 + progress * (rail2X2 - rail2X1);
                const rungY2 = rail2Y1 + progress * (rail2Y2 - rail2Y1);
                return <line key={i} x1={rungX1} y1={rungY1} x2={rungX2} y2={rungY2} />;
            })}
        </g>
    );
};

const Board = ({ players, onTileClick, highlightedTile, onPlayerTokenClick }: BoardProps) => {
    let snakeIndex = 0;
    let ladderIndex = 0;

    const playerPositions: { [key: number]: Player[] } = {};
    players.forEach(player => {
        if (!playerPositions[player.position]) {
            playerPositions[player.position] = [];
        }
        playerPositions[player.position].push(player);
    });

    let normalIndex = 0;

    return (
    <div className="relative w-[min(90vw,70vh)] h-[min(90vw,70vh)] aspect-square mx-auto grid grid-cols-10 grid-rows-10 gap-px bg-white/50 border-4 border-[#1E459F] rounded-lg overflow-hidden">
        {boardSquares.map((num) => {
            const tileType: TileType = BOARD_TILES[num] ?? TileType.GREEN;
            const finalBgColor = TILE_COLORS[tileType];
            
            // AMBIL GAMBAR: Cek apakah ada gambar untuk nomor kotak ini
            const tileImageUrl = TILE_IMAGES[num]; 

            const textColor =
                finalBgColor === '#CF2A2A'
                    ? 'text-white/90'
                    : finalBgColor === '#FFFFFF'
                    ? 'text-gray-700'
                    : 'text-[#1E459F]/80';

            return (
                <div
                    key={num}
                    style={{ backgroundColor: finalBgColor }}
                    className={`w-full h-full flex flex-col justify-between items-center p-1 relative overflow-hidden ${highlightedTile === num ? 'ring-4 ring-yellow-300 ring-inset' : ''}`}
                    onClick={() => onTileClick?.(num)}
                >
                    {/* 1. Angka Kotak (Posisi di pojok kanan atas) */}
                    <div className="relative z-10 w-full flex justify-end">
                        <span
                            className={`text-[10px] font-bold ${textColor}`}
                        >
                            {num}
                        </span>
                    </div>
                    {/* 2. GAMBAR: Render jika ada datanya di TILE_IMAGES */}
                    {tileImageUrl && (
                        <div className="absolute inset-0 z-0 flex items-center justify-center">                            
                        <img 
                                src={tileImageUrl} 
                                alt="" 
                                className="w-full h-full object-contain opacity-100 pointer-events-none" 
                            />
                        </div>
                    )}
                    
                    {/* Placeholder kosong untuk menjaga spacing flexbox jika tidak ada gambar */}
                    <div className="flex-1"></div>
                </div>
            );
        })}

            <svg viewBox="0 0 100 100" className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <defs>
                    <pattern id="snakePattern1" x="0" y="0" width="2" height="2" patternUnits="userSpaceOnUse">
                      <circle cx="1" cy="1" r="0.8" fill="#15803d" />
                      <circle cx="1" cy="1" r="0.4" fill="#22c55e" />
                    </pattern>
                    <pattern id="snakePattern2" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
                      <path d="M 0 1.5 L 1.5 0 L 3 1.5 L 1.5 3 Z" fill="#78350f" />
                      <path d="M 1.5 1.5 L 2.2 0.8 L 3 1.5 L 2.2 2.2 Z" fill="#b45309" />
                    </pattern>
                    <pattern id="snakePattern3" patternUnits="userSpaceOnUse" width="8" height="4"><path d="M 0 0 H 8 V 4 H 0 Z" fill="#a855f7" /><path d="M -2 0 L 2 4 M 2 0 L 6 4 M 6 0 L 10 4" stroke="#f97316" strokeWidth="1.5" /></pattern>
                    <pattern id="snakePattern4" patternUnits="userSpaceOnUse" width="6" height="6"><path d="M 0 0 H 6 V 6 H 0 Z" fill="#e5e7eb" /><rect width="6" height="3" fill="#4b5563" /></pattern>
                                        {/* Drop shadow filter for snakes */}
                                        <filter id="snakeShadow" x="-50%" y="-50%" width="200%" height="200%">
                                            <feDropShadow dx="0.8" dy="0.8" stdDeviation="1.2" floodColor="#000000" floodOpacity="0.25" />
                                        </filter>
                </defs>
                {Object.entries(SNAKES_AND_LADDERS).map(([start, end]) => {
                    const from = parseInt(start);
                    if (end > from) {
                        const style = ladderStyles[ladderIndex++ % ladderStyles.length];
                        return <Ladder key={`${from}-${end}`} from={from} to={end} style={style} />;
                    } else {
                        const style = snakeStyles[snakeIndex++ % snakeStyles.length];
                        return <Snake key={`${from}-${end}`} from={from} to={end} style={style} />;
                    }
                })}
            </svg>
            
            {players.map((player) => {
                const playersOnSameSquare = playerPositions[player.position];
                const totalOnSquare = playersOnSameSquare ? playersOnSameSquare.length : 0;
                const myIndexOnSquare = playersOnSameSquare ? playersOnSameSquare.findIndex(p => p.id === player.id) : -1;
                
                let offsetStyle: React.CSSProperties = { transform: 'scale(0.9)' };
                if (totalOnSquare > 1) {
                    const angle = (myIndexOnSquare / totalOnSquare) * 2 * Math.PI;
                    const radius = 25; // Percentage offset
                    const xOffset = Math.cos(angle) * radius;
                    const yOffset = Math.sin(angle) * radius;
                    offsetStyle = {
                        transform: `translate(${xOffset}%, ${yOffset}%) scale(${totalOnSquare > 4 ? 0.6 : 0.7})`,
                    };
                }

                return <GamePiece key={player.id} player={player} offsetStyle={offsetStyle} onTokenClick={onPlayerTokenClick} />;
            })}
        </div>
    );
};

export default Board;