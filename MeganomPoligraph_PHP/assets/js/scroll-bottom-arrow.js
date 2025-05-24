function scrollToNextSection() {
  const nextSection = document.querySelector(".home-services-container");
  if (nextSection) {
    window.scrollTo({
      top: nextSection.offsetTop - 64,
      behavior: "smooth",
    });
  }
}
