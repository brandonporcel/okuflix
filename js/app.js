const d = document;
const $slider = d.querySelectorAll('.slider');
const $template = d.getElementById('slider-template').content;
const $fragment = d.createDocumentFragment();
// const $sliderImg = d.querySelector('.slider-img');
const baseUrl = 'http://www.omdbapi.com';
const getData = async () => {
	try {
		$slider.forEach((slider) => {
			slider.innerHTML =
				'<img class="loader" src="assets/img/loader.svg" alt="loader" />';
		});
		const key = 'c075c45e';
		const res = await fetch(`${baseUrl}?s=buenos+aires&apikey=${key}`);
		const json = await res.json();
		const jsonData = await json.Search;
		if (!res.ok) throw new Error();

		jsonData.forEach((movie) => {
			$template.querySelector('figure').classList.add('slider-figure');
			$template.querySelector('img').classList.add('slider-img');
			$template.querySelector('img').src = movie.Poster;
			$template.querySelector('img').alt = movie.Title;
			$template.querySelector('img').setAttribute('data-IMDB-Id', movie.imdbID);

			const $clone = d.importNode($template, true);
			$fragment.appendChild($clone);
		});

		$slider.forEach((slider) => {
			// slider.innerHTML = '';
			slider.appendChild($fragment);
			console.log(slider);
			console.log($template);
		});
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
});
