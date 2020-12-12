const d = document;
const $bsasSlider = d.querySelector('.bsas-slider');
const $animeSlider = d.querySelector('.anime-slider');
const getData = async () => {
	const baseUrl = 'http://www.omdbapi.com';
	const key = 'c075c45e';
	let i = 0;
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
			bsAsData.forEach((el) => {
				const bsAsDataTemplate = () => {
					$bsAsTemplate += `<figure class="slider-figure">
							<img class="slider-img" src="${el.Poster}" alt="${el.Title}" data-imdb-id="${el.imdbID}">
							<figcaption>
						</figcaption></figure>`;
					return $bsAsTemplate;
				};
				$bsasSlider.innerHTML = bsAsDataTemplate();
				animeData.forEach((elem) => {
					const animeDataTemplate = () => {
						for (i; i < animeData.length; i += 1) {
							$animeTemplate += `<figure class="slider-figure">
							<img class="slider-img" src="${animeData[i].Poster}" alt="${animeData[i].Title}" data-imdb-id="${animeData[i].imdbID}">
							<figcaption>
						</figcaption></figure>`;
						}
						return $animeTemplate;
					};
					$animeSlider.innerHTML = animeDataTemplate();
				});
			});
			// const bsAsDataTemplate = () => {
			// 	for (i; i < bsAsData.length; i += 1) {
			// 		$bsAsTemplate += `<figure class="slider-figure">
			// 				<img class="slider-img" src="${bsAsData[i].Poster}" alt="${bsAsData[i].Title}" data-imdb-id="${bsAsData[i].imdbID}">
			// 				<figcaption>
			// 			</figcaption></figure>`;
			// 	}
			// 	return $bsAsTemplate;
			// };
			// const animeDataTemplate = () => {
			// 	for (i; i < animeData.length; i += 1) {
			// 		$animeTemplate += `<figure class="slider-figure">
			// 				<img class="slider-img" src="${animeData[i].Poster}" alt="${animeData[i].Title}" data-imdb-id="${animeData[i].imdbID}">
			// 				<figcaption>
			// 			</figcaption></figure>`;
			// 	}
			// 	return $animeTemplate;
			// };
			// $animeSlider.innerHTML = animeDataTemplate();
			// $bsasSlider.innerHTML = bsAsDataTemplate();
		})
		.catch((err) => console.log(err));
};
d.addEventListener('DOMContentLoaded', () => {
	getData();
});
