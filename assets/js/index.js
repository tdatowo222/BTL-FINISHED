
let index = 1;
let interval;

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {index = 1}
    if (n < 1) {index = slides.length}
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    
    slides[index-1].style.display = "block";
    dots[index-1].className += " active-dot";
}

function change(n) {
    clearInterval(interval);
    showSlides(index += n);
    startAutoSlide();
}

function current(n) {
    clearInterval(interval);
    showSlides(index = n);
    startAutoSlide();
}

function startAutoSlide() {
    interval = setInterval(() => {
        index++;
        showSlides(index);
    }, 5000); // Chuyển slide sau mỗi 5 giây
}

// Khởi tạo slideshow
showSlides(index);
startAutoSlide();
