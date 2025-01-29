function toggleContactSection() {
  const contactSection = document.getElementById("contactSection");
  contactSection.classList.toggle("hidden");
  contactSection.classList.toggle("visible");
}

document.getElementById("contactBtn").addEventListener("click", function (event) {
  event.preventDefault();
  toggleContactSection();
});

document.getElementById("closeBtn").addEventListener("click", function () {
  toggleContactSection();
});