const d = document;
const $slider = d.querySelectorAll('.slider');
const $rankSlider = d.querySelector('.rank-slider');
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
			const bsAsDataTemplate = () => {
				for (i; i < bsAsData.length; i += 1) {
					$bsAsTemplate += `<figure class="slider-figure">
							<img class="slider-img" src="${bsAsData[i].Poster}" alt="${bsAsData[i].Title}" data-imdb-id="${bsAsData[i].imdbID}">
							<figcaption>
						</figcaption></figure>`;
				}
				return $bsAsTemplate;
			};
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
			$rankSlider.innerHTML = bsAsDataTemplate();

			// for (i; i < bsAsData.length; i += 1) {
			// 	$bsAsTemplate += `<figure class="slider-figure">
			// 		<img class="slider-img" src="${bsAsData[i].Poster}" alt="${bsAsData[i].Title}" data-imdb-id="${bsAsData[i].imdbID}">
			// 		<figcaption>
			// 	</figcaption></figure>`;
			// }
			// for (i; i < animeData.length; i += 1) {
			// 	$animeTemplate += `<figure class="slider-figure">
			// 		<img class="slider-img" src="${animeData[i].Poster}" alt="${animeData[i].Title}" data-imdb-id="${animeData[i].imdbID}">
			// 		<figcaption>
			// 	</figcaption></figure>`;
			// 	console.log($animeTemplate);
			// 	console.log(i);
			// }

			// console.log(animeData);
			// $animeSlider.innerHTML = $animeTemplate;
			// $rankSlider.innerHTML = $bsAsTemplate;
		})
		.catch((err) => console.log(err));
};
d.addEventListener('DOMContentLoaded', () => {
	getData();
});
