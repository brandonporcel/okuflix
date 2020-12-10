const d = document;
const $slider = d.querySelectorAll('.slider');
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
			slider.innerHTML += $template;
		});
		// for (let i = 0; i < $slider.length; i += 1) {
		// 	// slider.innerHTML = '';
		// 	$slider[i].appendChild($fragment);
		// }
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
