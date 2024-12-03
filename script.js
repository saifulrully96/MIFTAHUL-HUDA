// Menyimpan elemen canvas dan konteks gambar
const canvas = document.getElementById('twibbonCanvas');
const ctx = canvas.getContext('2d');

// Variabel untuk gambar yang diunggah
let uploadedImage = null;
let imgX = 0, imgY = 0, imgWidth = 600, imgHeight = 900;
let isDragging = false;
let startX, startY;

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
            drawImage();
        }
        uploadedImage.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);
});

// Fungsi untuk menggambar gambar di canvas
function drawImage() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan canvas
    if (uploadedImage) {
        ctx.drawImage(uploadedImage, imgX, imgY, imgWidth, imgHeight);
    }
}

// Mengatur interaksi drag untuk menggeser gambar
canvas.addEventListener('mousedown', (e) => {
    if (e.offsetX > imgX && e.offsetX < imgX + imgWidth && e.offsetY > imgY && e.offsetY < imgY + imgHeight) {
        isDragging = true;
        startX = e.offsetX - imgX;
        startY = e.offsetY - imgY;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        imgX = e.offsetX - startX;
        imgY = e.offsetY - startY;
        drawImage(); // Gambar ulang setelah posisi gambar berubah
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false; // Hentikan drag saat mouse dilepas
});

canvas.addEventListener('mouseout', () => {
    isDragging = false; // Hentikan drag jika mouse keluar dari canvas
});

// Mengatur interaksi zoom untuk memperbesar atau memperkecil gambar
canvas.addEventListener('wheel', (e) => {
    const scaleFactor = 1.1; // Faktor zoom
    if (e.deltaY < 0) {
        imgWidth *= scaleFactor;
        imgHeight *= scaleFactor;
    } else {
        imgWidth /= scaleFactor;
        imgHeight /= scaleFactor;
    }
    drawImage(); // Gambar ulang setelah ukuran gambar berubah
});
