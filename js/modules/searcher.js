const d = document;
const w = window;
export function buscador() {
	const $searchInput = d.getElementById('search-input');
	const $queryResultCtn = d.getElementById('query-result-ctn');
	d.addEventListener('keyup', async (e) => {
		if (e.target === $searchInput) {
			if (e.key === 'Enter') {
				try {
					const query = $searchInput.value.toLowerCase();
					const key = 'c075c45e';
					// $queryResultCtn.insertAdjacentHTML(
					// 	'afterbegin',
					// 	'<img class="loader" src="assets/img/loader.svg" alt="loader">'
					// );
					// $queryResultCtn.innerHTML =
					// 	'<img class="loader" src="assets/img/loader.svg" alt="loader">';
					d.querySelector('.query-ctn').classList.remove('none');
					w.scrollTo({
						behavior: 'smooth',
						top: 500,
						left: 0,
					});
					const res = await fetch(
						`http://www.omdbapi.com?t=${query}&apikey=${key}`
					);
					const movie = await res.json();
					if (!res.ok) {
						throw new Error({
							status: res.status,
							statusText: res.statusText,
						});
					}
					console.log(res);
					console.log(movie);
					// $queryResultCtn.innerHTML = '';
					// $queryResultCtn.insertAdjacentHTML('afterbegin', '');
					d.querySelector('.query-title').innerHTML = movie.Title;
					d.querySelector('.query-poster').src = movie.Poster;
					d.querySelector('.query-poster').alt = movie.Title;
					d.querySelector('.query-plot').innerHTML = movie.Plot;
					d.getElementById('query-actors').innerHTML = movie.Actors;
					d.getElementById('query-writer').innerHTML = movie.Writer;
					d.getElementById('query-genre').innerHTML = movie.Genre;
				} catch (err) {
					const message = err.statusText || 'ocurrio un error';
					$queryResultCtn.classList.add('error');
					$queryResultCtn.innerHTML = `error ${err.status}: ${message}`;
				}
			}
		}
	});
}
