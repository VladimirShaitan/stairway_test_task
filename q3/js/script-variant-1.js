(function () {
	let siteEntries = Number(localStorage.getItem('siteEntries')); 

	if(siteEntries === 0 || siteEntries >= 10) {
		siteEntries = 1;
	} else  {
		siteEntries++;
	}
	
	localStorage.setItem('siteEntries', siteEntries);
	
	// Append result in body tag 

	let container = document.createElement('h2');
	container.className = 'result';
	container.innerText = `Site entrances: ${siteEntries}`;
	document.body.appendChild(container);

})();