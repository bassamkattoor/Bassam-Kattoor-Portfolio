// Theme toggle (persists)
(function theme() {
	const root = document.documentElement;
	const buttons = Array.from(document.querySelectorAll('#themeToggle'));
	const saved = localStorage.getItem('theme');
	if (saved === 'light') root.classList.add('light');
	updateIcons();
	buttons.forEach(btn => btn.addEventListener('click', () => {
		root.classList.toggle('light');
		localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
		updateIcons();
	}));
	function updateIcons() {
		const isLight = root.classList.contains('light');
		buttons.forEach(b => b.textContent = isLight ? '🌞' : '🌙');
	}
})();

// Smooth internal fade transitions
(function transitions() {
	function navigateWithFade(url) {
		document.body.classList.add('fade-out');
		setTimeout(() => { window.location.href = url; }, 280);
	}
	document.querySelectorAll('a[href], button[data-link]').forEach(el => {
		const url = el.tagName === 'A' ? el.getAttribute('href') : el.getAttribute('data-link');
		if (!url || url.startsWith('http') || url.startsWith('mailto:')) return;
		el.addEventListener('click', (e) => { e.preventDefault(); navigateWithFade(url); });
	});
})();

// Animate skill bars when visible
(function skillBars() {
	const bars = document.querySelectorAll('.bar');
	if (!bars.length) return;
	const io = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if (!entry.isIntersecting) return;
			const el = entry.target;
			const p = Math.max(0, Math.min(100, Number(el.dataset.percent || 0)));
			el.classList.add('anim');
			el.style.setProperty('--w', p + '%');
			const label = el.querySelector('b');
			if (label) label.textContent = p + '%';
			obs.unobserve(el);
		});
	}, { threshold: 0.35 });
	bars.forEach(b => io.observe(b));
	const style = document.createElement('style');
	style.textContent = `.bar.anim::before{width:var(--w);transition:width 1.2s ease}`;
	document.head.appendChild(style);
})();

// Quick message chips -> fill textarea with a mini type effect
(function quickChips() {
	const form = document.getElementById('contactForm');
	if (!form) return;
	const chips = form.querySelectorAll('.chip');
	const message = form.querySelector('textarea[name="message"]');
	if (!chips.length || !message) return;

	function typeInsert(text) {
		message.value = '';
		const chars = text.split('');
		let i = 0;
		function tick() {
			message.value += chars[i++] || '';
			if (i < chars.length) requestAnimationFrame(tick);
		}
		requestAnimationFrame(tick);
		message.focus();
	}

	chips.forEach(ch => {
		ch.addEventListener('click', () => {
			chips.forEach(c => c.classList.remove('active'));
			ch.classList.add('active');
			typeInsert(ch.getAttribute('data-text') || ch.textContent.trim());
		});
	});
})();

// Compliment button
(function compliments() {
	const btn = document.getElementById('randomCompliment');
	const out = document.getElementById('complimentText');
	if (!btn || !out) return;
	const lines = [
		"Clean vibes. Strong entrance.",
		"Your future pull requests will be spicy.",
		"Fast learner detected. Proceed to greatness.",
		"Minimal but memorable. Nice."
	];
	btn.addEventListener('click', () => {
		out.textContent = lines[Math.floor(Math.random() * lines.length)];
	});
})();

// Footer year
(function year() {
	const y = document.getElementById('year');
	if (y) y.textContent = new Date().getFullYear();
})();

// Onion Easter Egg
(function onionEasterEgg() {
	const rain = document.getElementById('onionRain');
	if (!rain) return;
	function drop() {
		const o = document.createElement('div');
		o.className = 'onion';
		o.textContent = '🧅';
		o.style.left = Math.random() * 100 + 'vw';
		o.style.animationDuration = (2 + Math.random() * 1.8) + 's';
		rain.appendChild(o);
		setTimeout(() => o.remove(), 4000);
	}
	let active = false;
	function launch() {
		if (active) return;
		active = true;
		let n = 0;
		const t = setInterval(() => { drop(); n++; if (n > 24) { clearInterval(t); active = false; } }, 80);
	}
	window.addEventListener('keydown', (e) => { if (e.key.toLowerCase() === 'o') launch(); });
})();