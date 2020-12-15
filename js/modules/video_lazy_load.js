const d = document;
export function cargaPaja() {
	const $video = d.getElementById('video');
	$video.volume = 0;
	$video.play();
	const $volume = d.getElementById('volume');
	let estado = false;
	$volume.addEventListener('click', () => {
		if (estado === false) {
			estado = true;
			$video.volume = 0.7;
			$volume.innerHTML =
				'<img class="img-fluid" src="assets/img/mute.svg" alt="mute icon">';
		} else {
			$video.volume = 0;
			$volume.innerHTML =
				'<img class="img-fluid" src="assets/img/volume.svg" alt="volume icon">';
			estado = false;
		}
	});
	const callback = (entries) => {
		if (entries[0].isIntersecting) {
			$video.play();
		} else {
			$video.pause();
		}
	};
	const obserber = new IntersectionObserver(callback, {
		threshold: 0.5,
	});
	obserber.observe($video);
	window.addEventListener('visibilitychange', () => {
		if (d.visibilityState === 'visible') {
			$video.play();
		} else {
			$video.pause();
		}
	});
}
