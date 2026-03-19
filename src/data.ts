import { Product } from './types';

export const products: Product[] = [
  // Pepaya
  { 
    id: 1, 
    name: "Bibit Pepaya California", 
    price: 15000, 
    images: ["https://picsum.photos/seed/papaya1/400/400", "https://picsum.photos/seed/papaya1b/400/400"], 
    category: "Pepaya", 
    rating: 4.8,
    description: "Pepaya California adalah varietas pepaya unggul yang sangat populer karena ukurannya yang pas untuk konsumsi keluarga dan rasa yang manis.",
    fruitFeatures: "Daging buah tebal, berwarna merah cerah, rasa manis, dan tekstur kenyal. Ukuran buah rata-rata 0.8 - 1.5 kg.",
    plantFeatures: "Pohon pendek (dwarf), mulai berbuah pada umur 7-9 bulan. Batang kokoh dan tahan terhadap hama.",
    plantingGuide: "Tanam pada lahan yang mendapat sinar matahari penuh. Jarak tanam ideal 2.5 x 2.5 meter. Gunakan pupuk organik pada lubang tanam.",
    careGuide: "Penyiraman rutin setiap pagi/sore. Pemupukan NPK setiap 3 bulan sekali. Bersihkan gulma di sekitar batang."
  },
  { 
    id: 2, 
    name: "Bibit Pepaya Thailand", 
    price: 15000, 
    images: ["https://picsum.photos/seed/papaya2/400/400", "https://picsum.photos/seed/papaya2b/400/400"], 
    category: "Pepaya", 
    rating: 4.7,
    description: "Varietas pepaya dengan ukuran buah yang lebih besar dan panjang, sering digunakan untuk konsumsi segar maupun olahan.",
    fruitFeatures: "Buah berbentuk lonjong panjang, daging buah jingga kemerahan, rasa manis segar, aroma harum.",
    plantFeatures: "Pertumbuhan cepat, produktivitas tinggi, tinggi pohon sedang.",
    plantingGuide: "Siapkan lubang tanam 50x50x50 cm. Campurkan tanah dengan kompos. Tanam bibit dengan hati-hati agar akar tidak rusak.",
    careGuide: "Pastikan drainase tanah baik. Berikan pupuk susulan secara berkala. Lakukan penjarangan buah jika terlalu lebat."
  },
  
  // Durian
  { 
    id: 3, 
    name: "Bibit Durian Bawor", 
    price: 85000, 
    images: ["https://picsum.photos/seed/durian1/400/400", "https://picsum.photos/seed/durian1b/400/400"], 
    category: "Durian", 
    rating: 4.9,
    description: "Durian Bawor adalah varietas lokal unggul asal Banyumas yang dikenal sebagai 'Musang King-nya Indonesia'.",
    fruitFeatures: "Daging buah tebal berwarna kuning oranye, biji kempes, rasa manis legit dengan sedikit pahit khas durian premium.",
    plantFeatures: "Cepat berbuah (3-4 tahun), batang kokoh, tahan terhadap penyakit akar.",
    plantingGuide: "Tanam di lahan terbuka dengan sinar matahari penuh. Lubang tanam 60x60x60 cm. Berikan pupuk kandang yang sudah matang.",
    careGuide: "Penyiraman intensif pada tahun pertama. Pemangkasan rutin untuk membentuk tajuk. Berikan pupuk perangsang buah saat pohon sudah cukup umur."
  },
  { 
    id: 4, 
    name: "Bibit Durian Musang King", 
    price: 125000, 
    images: ["/durian/musangkingbibit.jpg", "/durian/musangkingbuah.jpeg"], 
    category: "Durian", 
    rating: 4.9,
    description: "Durian paling ikonik dari Malaysia yang menjadi standar durian premium di seluruh dunia.",
    fruitFeatures: "Warna daging buah kuning kunyit yang sangat mencolok, tekstur lembut tanpa serat, rasa manis pahit yang seimbang.",
    plantFeatures: "Pohon tumbuh tegak, daun berbentuk lonjong meruncing, memerlukan perawatan intensif untuk hasil maksimal.",
    plantingGuide: "Gunakan media tanam yang gembur dan kaya unsur hara. Pastikan lokasi tidak tergenang air.",
    careGuide: "Pemupukan rutin dengan NPK dan mikronutrien. Pengendalian hama penggerek batang secara preventif."
  },
  { 
    id: 5, 
    name: "Bibit Durian Duri Hitam", 
    price: 150000, 
    images: ["/durian/durihitambibit.jpg", "/durian/durihitambuah.jpg"], 
    category: "Durian", 
    rating: 5.0,
    description: "Dikenal juga sebagai Ochee atau Black Thorn, merupakan saingan terberat Musang King dalam hal rasa dan harga.",
    fruitFeatures: "Daging buah berwarna jingga kemerahan, tekstur sangat creamy, rasa manis yang sangat kompleks dan tahan lama di lidah.",
    plantFeatures: "Adaptif di berbagai ketinggian lahan, produktivitas stabil, bentuk buah bulat sempurna.",
    plantingGuide: "Jarak tanam ideal 10x10 meter. Berikan naungan sementara untuk bibit yang baru ditanam.",
    careGuide: "Berikan pupuk organik cair secara rutin. Jaga kelembapan tanah namun jangan sampai becek."
  },
  { 
    id: 6, 
    name: "Bibit Durian Super Tembaga", 
    price: 175000, 
    images: ["https://picsum.photos/seed/durian4/400/400", "https://picsum.photos/seed/durian4b/400/400"], 
    category: "Durian", 
    rating: 4.9,
    description: "Durian lokal legendaris dari Bangka Belitung yang memiliki warna daging buah seperti tembaga.",
    fruitFeatures: "Warna kuning pekat keemasan, daging buah sangat tebal dan lengket, rasa manis pahit yang sangat kuat.",
    plantFeatures: "Pohon sangat kokoh, tahan cuaca ekstrem, daun lebih lebar dibanding varietas lain.",
    plantingGuide: "Sangat cocok untuk tanah berpasir atau tanah merah. Gunakan mulsa di sekitar pangkal pohon.",
    careGuide: "Lakukan penggemburan tanah secara berkala. Berikan pupuk kalium tinggi saat menjelang musim berbunga."
  },
  
  // Alpukat
  { 
    id: 7, 
    name: "Bibit Alpukat Aligator", 
    price: 55000, 
    images: ["/alpukat/aligatorbibit.jpg", "/alpukat/alpukatbuah.jpg"], 
    category: "Alpukat", 
    rating: 4.7,
    description: "Alpukat dengan ukuran buah raksasa yang bisa mencapai berat 1-2 kg per buah.",
    fruitFeatures: "Bentuk memanjang seperti aligator, daging buah kuning mentega, tekstur lembut, rasa gurih tanpa serat.",
    plantFeatures: "Pertumbuhan sangat cepat, tajuk pohon melebar, mudah berbuah bahkan di dalam pot (Tabulampot).",
    plantingGuide: "Gunakan lubang tanam 60x60x60 cm. Campurkan tanah dengan sekam bakar dan kompos.",
    careGuide: "Penyiraman 1-2 kali sehari. Pemangkasan ujung cabang untuk merangsang percabangan baru."
  },
  { 
    id: 8, 
    name: "Bibit Alpukat Miki", 
    price: 60000, 
    images: ["https://picsum.photos/seed/avocado2/400/400", "https://picsum.photos/seed/avocado2b/400/400"], 
    category: "Alpukat", 
    rating: 4.8,
    description: "Alpukat unggulan dataran rendah yang tahan terhadap serangan ulat pohon.",
    fruitFeatures: "Ukuran sedang, kulit hijau mulus, daging buah tebal dan sangat pulen (creamy), rasa gurih manis.",
    plantFeatures: "Pohon relatif pendek, daun mengkilap, sangat produktif dan genjah (cepat berbuah).",
    plantingGuide: "Tanam di tempat terbuka. Berikan pupuk dasar organik yang cukup.",
    careGuide: "Jaga kebersihan area perakaran. Berikan pupuk NPK seimbang setiap 4 bulan."
  },
  { 
    id: 9, 
    name: "Bibit Alpukat Mentega", 
    price: 45000, 
    images: ["https://picsum.photos/seed/avocado3/400/400", "https://picsum.photos/seed/avocado3b/400/400"], 
    category: "Alpukat", 
    rating: 4.6,
    description: "Varietas alpukat klasik yang paling disukai masyarakat Indonesia karena teksturnya yang lembut.",
    fruitFeatures: "Warna daging buah kuning pekat seperti mentega, tekstur sangat lembut, rasa gurih khas alpukat lokal.",
    plantFeatures: "Pohon rimbun, adaptif di dataran rendah maupun tinggi.",
    plantingGuide: "Siapkan media tanam yang poros. Jangan menanam terlalu dalam.",
    careGuide: "Penyiraman rutin terutama saat musim kemarau. Berikan pupuk kandang setiap 6 bulan."
  },
  
  { 
    id: 24, 
    name: "Bibit Alpukat Pluwang", 
    price: 65000, 
    images: ["/alpukat/pluwangbibit.jpg", "/alpukat/pluwangbuah.jpg"], 
    category: "Alpukat", 
    rating: 4.9,
    description: "Alpukat Pluwang merupakan varietas unggul lokal yang sangat diminati karena ukuran buahnya yang jumbo dan rasanya yang lezat.",
    fruitFeatures: "Bentuk buah membulat besar, daging buah sangat tebal berwarna kuning mentega, tekstur pulen, dan rasa gurih tanpa serat.",
    plantFeatures: "Pohon relatif genjah (cepat berbuah), sangat adaptif, dan cocok ditanam di pekarangan maupun di dalam pot (Tabulampot).",
    plantingGuide: "Gunakan lubang tanam ukuran 60x60x60 cm. Campurkan tanah galian dengan pupuk kandang matang dan sekam.",
    careGuide: "Penyiraman rutin saat kemarau. Lakukan pemangkasan tajuk agar percabangan seimbang dan sinar matahari bisa masuk."
  },

  // Mangga
  { 
    id: 10, 
    name: "Bibit Mangga Harum Manis", 
    price: 45000, 
    images: ["https://picsum.photos/seed/mango1/400/400", "https://picsum.photos/seed/mango1b/400/400"], 
    category: "Mangga", 
    rating: 4.8,
    description: "Mangga paling populer di Indonesia dengan aroma yang sangat harum dan rasa yang manis.",
    fruitFeatures: "Bentuk lonjong, kulit hijau saat matang, daging buah jingga, rasa sangat manis dan aroma kuat.",
    plantFeatures: "Pohon rindang, produktivitas tinggi, tahan terhadap berbagai kondisi tanah.",
    plantingGuide: "Tanam di lahan luas dengan sinar matahari penuh. Jarak tanam 6-8 meter.",
    careGuide: "Lakukan pemangkasan setelah panen. Semprot fungisida saat musim hujan untuk menjaga bunga."
  },
  { 
    id: 11, 
    name: "Bibit Mangga Miyazaki", 
    price: 150000, 
    images: ["https://picsum.photos/seed/mango2/400/400", "https://picsum.photos/seed/mango2b/400/400"], 
    category: "Mangga", 
    rating: 4.9,
    description: "Mangga termahal di dunia asal Jepang yang dikenal dengan sebutan 'Egg of the Sun'.",
    fruitFeatures: "Kulit buah berwarna merah cerah saat matang, kadar gula sangat tinggi, tekstur sangat lembut tanpa serat.",
    plantFeatures: "Memerlukan perawatan ekstra dan sinar matahari yang cukup untuk menghasilkan warna merah yang sempurna.",
    plantingGuide: "Gunakan media tanam premium. Sangat disarankan untuk ditanam di dalam greenhouse untuk kontrol kualitas.",
    careGuide: "Berikan pupuk mikro secara rutin. Lakukan pembungkusan buah sejak dini."
  },
  { 
    id: 12, 
    name: "Bibit Mangga Irwin", 
    price: 65000, 
    images: ["https://picsum.photos/seed/mango3/400/400", "https://picsum.photos/seed/mango3b/400/400"], 
    category: "Mangga", 
    rating: 4.7,
    description: "Mangga eksotis dengan kulit berwarna ungu kemerahan yang sangat cantik.",
    fruitFeatures: "Warna kulit ungu, daging buah kuning jingga, rasa manis dengan sedikit sensasi asam segar.",
    plantFeatures: "Pohon tidak terlalu besar, sangat cocok untuk hiasan halaman (Tabulampot).",
    plantingGuide: "Gunakan pot besar (diameter minimal 60cm) jika ditanam di pot. Pastikan drainase baik.",
    careGuide: "Berikan sinar matahari penuh agar warna ungu keluar maksimal. Pupuk NPK rutin."
  },
  
  // Jeruk
  { 
    id: 13, 
    name: "Bibit Jeruk Dekopon", 
    price: 75000, 
    images: ["https://picsum.photos/seed/orange1/400/400", "https://picsum.photos/seed/orange1b/400/400"], 
    category: "Jeruk", 
    rating: 4.8,
    description: "Jeruk premium asal Jepang dengan bentuk unik yang memiliki benjolan di bagian atas.",
    fruitFeatures: "Ukuran besar, tanpa biji, kulit mudah dikupas, rasa sangat manis dan segar.",
    plantFeatures: "Pohon tidak berduri tajam, daun rimbun, cocok untuk dataran tinggi.",
    plantingGuide: "Gunakan media tanam yang kaya bahan organik. Hindari tanah yang terlalu padat.",
    careGuide: "Penyiraman jangan sampai tergenang. Berikan pupuk khusus jeruk secara berkala."
  },
  { 
    id: 14, 
    name: "Bibit Jeruk Nagami", 
    price: 50000, 
    images: ["https://picsum.photos/seed/orange2/400/400", "https://picsum.photos/seed/orange2b/400/400"], 
    category: "Jeruk", 
    rating: 4.7,
    description: "Jeruk mungil yang unik karena kulitnya bisa dimakan langsung dan terasa manis.",
    fruitFeatures: "Bentuk lonjong kecil, kulit manis, daging buah agak asam, dimakan utuh memberikan rasa yang unik.",
    plantFeatures: "Pohon kerdil, sangat rajin berbuah, sangat cantik sebagai tanaman hias.",
    plantingGuide: "Bisa ditanam di pot kecil. Gunakan campuran tanah, sekam, dan pupuk kandang.",
    careGuide: "Letakkan di tempat yang terkena matahari pagi. Pangkas cabang yang terlalu rimbun."
  },
  
  // Kelapa
  { 
    id: 15, 
    name: "Bibit Kelapa Genjah Entok", 
    price: 45000, 
    images: ["https://picsum.photos/seed/coconut1/400/400", "https://picsum.photos/seed/coconut1b/400/400"], 
    category: "Kelapa", 
    rating: 4.8,
    description: "Kelapa dengan pohon yang sangat pendek sehingga memudahkan saat panen.",
    fruitFeatures: "Air kelapa manis, daging buah lembut, ukuran buah sedang namun sangat banyak dalam satu janjang.",
    plantFeatures: "Pohon mulai berbuah pada tinggi 1-1.5 meter, sangat genjah (3 tahun sudah berbuah).",
    plantingGuide: "Tanam di lahan terbuka. Buat lubang tanam besar dan berikan garam kasar di dasar lubang.",
    careGuide: "Berikan pupuk NPK dan garam secara berkala. Bersihkan pelepah yang sudah kering."
  },
  { 
    id: 16, 
    name: "Bibit Kelapa Kopyor", 
    price: 85000, 
    images: ["https://picsum.photos/seed/coconut2/400/400", "https://picsum.photos/seed/coconut2b/400/400"], 
    category: "Kelapa", 
    rating: 4.9,
    description: "Kelapa eksklusif dengan daging buah yang 'hancur' dan terlepas dari tempurungnya, sangat lezat untuk es kelapa.",
    fruitFeatures: "Daging buah empuk dan gurih, air kelapa sedikit namun sangat segar.",
    plantFeatures: "Memerlukan teknik khusus dalam pembibitan untuk memastikan sifat kopyor menurun.",
    plantingGuide: "Tanam jauh dari pohon kelapa biasa untuk menjaga kemurnian sifat kopyor.",
    careGuide: "Pemupukan intensif. Jaga ketersediaan air di sekitar pohon."
  },
  
  // Nangka
  { 
    id: 17, 
    name: "Bibit Nangka Madu", 
    price: 40000, 
    images: ["https://picsum.photos/seed/jackfruit1/400/400", "https://picsum.photos/seed/jackfruit1b/400/400"], 
    category: "Nangka", 
    rating: 4.7,
    description: "Varietas nangka dengan rasa yang sangat manis seperti madu dan aroma yang tidak terlalu menyengat.",
    fruitFeatures: "Daging buah berwarna kuning emas, tebal, renyah, dan rasa manis legit.",
    plantFeatures: "Pohon cepat besar, mulai berbuah pada umur 2-3 tahun.",
    plantingGuide: "Tanam di lahan yang luas. Berikan pupuk dasar yang kuat.",
    careGuide: "Bungkus buah dengan karung untuk menghindari lalat buah. Pangkas cabang yang tidak produktif."
  },
  { 
    id: 18, 
    name: "Bibit Cempedak", 
    price: 45000, 
    images: ["https://picsum.photos/seed/jackfruit2/400/400", "https://picsum.photos/seed/jackfruit2b/400/400"], 
    category: "Nangka", 
    rating: 4.6,
    description: "Kerabat nangka dengan aroma yang lebih tajam dan daging buah yang lebih lembut.",
    fruitFeatures: "Daging buah sangat lembut, rasa manis kuat, aroma sangat tajam saat matang.",
    plantFeatures: "Pohon tinggi besar, daun berbulu halus.",
    plantingGuide: "Sangat cocok untuk daerah tropis basah. Tanam di awal musim hujan.",
    careGuide: "Jaga kelembapan tanah. Berikan pupuk organik secara rutin."
  },
  
  // Klengkeng
  { 
    id: 19, 
    name: "Bibit Klengkeng New Kristal", 
    price: 70000, 
    images: ["https://picsum.photos/seed/longan1/400/400", "https://picsum.photos/seed/longan1b/400/400"], 
    category: "Klengkeng", 
    rating: 4.8,
    description: "Varietas klengkeng unggulan dengan daging buah yang sangat tebal dan biji kecil.",
    fruitFeatures: "Daging buah tebal, kering (tidak berair), rasa sangat manis, biji kecil.",
    plantFeatures: "Sangat produktif, memerlukan booster untuk pembungaan yang serempak.",
    plantingGuide: "Tanam di lahan terbuka. Gunakan media tanam yang gembur.",
    careGuide: "Berikan pupuk booster klengkeng saat pohon sudah siap berbunga. Siram rutin."
  },
  { 
    id: 20, 
    name: "Bibit Klengkeng Merah", 
    price: 85000, 
    images: ["https://picsum.photos/seed/longan2/400/400", "https://picsum.photos/seed/longan2b/400/400"], 
    category: "Klengkeng", 
    rating: 4.9,
    description: "Klengkeng unik dengan warna kulit buah, daun, dan batang yang berwarna merah.",
    fruitFeatures: "Kulit merah eksotis, rasa manis, aroma harum.",
    plantFeatures: "Pohon eksotis, sangat cantik untuk tanaman hias sekaligus konsumsi.",
    plantingGuide: "Bisa ditanam di pot. Pastikan mendapat sinar matahari penuh agar warna merah muncul.",
    careGuide: "Pupuk NPK rutin. Jaga dari serangan kelelawar saat buah mulai matang."
  },
  
  // Sawo
  { 
    id: 21, 
    name: "Bibit Sawo Mamey Sapote", 
    price: 250000, 
    images: ["https://picsum.photos/seed/sapote1/400/400", "https://picsum.photos/seed/sapote1b/400/400"], 
    category: "Sawo", 
    rating: 4.9,
    description: "Sawo raksasa asal Meksiko dengan rasa yang sangat unik seperti campuran ubi cilembu dan pepaya.",
    fruitFeatures: "Ukuran sangat besar, daging buah berwarna merah jingga, rasa sangat manis dan lembut.",
    plantFeatures: "Pohon tumbuh lambat namun sangat kokoh, daun besar dan rimbun.",
    plantingGuide: "Tanam di lahan permanen karena tidak suka dipindah-pindah. Berikan pupuk organik tinggi.",
    careGuide: "Sabar dalam menunggu buah matang (bisa 9 bulan di pohon). Jaga ketersediaan air."
  },
  
  // Jambu
  { 
    id: 22, 
    name: "Bibit Jambu Madu Deli", 
    price: 45000, 
    images: ["https://picsum.photos/seed/guava1/400/400", "https://picsum.photos/seed/guava1b/400/400"], 
    category: "Jambu", 
    rating: 4.8,
    description: "Jambu air dengan tingkat kemanisan yang luar biasa, seperti madu.",
    fruitFeatures: "Warna hijau muda, tanpa biji, tekstur renyah, rasa sangat manis.",
    plantFeatures: "Sangat rajin berbuah, cocok untuk Tabulampot.",
    plantingGuide: "Gunakan pot diameter 50cm+. Media tanam campuran tanah dan pupuk kandang.",
    careGuide: "Penyiraman 2 kali sehari. Berikan pupuk perangsang buah secara rutin."
  },
  { 
    id: 23, 
    name: "Bibit Jambu Kristal", 
    price: 35000, 
    images: ["https://picsum.photos/seed/guava2/400/400", "https://picsum.photos/seed/guava2b/400/400"], 
    category: "Jambu", 
    rating: 4.7,
    description: "Jambu biji yang hampir tidak memiliki biji, sangat renyah dan segar.",
    fruitFeatures: "Daging buah putih, renyah seperti apel, biji sangat sedikit (<3%), rasa manis segar.",
    plantFeatures: "Pohon pendek, sangat produktif, tahan hama.",
    plantingGuide: "Tanam di tempat terbuka. Berikan pupuk dasar organik.",
    careGuide: "Bungkus buah dengan plastik sejak kecil untuk menghindari ulat buah. Pangkas rutin."
  },
];
