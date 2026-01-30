import type { Challenge } from './types';

export const CHALLENGES: Challenge[] = [
{ Challenge: "Sebutkan dua kebiasaan belajar yang perlu kamu ubah agar prestasi belajarmu meningkat!" },
  { Challenge: "Tuliskan satu kegagalan belajarmu, lalu sebutkan tiga tindakan agar tidak terulang!" },
  { Challenge: "Sebutkan tiga alasan utama mengapa kamu tetap perlu belajar meskipun sedang tidak mood!" },
  { Challenge: "Tuliskan satu strategi belajar yang paling efektif menurut pengalamanmu saat ini!" },
  { Challenge: "Ceritakan pengalamanmu ketika berhasil mengatasi kesulitan dalam belajar!" },
  { Challenge: "Sebutkan satu cara sederhana memberi apresiasi pada diri sendiri setelah belajar!" },
  { Challenge: "Pilih satu mata pelajaran dan jelaskan cara membuatnya lebih menarik!" },
  { Challenge: "Buatkan satu ide kegiatan belajar kreatif yang ingin kamu coba!" },
  { Challenge: "Tuliskan satu komitmen pribadi untuk menciptakan lingkungan belajar yang lebih kondusif!" },
  { Challenge: "Pilih satu tugas sekolah yang tertunda dan komitmen untuk menyelesaikannya hari ini!" },
  { Challenge: "Sebutkan satu alasan kuat mengapa kamu tidak boleh menyerah pada kondisi belajarmu saat ini!" },
  { Challenge: "Tuliskan satu kalimat afirmasi tentang keberhasilan belajar dan bacakan di depan kelompok!" },
  { Challenge: "Buatkan jadwal belajar 20 menit untuk hari ini dan laksanakan langsung!" },
  { Challenge: "Pilih satu kebiasaan buruk saat belajar dan buat aturan pribadi untuk menguranginya!" },
  { Challenge: "Tuliskan satu dorongan internal yang membuatmu tetap sekolah sampai sekarang!" },
  { Challenge: "Tuliskan satu pesan motivasi untuk dirimu sendiri saat kamu mulai malas belajar!" },
  { Challenge: "Tuliskan satu hal positif yang patut kamu hargai dari usaha belajarmu selama ini!" },
  { Challenge: "Bandingkan perasaanmu saat tidak belajar dan saat berhasil menyelesaikan tugas!" },
  { Challenge: "Buat komitmen tertulis pribadi untuk lingkungan belajar yang lebih mendukung mulai hari ini!" },
  { Challenge: "Tentukan satu target mingguan belajar, lalu laporkan progresnya pada anggota kelompok!" },
  { Challenge: "Tentukan waktu belajar paling efektif versimu dan coba hari ini!" },
  { Challenge: "Tuliskan mimpi terbesar yang belum pernah kamu ceritakan pada siapa pun!" },
  { Challenge: "Nyatakan secara lisan: 'Saya ingin masa depan yang lebih baik, maka saya akan belajar'!" },
  { Challenge: "Tuliskan perasaan bangga yang ingin kamu rasakan setelah berhasil nanti!" },
  { Challenge: "Buatkan refleksi tertulis mengenai makna 'berhasil' menurut diri sendiri dalam belajar!" },
  { Challenge: "Tuliskan alasan pribadi mengapa kamu perlu belajar!" },
  { Challenge: "Ceritakan momen di mana kamu merasa bangga atas usahamu menyelesaikan tugas di kelas!" },
  { Challenge: "Tuliskan hal-hal yang sering mengganggu konsentrasimu saat belajar, lalu cari solusinya!" }
];

export function getRandomChallenge(): Challenge {
  const randomIndex = Math.floor(Math.random() * CHALLENGES.length);
  return CHALLENGES[randomIndex];
}