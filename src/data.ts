<<<<<<< HEAD
import { Product } from "./types";

export const products: Product[] = [
  // Pepaya
  {
    id: 1,
    name: "Bibit Pepaya California",
    price: 15000,
    images: [
      "/pepaya/california/pepaya california(1).jpg",
      "/pepaya/california/pepaya california(2).jpg",
    ],
    category: "Pepaya",
    rating: 4.8,
    description:
      "Pepaya unggulan yang populer di Indonesia dengan ukuran buah yang pas dan rasa manis segar, cocok untuk konsumsi harian.",
    fruitFeatures:
      "Daging buah berwarna oranye cerah, tekstur lembut dan juicy, rasa manis segar dengan aroma yang khas.",
    plantFeatures:
      "Tanaman tumbuh cepat dengan batang tegak, daun besar menjari, dan mulai berbuah dalam waktu relatif singkat.",
    plantingGuide:
      "Cocok ditanam di dataran rendah dengan tanah gembur dan drainase baik. Pastikan mendapat sinar matahari penuh.",
    careGuide:
      "Lakukan penyiraman rutin dan pemupukan berkala. Jaga kebersihan area tanam untuk mencegah hama dan penyakit.",
  },
  {
    id: 2,
    name: "Bibit Pepaya Thailand",
    price: 15000,
    images: [
      "/pepaya/thailand/pepaya thailand(1).jpg",
      "/pepaya/thailand/pepaya thailand(2).jpg",
      "/pepaya/thailand/pepaya thailand(3).jpg",
    ],
    category: "Pepaya",
    rating: 4.7,
    description:
      "Pepaya unggulan asal Thailand yang dikenal dengan ukuran buah yang besar dan rasa manis yang kuat, cocok untuk pasar konsumsi maupun komersial.",
    fruitFeatures:
      "Daging buah berwarna oranye kemerahan, tekstur padat dan tebal, rasa manis intens dengan sedikit aroma khas pepaya.",
    plantFeatures:
      "Tanaman tumbuh tinggi dan cepat berbuah, batang kokoh dengan daun lebar menjari.",
    plantingGuide:
      "Cocok ditanam di dataran rendah hingga menengah dengan tanah subur dan memiliki drainase yang baik.",
    careGuide:
      "Lakukan penyiraman teratur dan pemupukan rutin. Pengendalian hama perlu diperhatikan untuk menjaga kualitas buah.",
  },

  // Durian
  {
    id: 3,
    name: "Bibit Durian Bawor",
    price: 85000,
    images: [
      "/durian/bawor/bawor (1).jpg",
      "/durian/bawor/bawor (2).jpg",
      "/durian/bawor/bawor (3).jpg",
      "/durian/bawor/bawor (4).jpg",
    ],
    category: "Durian",
    rating: 4.9,
    description:
      "Durian Bawor adalah varietas lokal unggul asal Banyumas yang dikenal sebagai 'Musang King-nya Indonesia'.",
    fruitFeatures:
      "Daging buah tebal berwarna kuning oranye, biji kempes, rasa manis legit dengan sedikit pahit khas durian premium.",
    plantFeatures:
      "Cepat berbuah (3-4 tahun), batang kokoh, tahan terhadap penyakit akar.",
    plantingGuide:
      "Tanam di lahan terbuka dengan sinar matahari penuh. Lubang tanam 60x60x60 cm. Berikan pupuk kandang yang sudah matang.",
    careGuide:
      "Penyiraman intensif pada tahun pertama. Pemangkasan rutin untuk membentuk tajuk. Berikan pupuk perangsang buah saat pohon sudah cukup umur.",
  },
  {
    id: 4,
    name: "Bibit Durian Musang King",
    price: 125000,
    images: [
      "/durian/Musangking/musangking (1).jpg",
      "/durian/Musangking/musangking (2).jpg",
      "/durian/Musangking/musangking (3).jpg",
      "/durian/Musangking/musangking(4).jpg",
    ],
    category: "Durian",
    rating: 4.9,
    description:
      "Durian paling ikonik dari Malaysia yang menjadi standar durian premium di seluruh dunia.",
    fruitFeatures:
      "Warna daging buah kuning kunyit yang sangat mencolok, tekstur lembut tanpa serat, rasa manis pahit yang seimbang.",
    plantFeatures:
      "Pohon tumbuh tegak, daun berbentuk lonjong meruncing, memerlukan perawatan intensif untuk hasil maksimal.",
    plantingGuide:
      "Gunakan media tanam yang gembur dan kaya unsur hara. Pastikan lokasi tidak tergenang air.",
    careGuide:
      "Pemupukan rutin dengan NPK dan mikronutrien. Pengendalian hama penggerek batang secara preventif.",
  },
  {
    id: 5,
    name: "Bibit Durian Duri Hitam",
    price: 150000,
    images: [
      "/durian/duri hitam/duri hitam (1).jpg",
      "/durian/duri hitam/duri hitam (2).jpg",
    ],
    category: "Durian",
    rating: 5.0,
    description:
      "Dikenal juga sebagai Ochee atau Black Thorn, merupakan saingan terberat Musang King dalam hal rasa dan harga.",
    fruitFeatures:
      "Daging buah berwarna jingga kemerahan, tekstur sangat creamy, rasa manis yang sangat kompleks dan tahan lama di lidah.",
    plantFeatures:
      "Adaptif di berbagai ketinggian lahan, produktivitas stabil, bentuk buah bulat sempurna.",
    plantingGuide:
      "Jarak tanam ideal 10x10 meter. Berikan naungan sementara untuk bibit yang baru ditanam.",
    careGuide:
      "Berikan pupuk organik cair secara rutin. Jaga kelembapan tanah namun jangan sampai becek.",
  },
  {
    id: 6,
    name: "Bibit Durian Super Tembaga",
    price: 175000,
    images: [
      "/durian/super tembaga/super tembaga(1).jpg",
      "/durian/super tembaga/super tembaga(2).jpg",
      "/durian/super tembaga/super tembaga(3).jpg",
    ],

    category: "Durian",
    rating: 4.9,
    description:
      "Durian lokal legendaris dari Bangka Belitung yang memiliki warna daging buah seperti tembaga.",
    fruitFeatures:
      "Warna kuning pekat keemasan, daging buah sangat tebal dan lengket, rasa manis pahit yang sangat kuat.",
    plantFeatures:
      "Pohon sangat kokoh, tahan cuaca ekstrem, daun lebih lebar dibanding varietas lain.",
    plantingGuide:
      "Sangat cocok untuk tanah berpasir atau tanah merah. Gunakan mulsa di sekitar pangkal pohon.",
    careGuide:
      "Lakukan penggemburan tanah secara berkala. Berikan pupuk kalium tinggi saat menjelang musim berbunga.",
  },
  {
    id: 25,
    name: "Bibit Durian Merah",
    price: 175000,
    images: [
      "/durian/merah/durian merah(1).jpg",
      "/durian/merah/durian merah(2).jpg",
      "/durian/merah/durian merah(3).jpg",
    ],

    category: "Durian",
    rating: 4.9,
    description:
      "Durian unik khas Banyuwangi yang terkenal dengan warna daging buahnya yang kemerahan dan rasa yang berbeda dari durian pada umumnya.",
    fruitFeatures:
      "Warna daging buah merah hingga oranye kemerahan, tekstur lembut dan sedikit berserat, rasa manis dengan sentuhan legit khas yang ringan.",
    plantFeatures:
      "Pohon tumbuh sedang dengan percabangan rapi, daun berwarna hijau tua dengan permukaan mengkilap.",
    plantingGuide:
      "Tumbuh optimal di dataran rendah hingga menengah dengan tanah yang subur dan drainase baik.",
    careGuide:
      "Lakukan penyiraman rutin terutama saat musim kemarau. Berikan pupuk organik dan tambahan unsur hara untuk meningkatkan kualitas buah.",
  },
  {
    id: 26,
    name: "Bibit Durian Montong",
    price: 175000,
    images: [
      "/durian/montong/durian montong(1).jpg",
      "/durian/montong/durian montong(2).jpg",
      "/durian/montong/durian montong(3).jpg",
    ],

    category: "Durian",
    rating: 4.9,
    description:
      "Durian populer asal Thailand yang dikenal dengan ukuran buahnya yang besar dan rasa yang manis lembut, menjadikannya favorit di berbagai kalangan.",
    fruitFeatures:
      "Daging buah tebal berwarna kuning pucat, tekstur lembut dan creamy, rasa manis dominan dengan sedikit pahit.",
    plantFeatures:
      "Pohon tumbuh tinggi dan kuat, dengan daun lebar berwarna hijau tua, adaptif di berbagai kondisi lingkungan.",
    plantingGuide:
      "Cocok ditanam di dataran rendah hingga menengah dengan tanah subur dan drainase yang baik.",
    careGuide:
      "Lakukan pemupukan rutin dengan NPK dan penyiraman teratur. Pemangkasan cabang diperlukan untuk menjaga produktivitas tanaman.",
  },
  {
    id: 27,
    name: "Bibit Durian Pelangi",
    price: 175000,
    images: [
      "/durian/pelangi/durian pelangi(1).jpg",
      "/durian/pelangi/durian pelangi(2).jpg",
    ],

    category: "Durian",
    rating: 4.9,
    description:
      "Durian eksotis asal Indonesia yang dikenal dengan perpaduan warna daging buahnya yang unik dan menarik, menjadikannya salah satu varietas premium.",
    fruitFeatures:
      "Daging buah memiliki gradasi warna kuning, merah, hingga oranye, tekstur lembut dan creamy, rasa manis dengan sedikit sentuhan pahit.",
    plantFeatures:
      "Pohon tumbuh sedang dengan percabangan cukup rimbun, daun berwarna hijau tua dengan bentuk memanjang.",
    plantingGuide:
      "Tumbuh optimal di dataran rendah hingga menengah dengan tanah yang subur dan memiliki drainase baik.",
    careGuide:
      "Lakukan penyiraman rutin dan pemupukan seimbang. Perawatan intensif diperlukan untuk menjaga kualitas dan keunikan warna buah.",
  },
  {
    id: 28,
    name: "Bibit Durian Namlung",
    price: 175000,
    images: [
      "/durian/namlung/durian namlung(1).jpg",
      "/durian/namlung/durian namlung(2).jpg",
    ],

    category: "Durian",
    rating: 4.9,
    description:
      "Durian eksotis asal Indonesia yang dikenal dengan perpaduan warna daging buahnya yang unik dan menarik, menjadikannya salah satu varietas premium.",
    fruitFeatures:
      "Daging buah memiliki gradasi warna kuning, merah, hingga oranye, tekstur lembut dan creamy, rasa manis dengan sedikit sentuhan pahit.",
    plantFeatures:
      "Pohon tumbuh sedang dengan percabangan cukup rimbun, daun berwarna hijau tua dengan bentuk memanjang.",
    plantingGuide:
      "Tumbuh optimal di dataran rendah hingga menengah dengan tanah yang subur dan memiliki drainase baik.",
    careGuide:
      "Lakukan penyiraman rutin dan pemupukan seimbang. Perawatan intensif diperlukan untuk menjaga kualitas dan keunikan warna buah.",
  },

  // Alpukat
  {
    id: 7,
    name: "Bibit Alpukat Aligator",
    price: 55000,
    images: [
      "/alpukat/aligator/alpukat aligator(1).jpg",
      "/alpukat/aligator/alpukat aligator(2).jpg",
      "/alpukat/aligator/alpukat aligator(3).jpg",
    ],
    category: "Alpukat",
    rating: 4.7,
    description:
      "Alpukat dengan ukuran buah raksasa yang bisa mencapai berat 1-2 kg per buah.",
    fruitFeatures:
      "Bentuk memanjang seperti aligator, daging buah kuning mentega, tekstur lembut, rasa gurih tanpa serat.",
    plantFeatures:
      "Pertumbuhan sangat cepat, tajuk pohon melebar, mudah berbuah bahkan di dalam pot (Tabulampot).",
    plantingGuide:
      "Gunakan lubang tanam 60x60x60 cm. Campurkan tanah dengan sekam bakar dan kompos.",
    careGuide:
      "Penyiraman 1-2 kali sehari. Pemangkasan ujung cabang untuk merangsang percabangan baru.",
  },
  {
    id: 8,
    name: "Bibit Alpukat Miki",
    price: 60000,
    images: [
      "/alpukat/miki/alpukat miki(1).jpg",
      "/alpukat/miki/alpukat miki(2).jpg",
      "/alpukat/miki/alpukat miki(3).jpg",
    ],
    category: "Alpukat",
    rating: 4.8,
    description:
      "Alpukat unggulan dataran rendah yang tahan terhadap serangan ulat pohon.",
    fruitFeatures:
      "Ukuran sedang, kulit hijau mulus, daging buah tebal dan sangat pulen (creamy), rasa gurih manis.",
    plantFeatures:
      "Pohon relatif pendek, daun mengkilap, sangat produktif dan genjah (cepat berbuah).",
    plantingGuide:
      "Tanam di tempat terbuka. Berikan pupuk dasar organik yang cukup.",
    careGuide:
      "Jaga kebersihan area perakaran. Berikan pupuk NPK seimbang setiap 4 bulan.",
  },
  {
    id: 9,
    name: "Bibit Alpukat Mentega",
    price: 45000,
    images: [
      "/alpukat/mentega/alpukat mentega(1).jpg",
      "/alpukat/mentega/alpukat mentega(2).jpg",
      "/alpukat/mentega/alpukat mentega(3).jpg",
    ],
    category: "Alpukat",
    rating: 4.6,
    description:
      "Varietas alpukat klasik yang paling disukai masyarakat Indonesia karena teksturnya yang lembut.",
    fruitFeatures:
      "Warna daging buah kuning pekat seperti mentega, tekstur sangat lembut, rasa gurih khas alpukat lokal.",
    plantFeatures: "Pohon rimbun, adaptif di dataran rendah maupun tinggi.",
    plantingGuide:
      "Siapkan media tanam yang poros. Jangan menanam terlalu dalam.",
    careGuide:
      "Penyiraman rutin terutama saat musim kemarau. Berikan pupuk kandang setiap 6 bulan.",
  },

  {
    id: 24,
    name: "Bibit Alpukat Pluwang",
    price: 65000,
    images: [
      "/alpukat/pluwang/alpukat pluwang (1).jpg",
      "/alpukat/pluwang/alpukat pluwang (2).jpg",
      "/alpukat/pluwang/alpukat pluwang (3).jpg",
    ],
    category: "Alpukat",
    rating: 4.9,
    description:
      "Alpukat Pluwang merupakan varietas unggul lokal yang sangat diminati karena ukuran buahnya yang jumbo dan rasanya yang lezat.",
    fruitFeatures:
      "Bentuk buah membulat besar, daging buah sangat tebal berwarna kuning mentega, tekstur pulen, dan rasa gurih tanpa serat.",
    plantFeatures:
      "Pohon relatif genjah (cepat berbuah), sangat adaptif, dan cocok ditanam di pekarangan maupun di dalam pot (Tabulampot).",
    plantingGuide:
      "Gunakan lubang tanam ukuran 60x60x60 cm. Campurkan tanah galian dengan pupuk kandang matang dan sekam.",
    careGuide:
      "Penyiraman rutin saat kemarau. Lakukan pemangkasan tajuk agar percabangan seimbang dan sinar matahari bisa masuk.",
  },
  {
    id: 29,
    name: "Bibit Alpukat Kendil",
    price: 65000,
    images: [
      "/alpukat/kendil/alpukat kendil(1).jpg",
      "/alpukat/kendil/alpukat kendil(2).jpg",
    ],
    category: "Alpukat",
    rating: 4.9,
    description:
      "Alpukat lokal unggulan yang dikenal dengan ukuran buahnya yang besar dan bentuk bulat seperti kendil, serta rasa yang gurih dan legit.",
    fruitFeatures:
      "Daging buah tebal berwarna kuning kehijauan, tekstur lembut dan creamy, rasa gurih dengan sedikit manis.",
    plantFeatures:
      "Pohon tumbuh tinggi dan kuat, dengan daun lebar berwarna hijau tua dan percabangan yang rimbun.",
    plantingGuide:
      "Cocok ditanam di dataran rendah hingga menengah dengan tanah subur dan drainase yang baik.",
    careGuide:
      "Lakukan penyiraman rutin dan pemupukan berkala. Pemangkasan diperlukan untuk menjaga bentuk dan produktivitas pohon.",
  },
  {
    id: 30,
    name: "Bibit Alpukat Hass",
    price: 65000,
    images: [
      "/alpukat/hass/alpukat hass(1).jpg",
      "/alpukat/hass/alpukat hass(2).jpg",
    ],
    category: "Alpukat",
    rating: 4.9,
    description:
      "Alpukat premium asal Amerika yang terkenal dengan kualitas daging buahnya yang creamy dan rasa gurih khas, banyak digunakan untuk hidangan modern.",
    fruitFeatures:
      "Daging buah berwarna kuning keemasan, tekstur sangat lembut dan creamy, rasa gurih dengan sedikit nuansa kacang.",
    plantFeatures:
      "Pohon tumbuh sedang dengan percabangan rapi, daun berwarna hijau tua dan adaptif di berbagai kondisi lingkungan.",
    plantingGuide:
      "Cocok ditanam di dataran rendah hingga menengah dengan tanah subur, gembur, dan memiliki drainase baik.",
    careGuide:
      "Lakukan penyiraman teratur dan pemupukan berkala. Perlu perhatian pada kelembaban tanah untuk menjaga kualitas buah.",
  },
  {
    id: 31,
    name: "Bibit Alpukat Red Vietnam",
    price: 65000,
    images: [
      "/alpukat/red vietnam/alpukat red vietnam(1).jpg",
      "/alpukat/red vietnam/alpukat red vietnam(2).jpg",
      "/alpukat/red vietnam/alpukat red vietnam(3).jpg",
      "/alpukat/red vietnam/alpukat red vietnam(4).jpg",
    ],
    category: "Alpukat",
    rating: 4.9,
    description:
      "Alpukat unik asal Vietnam yang dikenal dengan kulit buah berwarna kemerahan dan tampilan yang menarik, cocok untuk pasar premium.",
    fruitFeatures:
      "Daging buah berwarna kuning cerah, tekstur lembut dan creamy, rasa gurih dengan sedikit sentuhan manis.",
    plantFeatures:
      "Pohon tumbuh sedang dengan percabangan cukup rimbun, daun berwarna hijau tua dan adaptif di berbagai kondisi.",
    plantingGuide:
      "Cocok ditanam di dataran rendah hingga menengah dengan tanah gembur dan memiliki drainase yang baik.",
    careGuide:
      "Lakukan penyiraman rutin dan pemupukan berkala. Jaga kelembaban tanah serta lakukan pemangkasan untuk pertumbuhan optimal.",
  },
  {
    id: 32,
    name: "Bibit Alpukat Kuba",
    price: 65000,
    images: [
      "/alpukat/kuba/alpukat kuba(1).jpg",
      "/alpukat/kuba/alpukat kuba(2).jpg",
      "/alpukat/kuba/alpukat kuba(3).jpg",
      "/alpukat/kuba/alpukat kuba(4).jpg",
    ],
    category: "Alpukat",
    rating: 4.9,
    description:
      "Alpukat unggulan yang dikenal dengan ukuran buahnya yang besar dan produktivitas tinggi, cocok untuk budidaya maupun konsumsi.",
    fruitFeatures:
      "Daging buah tebal berwarna kuning kehijauan, tekstur lembut dan creamy, rasa gurih dengan sedikit manis.",
    plantFeatures:
      "Pohon tumbuh tinggi dan kuat, dengan percabangan lebat serta daun berwarna hijau tua.",
    plantingGuide:
      "Cocok ditanam di dataran rendah hingga menengah dengan tanah subur, gembur, dan memiliki drainase yang baik.",
    careGuide:
      "Lakukan penyiraman rutin dan pemupukan berkala. Pemangkasan cabang diperlukan untuk menjaga produktivitas dan kesehatan tanaman.",
  },
  {
    id: 33,
    name: "Bibit Alpukat Roro",
    price: 65000,
    images: [
      "/alpukat/roro/alpukat roro(1).jpg",
      "/alpukat/roro/alpukat roro(2).jpg",
    ],
    category: "Alpukat",
    rating: 4.9,
    description:
      "Alpukat lokal unggulan yang dikenal dengan produktivitas tinggi dan rasa buah yang gurih, cocok untuk konsumsi sehari-hari maupun budidaya.",
    fruitFeatures:
      "Daging buah berwarna kuning kehijauan, tekstur lembut dan cukup tebal, rasa gurih dengan sedikit manis.",
    plantFeatures:
      "Pohon tumbuh sedang hingga tinggi, dengan percabangan rimbun dan daun berwarna hijau tua.",
    plantingGuide:
      "Cocok ditanam di dataran rendah hingga menengah dengan tanah subur dan memiliki drainase yang baik.",
    careGuide:
      "Lakukan penyiraman rutin dan pemupukan berkala. Pemangkasan ringan diperlukan untuk menjaga bentuk dan produktivitas tanaman.",
  },
  {
    id: 34,
    name: "Bibit Alpukat Wina",
    price: 65000,
    images: [
      "/alpukat/wina/alpukat wina(1).jpg",
      "/alpukat/wina/alpukat wina(2).jpg",
      "/alpukat/wina/alpukat wina(3).jpg",
    ],
    category: "Alpukat",
    rating: 4.9,
    description:
      "Alpukat unggulan yang dikenal dengan produktivitas tinggi dan kualitas buah yang baik, cocok untuk konsumsi maupun budidaya.",
    fruitFeatures:
      "Daging buah berwarna kuning kehijauan, tekstur lembut dan cukup tebal, rasa gurih dengan sedikit sentuhan manis.",
    plantFeatures:
      "Pohon tumbuh sedang hingga tinggi, dengan percabangan rimbun dan daun berwarna hijau tua.",
    plantingGuide:
      "Cocok ditanam di dataran rendah hingga menengah dengan tanah subur, gembur, dan memiliki drainase yang baik.",
    careGuide:
      "Lakukan penyiraman rutin dan pemupukan berkala. Pemangkasan diperlukan untuk menjaga bentuk dan meningkatkan produktivitas tanaman.",
  },

  // Mangga
  {
    id: 10,
    name: "Bibit Mangga Harum Manis",
    price: 45000,
    images: [
      "/mangga/harum manis/mangga harum manis(1).jpg",
      "/mangga/harum manis/mangga harum manis(2).jpg",
    ],
    category: "Mangga",
    rating: 4.8,
    description:
      "Mangga paling populer di Indonesia dengan aroma yang sangat harum dan rasa yang manis.",
    fruitFeatures:
      "Bentuk lonjong, kulit hijau saat matang, daging buah jingga, rasa sangat manis dan aroma kuat.",
    plantFeatures:
      "Pohon rindang, produktivitas tinggi, tahan terhadap berbagai kondisi tanah.",
    plantingGuide:
      "Tanam di lahan luas dengan sinar matahari penuh. Jarak tanam 6-8 meter.",
    careGuide:
      "Lakukan pemangkasan setelah panen. Semprot fungisida saat musim hujan untuk menjaga bunga.",
  },
  {
    id: 11,
    name: "Bibit Mangga Miyazaki",
    price: 150000,
    images: [
      "/mangga/miyazaki/mangga miyazaki(1).jpg",
      "/mangga/miyazaki/mangga miyazaki(2).jpg",
      "/mangga/miyazaki/mangga miyazaki(3).jpg",
    ],
    category: "Mangga",
    rating: 4.9,
    description:
      "Mangga termahal di dunia asal Jepang yang dikenal dengan sebutan 'Egg of the Sun'.",
    fruitFeatures:
      "Kulit buah berwarna merah cerah saat matang, kadar gula sangat tinggi, tekstur sangat lembut tanpa serat.",
    plantFeatures:
      "Memerlukan perawatan ekstra dan sinar matahari yang cukup untuk menghasilkan warna merah yang sempurna.",
    plantingGuide:
      "Gunakan media tanam premium. Sangat disarankan untuk ditanam di dalam greenhouse untuk kontrol kualitas.",
    careGuide:
      "Berikan pupuk mikro secara rutin. Lakukan pembungkusan buah sejak dini.",
  },
  {
    id: 12,
    name: "Bibit Mangga Irwin",
    price: 65000,
    images: [
      "/mangga/irwin/mangga irwin(1).jpg",
      "/mangga/irwin/mangga irwin(2).jpg",
    ],
    category: "Mangga",
    rating: 4.7,
    description:
      "Mangga eksotis dengan kulit berwarna ungu kemerahan yang sangat cantik.",
    fruitFeatures:
      "Warna kulit ungu, daging buah kuning jingga, rasa manis dengan sedikit sensasi asam segar.",
    plantFeatures:
      "Pohon tidak terlalu besar, sangat cocok untuk hiasan halaman (Tabulampot).",
    plantingGuide:
      "Gunakan pot besar (diameter minimal 60cm) jika ditanam di pot. Pastikan drainase baik.",
    careGuide:
      "Berikan sinar matahari penuh agar warna ungu keluar maksimal. Pupuk NPK rutin.",
  },
  {
    id: 35,
    name: "Bibit Mangga Chokanan",
    price: 65000,
    images: [
      "/mangga/chokanan/mangga chokanan(1).jpg",
      "/mangga/chokanan/mangga chokanan(2).jpg",
      "/mangga/chokanan/mangga chokanan(3).jpg",
    ],
    category: "Mangga",
    rating: 4.7,
    description:
      "Mangga unggulan asal Thailand yang dikenal dengan rasa manis seperti madu dan produktivitas tinggi, cocok untuk konsumsi maupun budidaya.",
    fruitFeatures:
      "Daging buah berwarna kuning cerah, tekstur halus dan minim serat, rasa manis dominan dengan aroma harum khas.",
    plantFeatures:
      "Pohon tumbuh sedang dengan percabangan rimbun, daun berwarna hijau tua dan adaptif di berbagai kondisi lingkungan.",
    plantingGuide:
      "Cocok ditanam di dataran rendah hingga menengah dengan tanah subur dan memiliki drainase yang baik.",
    careGuide:
      "Lakukan penyiraman teratur dan pemupukan berkala. Pemangkasan diperlukan untuk menjaga bentuk pohon dan meningkatkan produktivitas.",
  },
  {
    id: 36,
    name: "Bibit Mangga Golek",
    price: 65000,
    images: [
      "/mangga/golek/mangga golek(1).jpg",
      "/mangga/golek/mangga golek(2).jpg",
    ],
    category: "Mangga",
    rating: 4.7,
    description:
      "Mangga lokal populer yang dikenal dengan bentuk buah memanjang dan rasa manis segar, banyak diminati untuk konsumsi sehari-hari.",
    fruitFeatures:
      "Daging buah berwarna kuning cerah, tekstur cukup padat dengan sedikit serat, rasa manis segar dengan sedikit asam.",
    plantFeatures:
      "Pohon tumbuh tinggi dan kuat, dengan percabangan rimbun dan daun berwarna hijau tua.",
    plantingGuide:
      "Cocok ditanam di dataran rendah hingga menengah dengan tanah subur dan drainase yang baik.",
    careGuide:
      "Lakukan penyiraman rutin dan pemupukan berkala. Pemangkasan cabang diperlukan untuk menjaga produktivitas tanaman.",
  },
  {
    id: 37,
    name: "Bibit Mangga Kiojay",
    price: 65000,
    images: [
      "/mangga/kiojay/mangga kiojay(1).jpg",
      "/mangga/kiojay/mangga kiojay(2).jpg",
    ],
    category: "Mangga",
    rating: 4.7,
    description:
      "Mangga unggulan yang dikenal dengan ukuran buah yang besar dan rasa manis segar, cocok untuk konsumsi maupun budidaya.",
    fruitFeatures:
      "Daging buah berwarna kuning cerah, tekstur lembut dan minim serat, rasa manis dengan sedikit sentuhan asam.",
    plantFeatures:
      "Pohon tumbuh sedang hingga tinggi, dengan percabangan rimbun dan daun berwarna hijau tua.",
    plantingGuide:
      "Cocok ditanam di dataran rendah hingga menengah dengan tanah subur dan memiliki drainase yang baik.",
    careGuide:
      "Lakukan penyiraman rutin dan pemupukan berkala. Pemangkasan diperlukan untuk menjaga bentuk dan meningkatkan produktivitas tanaman.",
  },
  {
    id: 38,
    name: "Bibit Mangga Mahatir",
    price: 65000,
    images: [
      "/mangga/mahatir/mangga mahatir(1).jpg",
      "/mangga/mahatir/mangga mahatir(2).jpg",
    ],
    category: "Mangga",
    rating: 4.7,
    description:
      "Mangga unggulan yang dikenal dengan ukuran buah yang besar dan kualitas rasa yang baik, cocok untuk konsumsi maupun budidaya.",
    fruitFeatures:
      "Daging buah berwarna kuning cerah, tekstur lembut dengan sedikit serat, rasa manis segar dan cukup kuat.",
    plantFeatures:
      "Pohon tumbuh tinggi dan kokoh, dengan percabangan rimbun serta daun berwarna hijau tua.",
    plantingGuide:
      "Cocok ditanam di dataran rendah hingga menengah dengan tanah subur, gembur, dan memiliki drainase yang baik.",
    careGuide:
      "Lakukan penyiraman rutin dan pemupukan berkala. Pemangkasan cabang diperlukan untuk menjaga produktivitas dan kesehatan tanaman.",
  },
  {
    id: 39,
    name: "Bibit Mangga Manalagi",
    price: 65000,
    images: [
      "/mangga/manalagi/mangga manalagi(1).jpg",
      "/mangga/manalagi/mangga manalagi(2).jpg",
    ],
    category: "Mangga",
    rating: 4.7,
    description:
      "Mangga lokal legendaris yang terkenal dengan aroma harum dan rasa manis yang khas, menjadi favorit di Indonesia.",
    fruitFeatures:
      "Daging buah berwarna kuning cerah, tekstur halus dan minim serat, rasa manis dominan dengan aroma harum kuat.",
    plantFeatures:
      "Pohon tumbuh tinggi dengan percabangan rimbun, daun berwarna hijau tua.",
    plantingGuide:
      "Cocok ditanam di dataran rendah dengan tanah subur dan drainase baik.",
    careGuide:
      "Lakukan pemupukan rutin dan penyiraman teratur. Pemangkasan membantu meningkatkan produktivitas.",
  },

  // Jeruk
  {
    id: 13,
    name: "Bibit Jeruk Dekopon",
    price: 75000,
    images: [
      "/jeruk/dekopon/jeruk dekopon(1).jpg",
      "/jeruk/dekopon/jeruk dekopon(2).jpg",
    ],
    category: "Jeruk",
    rating: 4.8,
    description:
      "Jeruk premium asal Jepang dengan bentuk unik yang memiliki benjolan di bagian atas.",
    fruitFeatures:
      "Ukuran besar, tanpa biji, kulit mudah dikupas, rasa sangat manis dan segar.",
    plantFeatures:
      "Pohon tidak berduri tajam, daun rimbun, cocok untuk dataran tinggi.",
    plantingGuide:
      "Gunakan media tanam yang kaya bahan organik. Hindari tanah yang terlalu padat.",
    careGuide:
      "Penyiraman jangan sampai tergenang. Berikan pupuk khusus jeruk secara berkala.",
  },
  {
    id: 14,
    name: "Bibit Jeruk Nagami",
    price: 50000,
    images: [
      "https://picsum.photos/seed/orange2/400/400",
      "https://picsum.photos/seed/orange2b/400/400",
    ],
    category: "Jeruk",
    rating: 4.7,
    description:
      "Jeruk mungil yang unik karena kulitnya bisa dimakan langsung dan terasa manis.",
    fruitFeatures:
      "Bentuk lonjong kecil, kulit manis, daging buah agak asam, dimakan utuh memberikan rasa yang unik.",
    plantFeatures:
      "Pohon kerdil, sangat rajin berbuah, sangat cantik sebagai tanaman hias.",
    plantingGuide:
      "Bisa ditanam di pot kecil. Gunakan campuran tanah, sekam, dan pupuk kandang.",
    careGuide:
      "Letakkan di tempat yang terkena matahari pagi. Pangkas cabang yang terlalu rimbun.",
  },

  // Kelapa
  {
    id: 15,
    name: "Bibit Kelapa Genjah Entok",
    price: 45000,
    images: [
      "https://picsum.photos/seed/coconut1/400/400",
      "https://picsum.photos/seed/coconut1b/400/400",
    ],
    category: "Kelapa",
    rating: 4.8,
    description:
      "Kelapa dengan pohon yang sangat pendek sehingga memudahkan saat panen.",
    fruitFeatures:
      "Air kelapa manis, daging buah lembut, ukuran buah sedang namun sangat banyak dalam satu janjang.",
    plantFeatures:
      "Pohon mulai berbuah pada tinggi 1-1.5 meter, sangat genjah (3 tahun sudah berbuah).",
    plantingGuide:
      "Tanam di lahan terbuka. Buat lubang tanam besar dan berikan garam kasar di dasar lubang.",
    careGuide:
      "Berikan pupuk NPK dan garam secara berkala. Bersihkan pelepah yang sudah kering.",
  },
  {
    id: 16,
    name: "Bibit Kelapa Kopyor",
    price: 85000,
    images: [
      "https://picsum.photos/seed/coconut2/400/400",
      "https://picsum.photos/seed/coconut2b/400/400",
    ],
    category: "Kelapa",
    rating: 4.9,
    description:
      "Kelapa eksklusif dengan daging buah yang 'hancur' dan terlepas dari tempurungnya, sangat lezat untuk es kelapa.",
    fruitFeatures:
      "Daging buah empuk dan gurih, air kelapa sedikit namun sangat segar.",
    plantFeatures:
      "Memerlukan teknik khusus dalam pembibitan untuk memastikan sifat kopyor menurun.",
    plantingGuide:
      "Tanam jauh dari pohon kelapa biasa untuk menjaga kemurnian sifat kopyor.",
    careGuide: "Pemupukan intensif. Jaga ketersediaan air di sekitar pohon.",
  },

  // Nangka
  {
    id: 17,
    name: "Bibit Nangka Madu",
    price: 40000,
    images: [
      "https://picsum.photos/seed/jackfruit1/400/400",
      "https://picsum.photos/seed/jackfruit1b/400/400",
    ],
    category: "Nangka",
    rating: 4.7,
    description:
      "Varietas nangka dengan rasa yang sangat manis seperti madu dan aroma yang tidak terlalu menyengat.",
    fruitFeatures:
      "Daging buah berwarna kuning emas, tebal, renyah, dan rasa manis legit.",
    plantFeatures: "Pohon cepat besar, mulai berbuah pada umur 2-3 tahun.",
    plantingGuide: "Tanam di lahan yang luas. Berikan pupuk dasar yang kuat.",
    careGuide:
      "Bungkus buah dengan karung untuk menghindari lalat buah. Pangkas cabang yang tidak produktif.",
  },
  {
    id: 18,
    name: "Bibit Cempedak",
    price: 45000,
    images: [
      "https://picsum.photos/seed/jackfruit2/400/400",
      "https://picsum.photos/seed/jackfruit2b/400/400",
    ],
    category: "Nangka",
    rating: 4.6,
    description:
      "Kerabat nangka dengan aroma yang lebih tajam dan daging buah yang lebih lembut.",
    fruitFeatures:
      "Daging buah sangat lembut, rasa manis kuat, aroma sangat tajam saat matang.",
    plantFeatures: "Pohon tinggi besar, daun berbulu halus.",
    plantingGuide:
      "Sangat cocok untuk daerah tropis basah. Tanam di awal musim hujan.",
    careGuide: "Jaga kelembapan tanah. Berikan pupuk organik secara rutin.",
  },

  // Klengkeng
  {
    id: 19,
    name: "Bibit Klengkeng New Kristal",
    price: 70000,
    images: [
      "https://picsum.photos/seed/longan1/400/400",
      "https://picsum.photos/seed/longan1b/400/400",
    ],
    category: "Klengkeng",
    rating: 4.8,
    description:
      "Varietas klengkeng unggulan dengan daging buah yang sangat tebal dan biji kecil.",
    fruitFeatures:
      "Daging buah tebal, kering (tidak berair), rasa sangat manis, biji kecil.",
    plantFeatures:
      "Sangat produktif, memerlukan booster untuk pembungaan yang serempak.",
    plantingGuide: "Tanam di lahan terbuka. Gunakan media tanam yang gembur.",
    careGuide:
      "Berikan pupuk booster klengkeng saat pohon sudah siap berbunga. Siram rutin.",
  },
  {
    id: 20,
    name: "Bibit Klengkeng Merah",
    price: 85000,
    images: [
      "https://picsum.photos/seed/longan2/400/400",
      "https://picsum.photos/seed/longan2b/400/400",
    ],
    category: "Klengkeng",
    rating: 4.9,
    description:
      "Klengkeng unik dengan warna kulit buah, daun, dan batang yang berwarna merah.",
    fruitFeatures: "Kulit merah eksotis, rasa manis, aroma harum.",
    plantFeatures:
      "Pohon eksotis, sangat cantik untuk tanaman hias sekaligus konsumsi.",
    plantingGuide:
      "Bisa ditanam di pot. Pastikan mendapat sinar matahari penuh agar warna merah muncul.",
    careGuide:
      "Pupuk NPK rutin. Jaga dari serangan kelelawar saat buah mulai matang.",
  },

  // Sawo
  {
    id: 21,
    name: "Bibit Sawo Mamey Sapote",
    price: 250000,
    images: [
      "https://picsum.photos/seed/sapote1/400/400",
      "https://picsum.photos/seed/sapote1b/400/400",
    ],
    category: "Sawo",
    rating: 4.9,
    description:
      "Sawo raksasa asal Meksiko dengan rasa yang sangat unik seperti campuran ubi cilembu dan pepaya.",
    fruitFeatures:
      "Ukuran sangat besar, daging buah berwarna merah jingga, rasa sangat manis dan lembut.",
    plantFeatures:
      "Pohon tumbuh lambat namun sangat kokoh, daun besar dan rimbun.",
    plantingGuide:
      "Tanam di lahan permanen karena tidak suka dipindah-pindah. Berikan pupuk organik tinggi.",
    careGuide:
      "Sabar dalam menunggu buah matang (bisa 9 bulan di pohon). Jaga ketersediaan air.",
  },

  // Jambu
  {
    id: 22,
    name: "Bibit Jambu Madu Deli",
    price: 45000,
    images: [
      "https://picsum.photos/seed/guava1/400/400",
      "https://picsum.photos/seed/guava1b/400/400",
    ],
    category: "Jambu",
    rating: 4.8,
    description:
      "Jambu air dengan tingkat kemanisan yang luar biasa, seperti madu.",
    fruitFeatures:
      "Warna hijau muda, tanpa biji, tekstur renyah, rasa sangat manis.",
    plantFeatures: "Sangat rajin berbuah, cocok untuk Tabulampot.",
    plantingGuide:
      "Gunakan pot diameter 50cm+. Media tanam campuran tanah dan pupuk kandang.",
    careGuide:
      "Penyiraman 2 kali sehari. Berikan pupuk perangsang buah secara rutin.",
  },
  {
    id: 23,
    name: "Bibit Jambu Kristal",
    price: 35000,
    images: [
      "https://picsum.photos/seed/guava2/400/400",
      "https://picsum.photos/seed/guava2b/400/400",
    ],
    category: "Jambu",
    rating: 4.7,
    description:
      "Jambu biji yang hampir tidak memiliki biji, sangat renyah dan segar.",
    fruitFeatures:
      "Daging buah putih, renyah seperti apel, biji sangat sedikit (<3%), rasa manis segar.",
    plantFeatures: "Pohon pendek, sangat produktif, tahan hama.",
    plantingGuide: "Tanam di tempat terbuka. Berikan pupuk dasar organik.",
    careGuide:
      "Bungkus buah dengan plastik sejak kecil untuk menghindari ulat buah. Pangkas rutin.",
=======
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
>>>>>>> 4887a46bac818c00bea35d97aa6a31d8ce7529a2
  },
];
