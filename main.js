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

document.getElementById('morelink').addEventListener('click', function(event) {
  event.preventDefault();
});

//function for navigation bar to appear/disappear on phone screen
function toggleMenu() {
  const navMenu = document.getElementById("navMenu");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const closeIcon = document.getElementById("closeIcon");

  if (navMenu.classList.contains("responsive")) {
    navMenu.classList.remove("responsive");
    hamburgerIcon.style.display = "block";
    closeIcon.style.display = "none";
  } else {
    navMenu.classList.add("responsive");
    hamburgerIcon.style.display = "none";
    closeIcon.style.display = "block";
  }
}

// close the menu when clicked on any section on the menu
document.querySelectorAll("#navMenu a").forEach(link => {
  link.addEventListener('click', () => {
    const navMenu = document.getElementById("navMenu");
    const hamburgerIcon = document.getElementById("hamburgerIcon");
    const closeIcon = document.getElementById("closeIcon");
    navMenu.classList.remove("responsive");
    hamburgerIcon.style.display = "block";
    closeIcon.style.display = "none";
});
});


//submit the data to mongodb
document.getElementById("contactForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const data = {
    name: name,
    email: email,
    message: message,
  };


  fetch("https://my-website-9knu.onrender.com/post", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log("Success");
      alert('Message successfully sent');
    })
    .catch((error) => {
      console.error(error);
      alert("Error sending message");
    });
});


