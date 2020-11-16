// https://davidwalsh.name/javascript-debounce-function
export function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

export function createSnackbar({
    type = "error",
    id = "snackbar" + type.slice(0, 1).toUpperCase() + type.slice(1)
} = {}) {
  let snackbar = document.createElement("div");
  snackbar.id = id;
  snackbar.className = `snackbar snackbar--${type}`;
  
  return snackbar;
}

export function showSnackbar(snackbar, text, time = 2500) {
  snackbar.innerText = text;
  snackbar.classList.add("show");
  return setTimeout(() => snackbar.classList.remove("show"), time);
}