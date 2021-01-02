const d = document;
export function contenidoPrincipal() {
	const $detailsCtn = d.getElementById('details-view');
	const $overviewCtn = d.getElementById('overview-view');
	const api = async () => {
		const $movieInfo = d.getElementById('movie-info');
		const $movieTitle = d.getElementById('movie-title');
		try {
			const res = await fetch(
				'https://www.omdbapi.com/?t=bojack+horseman+&apikey=c075c45e'
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

			d.getElementById('poster').src = bojackInfo.Poster;
			d.getElementById('poster').alt = bojackInfo.Title;
			d.getElementById('year').innerHTML = bojackInfo.Year;
			d.getElementById('rated').innerHTML = bojackInfo.Rated;
			d.getElementById(
				'total-seasons'
			).innerHTML = `${bojackInfo.totalSeasons} temporadas`;
			d.getElementById('writer').innerHTML = bojackInfo.Writer;
			d.getElementById('actors').innerHTML = bojackInfo.Actors;
			d.getElementById('genre').innerHTML = bojackInfo.Genre;
		} catch (err) {
			const message = err.statusText || 'ocurrio un fallo con la informacion';
			$movieTitle.classList.add('error');
			$movieTitle.innerHTML = `error ${err.status}: ${message}`;
		}
	};
	const nav = () => {
		const $overviewBtn = d.querySelector('.nav-first-item');
		const $detailsBtn = d.querySelector('.nav-second-item');
		d.querySelector('.nav-first-item').classList.add('active');
		d.addEventListener('click', (e) => {
			if (e.target === $overviewBtn) {
				e.target.classList.add('active');
				$detailsBtn.classList.remove('active');
				$detailsCtn.classList.add('none');
				$overviewCtn.classList.remove('none');
			}
			if (e.target === $detailsBtn) {
				e.target.classList.add('active');
				$overviewBtn.classList.remove('active');
				$overviewCtn.classList.add('none');
				$detailsCtn.classList.remove('none');
			}
		});
	};
	d.querySelector('.logo-ctn').addEventListener('click', () => {
		window.scrollTo({
			behavior: 'smooth',
			left: 0,
			top: 0,
		});
	});
	api();
	nav();
}
