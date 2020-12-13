import { consumingApi } from './modules/movies_api.js';
import { deslizador } from './modules/slider.js';

document.addEventListener('DOMContentLoaded', () => {
	consumingApi();
	deslizador();
});
