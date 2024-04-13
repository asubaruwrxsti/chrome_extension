chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'changeColor') {
		changeColorOrImage(request.oldColor, request.newColor);
	}
});

document.addEventListener('DOMContentLoaded', () => {
	chrome.storage.sync.get(
		{
			color: '#f4a3f1',
			newColor: '#ff0000',
			applyOnLoad: false,
		},
		(items) => {
			if (items.applyOnLoad) {
				changeColorOrImage(hexToRGB(items.color), hexToRGB(items.newColor));
			}
		}
	);
});

function hexToRGB(hex) {
	const r = parseInt(hex.substring(1, 3), 16);
	const g = parseInt(hex.substring(3, 5), 16);
	const b = parseInt(hex.substring(5, 7), 16);
	return `rgb(${r}, ${g}, ${b})`;
}

function findElementsWithColor(color) {
	const elements = document.querySelectorAll('*');
	const foundElements = [];
	elements.forEach(element => {
		const elementColor = window.getComputedStyle(element).backgroundColor;
		if (elementColor === color) {
			foundElements.push(element);
		}
	});
	return foundElements;
}

function changeColorOrImage(colorToReplace, colorToReplaceWith) {
	let foundElements = findElementsWithColor(colorToReplace);
	foundElements.forEach(element => {
		element.style.setProperty('background-color', colorToReplaceWith, 'important');
	});
	console.log(`Changed color from ${colorToReplace} to ${colorToReplaceWith}`);
}