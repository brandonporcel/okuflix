export function consumingApi() {
	const d = document;
	const $sliders = d.querySelectorAll('.slider');
	const $bsasSlider = d.querySelector('.bsas-slider');
	const $animeSlider = d.querySelector('.anime-slider');
	const baseUrl = 'http://www.omdbapi.com';
	const key = 'c075c45e';
	let bsAsData;
	let animeData;
	let $bsAsTemplate = '';
	let $animeTemplate = '';
	Promise.all([
		fetch(`${baseUrl}?s=buenos+aires&apikey=${key}`),
		fetch(`${baseUrl}?s=anime&apikey=${key}`),
	])
		.then((responses) =>
			Promise.all(responses.map((eachResponse) => eachResponse.json()))
		)
		.then((json) => {
			bsAsData = json[0].Search;
			animeData = json[1].Search;
			$sliders.forEach((el) => {
				el.innerHTML =
					'<img class="loader" src="assets/img/loader.svg" alt="loader">';
				$bsasSlider.innerHTML =
					'<img class="loader" src="assets/img/loader.svg" alt="loader">';
				$animeSlider.innerHTML =
					'<img class="loader" src="assets/img/loader.svg" alt="loader">';
			});
			bsAsData.forEach((el) => {
				const bsAsDataTemplate = () => {
					$bsAsTemplate += `<figure class="slider-figure">
							<img class="slider-img" src="${el.Poster}" alt="${el.Title}" data-imdb-id="${el.imdbID}">
							<figcaption>
						</figcaption></figure>`;
					return $bsAsTemplate;
				};

				$bsasSlider.innerHTML = bsAsDataTemplate();
			});
			animeData.forEach((elem) => {
				const animeDataTemplate = () => {
					$animeTemplate += `<figure class="slider-figure">
						<img class="slider-img" src="${elem.Poster}" alt="${elem.Title}" data-imdb-id="${elem.imdbID}">
						<figcaption>
					</figcaption></figure>`;
					return $animeTemplate;
				};

				$animeSlider.innerHTML = animeDataTemplate();
			});
		})
		.catch((err) => console.log(err));
}
