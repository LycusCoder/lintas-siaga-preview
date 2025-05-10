# 🚨 Lintas Siaga — React Preview (Frontend)

[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg?style=flat-square)](https://github.com/nama_pengguna/lintas-siaga-preview/actions)
[![Live Demo](https://img.shields.io/badge/Demo-Live-blue?style=flat-square&logo=vercel)](https://lintas-siaga-preview.vercel.app/)
[![React Version](https://img.shields.io/badge/React-%3E=18.x-blue.svg?style=flat-square)](https://react.dev/)
[![License](https://img.shields.io/github/license/nama_pengguna/lintas-siaga-preview?style=flat-square)](https://github.com/nama_pengguna/lintas-siaga-preview/blob/main/LICENSE)

Ini adalah **preview frontend React** dari proyek *Lintas Siaga*, yaitu sistem informasi kebencanaan untuk masyarakat dan relawan di daerah rawan bencana. Aplikasi ini berfokus pada tampilan publik dan interaktif menggunakan React, serta terhubung ke backend Laravel melalui REST API.

---

## ⚛️ Teknologi yang Digunakan

- **Frontend:** [React.js](https://react.dev/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Routing:** [React Router](https://reactrouter.com/)
- **State Management:** [Context API] / [Redux] (opsional)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/) / [Font Awesome](https://fontawesome.com/)
- **Peta dan Lokasi:** [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)

---

## 🌐 Fitur yang Ditampilkan di Preview

- 🗺️ **Dashboard Peta Bencana**
- ⚠️ **Form Pelaporan Bencana**
- 🏠 **Daftar Posko dan Kebutuhan**
- 🧑‍🤝‍🧑 **Profil dan Filter Relawan**
- 🔔 **Antarmuka Notifikasi (Dummy)**
- 📱 **Tampilan Responsif untuk Mobile**

> ⚠️ **Catatan:** Ini adalah versi *preview publik* dari antarmuka pengguna. Fitur admin dan otentikasi belum diaktifkan dalam versi ini.

---

## 🚀 Instalasi Lokal

```bash
# Clone repositori
git clone https://github.com/nama_pengguna/lintas-siaga-preview.git
cd lintas-siaga-preview

# Instal dependensi
npm install

# Jalankan server pengembangan
npm run dev
````

Pastikan file `.env` disesuaikan jika menghubungkan ke backend Laravel:

```bash
VITE_API_BASE_URL=https://api.lintas-siaga.tech/api
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_API_KEY
```

---

## 📁 Struktur Direktori

```bash
src/
├── assets/          # Gambar, ikon, dan statis lainnya
├── components/      # Komponen UI (Map, Navbar, etc)
├── pages/           # Halaman utama (Home, Posko, Relawan, etc)
├── routes/          # Konfigurasi routing React Router
├── services/        # File untuk API/axios handler
└── App.jsx          # Root App
```

---

## 📸 Screenshot

> Tambahkan cuplikan UI (opsional)

---

## 🧪 Testing (Opsional)

> *Belum tersedia di versi preview ini.* Dapat ditambahkan menggunakan:

* React Testing Library
* Vitest / Jest

---

## 🤝 Kontribusi

Kontribusi sangat terbuka! Jika Anda ingin membantu:

1. Fork repositori ini.
2. Buat branch fitur (`feat/nama-fitur`).
3. Commit dan push.
4. Ajukan Pull Request.

---

## 📜 Lisensi

[MIT License](./LICENSE)

---

## 📧 Kontak

Jika ada pertanyaan atau ingin berdiskusi:

* 📫 Email: [affif@nourivex.tech](mailto:affif@nourivex.tech)
* 🧑‍💻 GitHub: [@LycusCoder](https://github.com/LycusCoder)
* 💼 LinkedIn: [nourivex](https://linkedin.com/in/nourivex)


