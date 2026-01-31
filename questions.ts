
import type { Question } from './types';

export const QUESTIONS: Question[] = [
{ question: "Kalau kamu ingin menjadi siswa yang berprestasi, langkah pertama apa yang akan dilakukan minggu ini?" },
{ question: "Bayangkan nilai ulangan kurang memuaskan. Apa yang membuatmu termotivasi memperbaiki?" },
{ question: "Menurut kamu, gimana sih bentuk “sukses” dalam belajar versi diri sendiri?" },
{ question: "Siapa orang yang memotivasi kamu untuk semangat belajar?" },
{ question: "Kalau kamu berhasil mencapai target belajarmu, hadiah apa yang akan diberikan untuk diri sendiri?" },
{ question: "Apa alasan utama yang membuatmu merasa perlu belajar dengan sungguh-sungguh?" },
{ question: "Mengapa penting untuk tetap belajar walaupun tidak ada ujian atau tugas?" },
{ question: "Menurut kamu, mengapa belajar itu penting buat masa depan?" },
{ question: "Mata pelajaran apa yang kamu anggap paling sulit?" },
{ question: "Ketika kamu lagi malas belajar, cara paling efektif apa yang dilakukan untuk menumbuhkan semangat kembali?" },
{ question: "Ketika kamu mengalami kegagalan dalam belajar (misalnya memperoleh nilai yang kurang memuaskan), apakah akan berhenti berusaha?" },
{ question: "Apa yang membuat kamu tetap semangat belajar meskipun tugas menumpuk?" },
{ question: "Setelah lulus SMA, kamu ingin jadi apa? Apakah gaya belajar sekarang bisa bantu meraih cita-cita?" },
{ question: "Kalau suatu hari kamu berhasil mewujudkan cita-citamu, gimana caramu ngerayain dan ngasih apresiasi ke diri sendiri?" },
{ question: "Mata pelajaran apa yang menurut kamu paling mendukung tercapainya cita-cita di masa depan?" },
{ question: "Coba bayangin deh, kalau kamu belajar rajin dan konsisten selama satu tahun penuh, perubahan keren apa yang ingin dilihat dari diri sendiri?" },
{ question: "Kalau kerja kerasmu di sekolah akhirnya bener-bener berhasil, kira-kira gimana perasaanmu saat itu?" },
{ question: "Bagaimana perasaan kamu ketika guru atau teman memberikan pujian atas usaha belajarmu?" },
{ question: "Dalam belajar, kamu lebih senang mendapat nilai tinggi atau mengetahui bahwa sudah berusaha maksimal namun hasilnya tidak memuaskan? Mengapa?" },
{ question: "Bagaimana cara menunjukkan penghargaan kepada teman yang berusaha keras dalam belajar?" },
{ question: "Pernahkah kamu memberikan semangat untuk teman yang sedang malas belajar? Jika pernah, bagaimana hasilnya?" },
{ question: "Kalau berhasil ngerjain tugas yang sulit, biasanya kamu ngasih apresiasi apa buat diri sendiri?" },
{ question: "Penghargaan seperti apa yang membuatmu jadi lebih rajin belajar?" },
{ question: "Menurut kamu, hal apa yang dilakukan ketika menyadari nilai pelajaran mulai menurun?" },
{ question: "Saat melihat teman meraih prestasi, hal apa yang membuat kamu ikut termotivasi untuk belajar lebih giat?" },
{ question: "Menurutmu, jadwal belajar seperti apa yang ideal supaya belajar tetap efektif tapi tidak terasa berat?" },
{ question: "Menurutmu, bentuk penghargaan apa yang paling memotivasimu untuk belajar lebih giat?" },
{ question: "Bagaimana sikap guru yang menurutmu mampu menumbuhkan motivasi belajar di kelas?" },
{ question: "Apa pengaruh lingkungan keluarga terhadap semangat belajarmu setiap hari?" },
{ question: "Bagaimana peran teman sebaya dalam membantu menjaga semangat belajar?" },
{ question: "Seperti apa suasana kelas yang membuatmu nyaman untuk belajar?" },
{ question: "Menurutmu, bagaimana pelajaran bisa dibuat lebih menarik agar mudah dipahami?" },
{ question: "Bagaimana perasaanmu ketika proses pembelajaran guru menjelaskan materi menggunakan video pembelajaran dibandingkan hanya dengan ceramah biasa?" },
{ question: "Saat kegiatan belajar diselingi permainan edukatif atau kuis digital, bagaimana pengaruhnya terhadap semangat belajarmu?" },
{ question: "Menurutmu, apa hubungan antara memahami pelajaran dan munculnya semangat belajar?" }
];
export function getRandomQuestions(): Question {
  const randomIndex = Math.floor(Math.random() * QUESTIONS.length);
  return QUESTIONS[randomIndex];
}
