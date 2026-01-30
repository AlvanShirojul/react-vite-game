// =======================
// 1️⃣ ENUM TILE TYPE
// =======================
export enum TileType {
  GREEN,
  BLUE,
  YELLOW,
  SNAKE_HEAD,
  LADDER_START,
}

// =======================
// 2️⃣ WARNA TIAP TILE
// =======================
export const TILE_COLORS: Record<TileType, string> = {
  [TileType.YELLOW]: '#ffd932',
  [TileType.BLUE]: '#6499ec',
  [TileType.GREEN]: '#52cd5a',
  [TileType.SNAKE_HEAD]: '#f15e5e',
  [TileType.LADDER_START]: '#f5f5f5',
};

// =======================
// 3️⃣ POSISI KHUSUS
// =======================
const SNAKE_HEADS = [17, 12, 54, 62, 99, 95, 64];
const LADDER_STARTS = [4, 10, 71, 21, 36, 55, 79, 51];

const RESERVED = new Set<number>([
  ...SNAKE_HEADS,
  ...LADDER_STARTS,
]);

// =======================
// 4️⃣ GENERATOR TILE ACAK
// =======================
function generateBoardTiles(): Record<number, TileType> {
  const result: Record<number, TileType> = {};

  // snake & ladder
  SNAKE_HEADS.forEach(n => { result[n] = TileType.SNAKE_HEAD; });
  LADDER_STARTS.forEach(n => { result[n] = TileType.LADDER_START; });

  const candidates = Array.from({ length: 100 }, (_, i) => i + 1)
    .filter(n => !RESERVED.has(n));

  // shuffle (Fisher–Yates)
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  let idx = 0;

  // 🟢 15 Hijau (Maju 1 langkah)
  for (let i = 0; i < 15; i++) {
    result[candidates[idx++]] = TileType.GREEN;
  }

  // 🔵 35 Biru (Question)
  for (let i = 0; i < 35; i++) {
    result[candidates[idx++]] = TileType.BLUE;
  }

  // 🟡 Sisanya Kuning (Challenge)
  while (idx < candidates.length) {
    result[candidates[idx++]] = TileType.YELLOW;
  }

  return result;
}

export const BOARD_TILES: Record<number, TileType> = generateBoardTiles();

export const TILE_IMAGES: Record<number, string> = {
  4 : '/images/Buku.png',   // Kotak 10 akan selalu punya gambar buku
  9 : '/images/Lampu.png',  // Kotak 25 akan selalu punya gambar lampu
  51: '/images/Tangan.png',
  1 : '/images/Start.png',
  100 :'/images/Finish.png',
  76 : '/images/Never.png',
  45: '/images/Tengkorak.png',
  89: '/images/Bingkai1.png',
  88: '/images/Bingkai2.png',
  72: '/images/Bingkai3.png',
  73: '/images/Bingkai4.png' // Tambahkan nomor kotak dan path gambarnya di sini
};