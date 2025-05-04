document.addEventListener('DOMContentLoaded', function () {
    emailjs.init("BRInTh0xHPku6Lr0u");
  
    const contactForm = document.getElementById("contact-form");
    const popup = document.getElementById("popup-modal");
    const popupMessage = document.getElementById("popup-message");
    const closeBtn = document.getElementById("popup-close");
  
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      emailjs.sendForm("service_9tikiur", "template_wkrj4gh", contactForm)
        .then(
          function (response) {
            console.log("Email sent successfully", response);
            showPopup("Message envoyé avec succès !", false);
            contactForm.reset();
          },
          function (error) {
            console.error("Email sending failed", error);
            showPopup("Une erreur est survenue. Veuillez réessayer.", true);
          }
        );
    });
  
    function showPopup(message, isError) {
      popupMessage.textContent = message;
      popup.classList.toggle("error", isError);
      popup.classList.add("show");
    }
  
    closeBtn.addEventListener("click", function () {
      popup.classList.remove("show", "error");
    });
  });
  