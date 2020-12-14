const d = document;
export function deslizador() {
	const $sliders = d.querySelectorAll('.slider');
	let isClicking = false;
	let startXDistance;
	let leftScroll;
	$sliders.forEach((slider) => {
		slider.addEventListener('mousedown', (e) => {
			isClicking = true;
			// tenemos que saber donde dio el primer click
			// offset son los px que separan el slider(contenedor) del inico del body.
			// si el body fuese cero,el offsetLeft seria 0
			// e.pageX cordenada x,
			// startXDistance=0 seria el borde inicial del contenedor
			startXDistance = e.pageX - slider.offsetLeft;
			// "píxeles que el contenido de un elemento se desplaza desde su borde izquierdo."
			leftScroll = slider.scrollLeft;
		});
		// cuando sacas el mouse del slider
		slider.addEventListener('mouseleave', () => {
			isClicking = false;
		});
		// soltas el click(?)
		slider.addEventListener('mouseup', () => {
			isClicking = false;
		});
		// cuando lo moves dentro del area
		slider.addEventListener('mousemove', (e) => {
			if (!isClicking) return;
			// para que no seleccione nada,texto,img
			e.preventDefault();
			// es la misma que arriba. pero esta variable va a estar en constante cambio
			const x = e.pageX - slider.offsetLeft;
			// creo que para que el desplazamiento sea para nostros(?)
			// si scrollIzquierda - walk= (-) va para la izq, si es (+) va para la derecha
			const walk = x - startXDistance;
			slider.scrollLeft = leftScroll - walk;
		});
	});
}
