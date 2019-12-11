(function () {

	let siteEntries = localStorage.getItem('siteEntries')
	console.log(siteEntries);
	if(siteEntries >= 10){

		// if you need to remove siteEntries item from localStorage
		localStorage.removeItem('siteEntries');

		// or if you need to clear ENTIRE localStorage
		// localStorage.clear()

	} else {
		siteEntries++;
		localStorage.setItem('siteEntries', siteEntries);
	}

	document.body.innerHTML = "<h2>Press f12 then go to Application > Local Storage<h2>";

})();