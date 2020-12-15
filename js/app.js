import { consumiendoApi } from './modules/movies_api.js';
import { deslizador } from './modules/slider.js';
import { cargaPaja } from './modules/video_lazy_load.js';

document.addEventListener('DOMContentLoaded', () => {
	cargaPaja();
	consumiendoApi();
	deslizador();
});
