const d = document;
export function contenidoPrincipal() {
	const $movieInfo = d.getElementById('movie-info');
	const $movieTitle = d.getElementById('movie-title');
	const $navItems = d.querySelectorAll('.main-nav-item');
	const api = async () => {
		try {
			const res = await fetch(
				'http://www.omdbapi.com/?t=bojack+horseman+&apikey=c075c45e'
			);
			if (!res.ok) {
				throw new Error({
					status: res.status,
					statusText: res.statusText,
				});
			}
			const bojackInfo = await res.json();
			$movieInfo.innerHTML = bojackInfo.Plot;
			$movieTitle.innerHTML = bojackInfo.Title;
		} catch (err) {
			console.log(err);
			const message = err.statusText || 'ocurrio un fallo con la informacion';
			$movieTitle.classList.add('error');
			$movieTitle.innerHTML = `error ${err.status}: ${message}`;
		}
	};
	api();
	const nav = () => {
		d.querySelector('.nav-first-item').classList.add('active');
		$navItems.forEach((item) => {
			item.addEventListener('click', (e) => {
				// if (!e.target.classList.contains('active')) {
				// // e.target.classList.remove('active');
				if (!e.target.matches('nav-first-item')) {
					e.target.classList.add('active');
				}
				if (e.target.matches('.nav-first-item')) {
					e.target.classList.add('active');
				} else {
					d.querySelector('.nav-first-item').classList.remove('active');
				}
				// } else {
				// d.querySelector('.nav-first-item').classList.add('active');
				// }
			});
		});
	};
	nav();
}
