// let currentSlide = 0;
// const slides = document.querySelectorAll('.hero-image');

// function showSlide(index) {
//     slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
// }

// function moveSlide(step) {
//     currentSlide = (currentSlide + step + slides.length) % slides.length;
//     showSlide(currentSlide);
// }

// setInterval(() => moveSlide(1), 5000); // Auto rotate every 5 seconds
// showSlide(currentSlide);
const video = document.querySelector(".hero-video video");

video.addEventListener("mouseenter", () => {
    video.play();  // Play the video when hovered
    video.muted =  false;
    video.volume  = 0.1;
});

video.addEventListener("mouseleave", () => {
    video.pause();  // Pause the video when mouse leaves
    video.muted =  true;

});
