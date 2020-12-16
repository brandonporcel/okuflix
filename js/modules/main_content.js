const d = document;
export function contenidoPrincipal() {
	const api = async () => {
		const $movieInfo = d.getElementById('movie-info');
		const $movieTitle = d.getElementById('movie-title');
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
	const llamadoDetalles = async () => {
		const $contentCtn = d.getElementById('main-content');
		// hago esto porque si el contenedor le pondo un innerhtml=algo,los elementos con absolute no se eliminan
		// const $absoluteElems = d.querySelectorAll('.absolute-remove-js');
		// $absoluteElems.forEach((el) => {
		// 	el.remove();
		// });
		try {
			const res = await fetch('../../pages/detalles.html');
			const text = await res.text();
			$contentCtn.innerHTML = text;
			// console.log('xDDd');
		} catch (err) {
			console.log(err);
		}
	};
	const nav = () => {
		d.querySelector('.nav-first-item').classList.add('active');
		d.addEventListener('click', (e) => {
			if (e.target.matches('.nav-first-item')) {
				e.target.classList.add('active');
				d.querySelector('.nav-second-item').classList.remove('active');
			}
			if (e.target.matches('.nav-second-item')) {
				e.target.classList.add('active');
				d.querySelector('.nav-first-item').classList.remove('active');
				llamadoDetalles();
			}
		});
	};
	api();
	nav();
}
