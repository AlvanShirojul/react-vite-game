
import React from 'react';
import { SNAKES_AND_LADDERS } from '../constants';
import type { Player } from '../types';
import { TILE_COLORS, TileType } from '../game/tiles';
import { BOARD_TILES } from '../game/tiles';
import { TILE_IMAGES } from '../game/tiles'; // Pastikan TILE_IMAGES diimpor

interface BoardProps {
    players: Player[];
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
const GamePiece: React.FC<GamePieceProps> = ({ player, offsetStyle }) => {
    const { x, y } = getSquareCoords(player.position);
    
    const containerStyle = {
        transform: `translate(${x * 100}%, ${y * 100}%)`,
        transition: 'transform 0.3s ease-in-out',
        zIndex: player.position,
    };

    const Avatar = player.avatar;
    return (
        <div className={`absolute w-[10%] h-[10%] p-1`} style={containerStyle}>
            <div 
                className={`w-full h-full rounded-full shadow-lg flex items-center justify-center text-white border-2 border-white transition-transform duration-300`} 
                style={{ backgroundColor: player.color, ...offsetStyle }}
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
    const startX = start.x * 10 + 3;
    const startY = start.y * 10 + 8;
    const endX = end.x * 10 + 5;
    const endY = end.y * 10 + 5;
    const dx = endX - startX;
const dy = endY - startY;
const length = Math.sqrt(dx * dx + dy * dy);

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
    <g>
      {/* BADAN UTAMA */}
          <path
      d={pathData}
      fill="none"
      stroke={'black'}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity ='50'
    />
      <path
        d={pathData}
        fill="none"
        stroke={style.fill} // Warna Hijau (#6d965e dari gambar)
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* KEPALA ULAR (Di ujung 'TO') */}
        <g transform={`translate(${startX}, ${startY}) rotate(280) scale(0.75)`}>        
            {/* Lidah Bercabang */}
        <path
          d="M 2 0 L 5 0 M 5 0 L 7 -1.5 M 5 0 L 7 1.5"
          stroke="#ce1120"
          strokeWidth={1}
          fill="none"
        />
        
        {/* Bentuk Kepala Oval/Berlian */}
        <path
          d="M -1 -2.5 C 2 -3, 4 -2, 4 0 C 4 2, 2 3, -1 2.5 C -2.5 2, -2.5 -2, -1 -2.5 Z"
          fill={style.fill}
          stroke="#2c2e2c"
          strokeWidth={0.5}
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

const Board = ({ players }: BoardProps) => {
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
    <div className="relative w-full h-full grid grid-cols-10 grid-rows-10 gap-px bg-white/50">
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
                    className="w-full h-full flex flex-col justify-between items-center p-1 relative overflow-hidden"
                >
                    {/* 1. Angka Kotak (Posisi di pojok kanan atas) */}
                    <div className="w-full flex justify-end">
                        <span className={`text-[10px] font-bold ${textColor}`}>{num}</span>
                    </div>

                    {/* 2. GAMBAR: Render jika ada datanya di TILE_IMAGES */}
                    {tileImageUrl && (
                        <div className="absolute inset-0 flex items-center justify-center ">
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
                    <pattern id="snakePattern1" patternUnits="userSpaceOnUse" width="4" height="4"><path d="M 0 0 H 4 V 4 H 0 Z" fill="#22c55e" /><circle cx="2" cy="2" r="1.2" fill="#fef08a" /></pattern>
                    <pattern id="snakePattern2" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)"><path d="M 0 0 H 6 V 6 H 0 Z" fill="#a16207" /><rect x="0" y="0" width="3" height="3" fill="#522c06" /><rect x="3" y="3" width="3" height="3" fill="#522c06" /></pattern>
                    <pattern id="snakePattern3" patternUnits="userSpaceOnUse" width="8" height="4"><path d="M 0 0 H 8 V 4 H 0 Z" fill="#a855f7" /><path d="M -2 0 L 2 4 M 2 0 L 6 4 M 6 0 L 10 4" stroke="#f97316" strokeWidth="1.5" /></pattern>
                    <pattern id="snakePattern4" patternUnits="userSpaceOnUse" width="6" height="6"><path d="M 0 0 H 6 V 6 H 0 Z" fill="#e5e7eb" /><rect width="6" height="3" fill="#4b5563" /></pattern>
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

                return <GamePiece key={player.id} player={player} offsetStyle={offsetStyle} />;
            })}
        </div>
    );
};

export default Board;