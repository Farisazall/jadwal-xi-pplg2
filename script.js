/* ================= MENGAMBIL ELEMENT HTML ================= */

const pilihanHari = document.getElementById("hari");

const jadwal = document.getElementById("jadwal");

const search = document.getElementById("search");

const hariIniText = document.getElementById("hariIni");

const hariIniBtn = document.getElementById("hariIniBtn");

const jumlahMapel = document.getElementById("jumlahMapel");

const jumlahJam = document.getElementById("jumlahJam");

const namaHariStat = document.getElementById("namaHariStat");

const modeBtn = document.getElementById("modeBtn");


/* ================= DATA JADWAL ================= */

const dataJadwal = {

    senin: [

        ["Bahasa Indonesia", "Jam ke 1-3"],

        ["Sejarah", "Jam ke 4-5"],

        ["KIK", "Jam ke 6-8"],

        ["Bahasa Jawa", "Jam ke 9-10"]

    ],


    selasa: [

        ["PAI", "Jam ke 1-3"],

        ["BK", "Jam ke 4"],

        ["Mapil Game", "Jam ke 5-8"],

        ["PBO (Pemrograman Berorientasi Objek)", "Jam ke 9-11"]

    ],


    rabu: [

        ["PJOK", "Jam ke 1-2"],

        ["KIK", "Jam ke 3-4"],

        ["Web & Perangkat", "Jam ke 5-8"],

        ["Matematika", "Jam ke 9-8"]

    ],


    kamis: [

        ["PPKN", "Jam ke 1-2"],

        ["Bahasa Inggris", "Jam ke 3-4"],

        ["Web & Perangkat", "Jam ke 5-7"],

        ["Basis Data", "Jam ke 8-11"]

    ],


    jumat: [

        ["PBO (Pemrograman Berorientasi Objek)", "Jam ke 1-4"],

        ["Bahasa Inggris", "Jam ke 5-6"]

    ]

};


/* ================= NAMA HARI ================= */

const namaHari = {

    senin: "Senin",

    selasa: "Selasa",

    rabu: "Rabu",

    kamis: "Kamis",

    jumat: "Jumat"

};


/* ================= MENENTUKAN HARI SEKARANG ================= */

const tanggal = new Date();

const nomorHari = tanggal.getDay();


const daftarHari = [

    "minggu",

    "senin",

    "selasa",

    "rabu",

    "kamis",

    "jumat",

    "sabtu"

];


const hariSekarang = daftarHari[nomorHari];


if (namaHari[hariSekarang]) {

    hariIniText.textContent = namaHari[hariSekarang];

} else {

    hariIniText.textContent = "Libur";

}


/* ================= FUNGSI MENAMPILKAN JADWAL ================= */

function tampilkanJadwal(hari) {


    /* Kalau belum memilih hari */

    if (!hari) {

        jadwal.innerHTML = `

            <div class="pesan">

                <div class="icon">
                    🗓️
                </div>

                <h3>
                    Belum ada hari yang dipilih
                </h3>

                <p>
                    Pilih hari di atas untuk melihat jadwal pelajaran.
                </p>

            </div>

        `;


        jumlahMapel.textContent = "0";

        jumlahJam.textContent = "0";

        namaHariStat.textContent = "-";

        return;

    }


    const daftar = dataJadwal[hari];


    /* JUMLAH MAPEL */

    jumlahMapel.textContent = daftar.length;


    /* NAMA HARI */

    namaHariStat.textContent = namaHari[hari];


    /* ================= HITUNG JAM ================= */

    let totalJam = 0;


    daftar.forEach(function(mapel) {

        const teksJam = mapel[1]
            .replace("Jam ke ", "")
            .split("-");


        if (teksJam.length === 2) {

            const awal = parseInt(teksJam[0]);

            const akhir = parseInt(teksJam[1]);


            if (!isNaN(awal) && !isNaN(akhir)) {

                if (akhir >= awal) {

                    totalJam += akhir - awal + 1;

                }

            }

        } else {

            totalJam += 1;

        }

    });


    jumlahJam.textContent = totalJam;


    /* TAMPILKAN */

    buatTampilanJadwal(hari, daftar);

}


/* ================= MEMBUAT TAMPILAN ================= */

function buatTampilanJadwal(hari, daftar) {


    let isiJadwal = "";


    daftar.forEach(function(mapel, index) {


        isiJadwal += `

            <div class="mapel">

                <div class="nomor">
                    ${index + 1}
                </div>


                <div class="info">

                    <div class="nama">
                        ${mapel[0]}
                    </div>


                    <div class="jam">
                        🕐 ${mapel[1]}
                    </div>

                </div>

            </div>

        `;

    });


    jadwal.innerHTML = `

        <div class="judul-hari">

            <h2>
                📅 ${namaHari[hari]}
            </h2>

            <p>
                Jadwal mata pelajaran hari ${namaHari[hari]}
            </p>

        </div>


        <div class="daftar-mapel">

            ${isiJadwal}

        </div>

    `;

}


/* ================= PILIH HARI ================= */

pilihanHari.addEventListener("change", function() {


    const hari = pilihanHari.value;


    /* Kosongkan pencarian */

    search.value = "";


    /* Tampilkan jadwal */

    tampilkanJadwal(hari);

});


/* ================= TOMBOL JADWAL HARI INI ================= */

hariIniBtn.addEventListener("click", function() {


    if (dataJadwal[hariSekarang]) {


        pilihanHari.value = hariSekarang;


        search.value = "";


        tampilkanJadwal(hariSekarang);


        window.scrollTo({

            top: 250,

            behavior: "smooth"

        });


    } else {


        alert("Hari ini tidak ada jadwal sekolah.");

    }

});


/* ================= SEARCH ================= */

search.addEventListener("input", function() {


    const kata = search.value
        .toLowerCase()
        .trim();


    const hari = pilihanHari.value;


    /* Kalau belum memilih hari */

    if (!hari) {

        return;

    }


    const daftar = dataJadwal[hari];


    /* Cari mapel */

    const hasil = daftar.filter(function(mapel) {

        return mapel[0]
            .toLowerCase()
            .includes(kata);

    });


    /* Kalau tidak ditemukan */

    if (hasil.length === 0) {


        jadwal.innerHTML = `

            <div class="pesan">

                <div class="icon">
                    🔎
                </div>

                <h3>
                    Mapel tidak ditemukan
                </h3>

                <p>
                    Tidak ada mata pelajaran yang cocok dengan pencarianmu.
                </p>

            </div>

        `;


        return;

    }


    /* Tampilkan hasil */

    buatTampilanJadwal(hari, hasil);

});


/* ================================================= */
/* ================= MODE GELAP ==================== */
/* ================================================= */


modeBtn.addEventListener("click", function() {


    /* Tambah / hapus class dark */

    document.body.classList.toggle("dark");


    /* Cek apakah sekarang mode gelap */

    if (document.body.classList.contains("dark")) {


        modeBtn.textContent = "☀️ Mode Terang";


    } else {


        modeBtn.textContent = "🌙 Mode Gelap";

    }

});