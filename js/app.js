/* const d = document;
const $slider = d.querySelectorAll('.slider');
const $rankSlider = d.querySelector('.rank-slider');
const getData = async () => {
	try {
		$slider.forEach((slider) => {
			slider.innerHTML =
				'<img class="loader" src="assets/img/loader.svg" alt="loader" />';
		});
		const baseUrl = 'http://www.omdbapi.com';
		const key = 'c075c45e';
		const res = await fetch(`${baseUrl}?s=buenos+aires&apikey=${key}`);
		const json = await res.json();
		const jsonData = await json.Search;
		let $template = '';
		if (!res.ok) throw new Error();
		for (let i = 0; i < jsonData.length; i += 1) {
			$template += `
			<figure class="slider-figure">
				<img class="slider-img" src="${jsonData[i].Poster}" alt="${jsonData[i].Title}" data-imdb-id="${jsonData[i].imdbID}">
				<figcaption>
			</figcaption></figure>
			`;
		}
		$slider.forEach((slider) => {
			slider.innerHTML = '';
		});
		$rankSlider.innerHTML = $template;
	} catch (err) {
		const message = err.statusTexttt || 'ocurrio un errorrrr';
		$slider.innerHTML = `<figure>
		<figcaption>error:${err.status}: ${message} </figcaption>
		</figure>`;
		console.log(err);
	}
};
d.addEventListener('DOMContentLoaded', () => {
	getData();
}); */
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
			for (i; i < 5; i += 1) {
				console.log(i);
			}
			// console.log(animeData);
			// $animeSlider.innerHTML = $animeTemplate;
			// $rankSlider.innerHTML = $bsAsTemplate;
		})
		.catch((err) => console.log(err));
};
d.addEventListener('DOMContentLoaded', () => {
	getData();
});
