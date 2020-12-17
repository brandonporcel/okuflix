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
					$queryResultCtn.innerHTML =
						'<img class="loader" src="assets/img/loader.svg" alt="loader">';
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
				} catch (err) {
					const message = err.statusText || 'ocurrio un err';
					$queryResultCtn.classList.add('error');
					$queryResultCtn.innerHTML = `error ${err.status}: ${message}`;
				}
			}
		}
	});
}
