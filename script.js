// Menyimpan elemen canvas dan konteks gambar
const canvas = document.getElementById('twibbonCanvas');
const ctx = canvas.getContext('2d');

// Variabel untuk gambar template dan gambar yang diunggah
let twibbonImage = new Image();
let uploadedImage = null;
let imgX = 0, imgY = 0, imgWidth = 600, imgHeight = 900;
let isDragging = false;
let startX, startY;

// Muat gambar twibbon sebagai template
twibbonImage.src = 'twibbon.png'; // Pastikan path gambar twibbon benar
twibbonImage.onload = function() {
    drawImage(); // Gambar twibbon ketika gambar selesai dimuat
};

// Event listener untuk mengunggah foto
document.getElementById('uploadPhoto').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        // Membuat objek gambar dari file yang diunggah
        uploadedImage = new Image();
        uploadedImage.onload = function() {
            // Setelah gambar selesai dimuat, gambar di canvas
            imgWidth = uploadedImage.width;
            imgHeight = uploadedImage.height;
            imgX = (canvas.width - imgWidth) / 2;
            imgY = (canvas.height - imgHeight) / 2;
            drawImage(); // Gambar ulang setelah gambar diunggah
        }
        uploadedImage.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

// Fungsi untuk menggambar gambar di canvas
function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas
    if (twibbonImage) {
        ctx.drawImage(twibbonImage, 0, 0, canvas.width, canvas.height); // Gambar template twibbon
    }
    if (uploadedImage) {
        ctx.drawImage(uploadedImage, imgX, imgY, imgWidth, imgHeight); // Gambar gambar yang diunggah
    }
}

// Fungsi untuk memindahkan gambar yang diunggah ke bawah desain twibbon
document.getElementById('moveToBottom').addEventListener('click', function() {
    if (uploadedImage) {
        // Pindahkan gambar ke bawah twibbon
        imgY = canvas.height - imgHeight - 50; // Pindahkan ke bawah dengan jarak 50px dari bagian bawah canvas
        drawImage(); // Gambar ulang setelah gambar dipindahkan
    }
});

// Fungsi untuk mendownload gambar hasil canvas
document.getElementById('downloadImage').addEventListener('click', function() {
    const dataURL = canvas.toDataURL('image/png'); // Menghasilkan data URL gambar PNG
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'twibbon_result.png'; // Nama file hasil unduhan
    link.click(); // Mengunduh gambar
});
