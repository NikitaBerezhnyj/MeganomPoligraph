export const scrollToSection = (sectionId, offset = 64) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth"
    });
  } else {
    console.error(`Element with id ${sectionId} not found.`);
  }
};
