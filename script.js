document.addEventListener('DOMContentLoaded', () => {
	// Générer le calendrier statiquement
	const days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
	const calendar = document.getElementById('calendar');
  
	// En-têtes
	calendar.innerHTML +=
	  '<div class="cell header"></div>' +
	  days.map(d => `<div class="cell header">${d}</div>`).join('');
  
	// Heures
	for (let h = 10; h <= 18; h++) {
	  calendar.innerHTML += `<div class="cell time">${h}h</div>`;
	  days.forEach(day => {
		let classes = 'cell';
		if (day === 'Lundi' || day === 'Mardi') classes += ' disabled';
		if (day === 'Jeudi' && h >= 14) classes += ' disabled';
		const text = classes.includes('disabled') ? '' : '✓';
		calendar.innerHTML += `<div class="${classes}" data-day="${day}" data-hour="${h}">${text}</div>`;
	  });
	}
  
	// Référence au modal de saisie
	const modal = document.getElementById('modal');
	const title = document.getElementById('modal-title');
	let selected = {};
  
	// Référence au pop-up de confirmation
	const popupModal = document.getElementById('popup-modal');
	const popupMessage = document.getElementById('popup-message');
	const popupClose = document.getElementById('popup-close');
  
	// Ouvrir le modal de saisie au clic sur une case disponible
	calendar.addEventListener('click', e => {
	  const c = e.target;
	  if (
		c.classList.contains('cell') &&
		!c.classList.contains('disabled') &&
		!c.classList.contains('header') &&
		!c.classList.contains('time')
	  ) {
		selected.day = c.dataset.day;
		selected.hour = c.dataset.hour;
		title.textContent = `Réserver le ${selected.day} à ${selected.hour}h ?`;
		modal.style.display = 'flex';
	  }
	});
  
	// Fermer le modal de saisie
	document.getElementById('modal-cancel').onclick = () => {
	  modal.style.display = 'none';
	};
  
	// Envoyer la réservation et afficher le pop-up
	document.getElementById('modal-submit').onclick = () => {
	  const name = document.getElementById('modal-name').value;
	  const email = document.getElementById('modal-email').value;
  
	  if (!name || !email) {
		// Si champ manquant, on affiche un message d’erreur dans le pop-up
		showPopup('❗ Nom et email obligatoires.', true);
		return;
	  }
  
	  const templateParams = {
		name,
		email,
		day: selected.day,
		hour: selected.hour,
		time: `${selected.day} à ${selected.hour}h`,
		message: `Nouvelle réservation le ${selected.day} à ${selected.hour}h.`
	  };
  
	  emailjs.send('service_9tikiur', 'template_wkrj4gh', templateParams)
		.then(() => {
		  // Succès → message vert
		  showPopup('✅ Réservation envoyée avec succès !', false);
		  modal.style.display = 'none';
		  // Réinitialiser les champs
		  document.getElementById('modal-name').value = '';
		  document.getElementById('modal-email').value = '';
		})
		.catch(err => {
		  console.error(err);
		  // Erreur → message rouge
		  showPopup('❌ Erreur lors de l’envoi. Veuillez réessayer.', true);
		});
	};
  
	// Fermer le pop-up quand on clique sur le bouton
	popupClose.addEventListener('click', () => {
	  popupModal.classList.remove('show', 'error');
	});
  
	// Fonction utilitaire pour afficher le pop-up
	function showPopup(message, isError) {
	  popupMessage.textContent = message;
	  popupModal.classList.toggle('error', isError);
	  popupModal.classList.add('show');
	}
  
	// (Le reste de ton script inchangé)
	// Retour en haut
	const toTop = document.getElementById('toTop');
	window.addEventListener('scroll', () => {
	  toTop.style.display = window.scrollY > 300 ? 'block' : 'none';
	});
	toTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  
	// Animations par Intersection Observer
	const sections = document.querySelectorAll('.section');
	const observer = new IntersectionObserver(entries => {
	  entries.forEach(entry => {
		if (entry.isIntersecting) entry.target.classList.add('visible');
	  });
	}, { threshold: 0.1 });
	sections.forEach(sec => observer.observe(sec));
  
	// Toggle FAQ
	document.querySelectorAll('.faq .question').forEach(q => {
	  q.addEventListener('click', () => {
		const ans = q.nextElementSibling;
		ans.style.maxHeight = ans.style.maxHeight ? null : ans.scrollHeight + 'px';
	  });
	});
  });
  