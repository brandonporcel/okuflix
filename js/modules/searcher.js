const d = document;
const w = window;
export function buscador() {
	const $searchInput = d.getElementById('search-input');
	d.addEventListener('keyup', async (e) => {
		if (e.target === $searchInput) {
			if (e.key === 'Enter') {
				const query = $searchInput.value.toLowerCase();
				$searchInput.value = '';
				$searchInput.focus();
				try {
					const key = 'c075c45e';
					const $templateContent = d.getElementById('query-template').content;
					const $fragment = d.createDocumentFragment();
					// $queryResultCtn.insertAdjacentHTML(
					// 	'afterbegin',
					// 	'<img class="loader" src="assets/img/loader.svg" alt="loader">'
					// );
					// $queryResultCtn.innerHTML =
					// 	'<img class="loader" src="assets/img/loader.svg" alt="loader">';
					d.querySelector('.query-ctn').classList.remove('none');
					d.querySelector('.query-ctn').innerHTML =
						'<img class="loader" src="assets/img/loader.svg" alt="loader">';
					w.scrollTo({
						behavior: 'smooth',
						top: 500,
						left: 0,
					});
					const res = await fetch(
						`http://www.omdbapi.com?t=${query}&apikey=${key}`
					);

					const movie = await res.json();
					if (movie.Response === 'False' || !res.ok) {
						throw new Error({
							status: res.status,
							statusText: res.statusText,
							movieName: query,
						});
					}

					$templateContent.getElementById(
						'query-title-result'
					).innerHTML = `'${query}'`;
					$templateContent.querySelector('.query-title').innerHTML =
						movie.Title;
					$templateContent.querySelector('.query-poster').alt = movie.Title;
					$templateContent.querySelector('.query-poster').src = movie.Poster;
					$templateContent.getElementById('query-year').innerHTML = movie.Year;
					$templateContent.getElementById('query-rated').innerHTML =
						movie.Rated;

					$templateContent.getElementById('query-country').innerHTML =
						movie.Country;
					$templateContent.querySelector('.query-plot').innerHTML = movie.Plot;
					$templateContent.getElementById('query-actors').innerHTML =
						movie.Actors;
					$templateContent.getElementById('query-writer').innerHTML =
						movie.Writer;
					$templateContent.getElementById('query-genre').innerHTML =
						movie.Genre;

					const $clone = d.importNode($templateContent, true);
					$fragment.appendChild($clone);
					d.querySelector('.query-ctn').innerHTML = '';
					d.querySelector('.query-ctn').appendChild($fragment);
				} catch (err) {
					d.querySelector(
						'.query-ctn'
					).innerHTML = `<marK>no encontramos informacion sobre la pelicula: '${query}'</marK>`;
				}
			}
		}
	});
}
