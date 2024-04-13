document.addEventListener('DOMContentLoaded', function () {
	function hexToRGB(hex) {
		const r = parseInt(hex.substring(1, 3), 16);
		const g = parseInt(hex.substring(3, 5), 16);
		const b = parseInt(hex.substring(5, 7), 16);
		return `rgb(${r}, ${g}, ${b})`;
	}

	document.getElementById('colorForm').addEventListener('submit', function (e) {
		e.preventDefault();
		const oldColor = document.getElementById('oldColor').value;
		const newColor = document.getElementById('newColor').value;
		chrome.runtime.sendMessage({ action: 'changeColor', oldColor: hexToRGB(oldColor), newColor: hexToRGB(newColor) });
	});

	document.querySelector('#go-to-options').addEventListener('click', function () {
		if (chrome.runtime.openOptionsPage) {
			chrome.runtime.openOptionsPage();
		} else {
			window.open(chrome.runtime.getURL('options.html'));
		}
	});

	chrome.storage.sync.get(
		{
			color: '#f4a3f1',
			newColor: '#ff0000',
			applyOnLoad: false,
		},
		(items) => {
			document.getElementById('oldColor').value = items.color;
			document.getElementById('newColor').value = items.newColor;
		}
	);
});