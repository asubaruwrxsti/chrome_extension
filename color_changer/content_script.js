chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'changeColor') {
		changeColorOrImage(request.oldColor, request.newColor);
	}
});


function findElementsWithColor(color) {
	const elements = document.querySelectorAll('*');
	const foundElements = [];
	elements.forEach(element => {
		const elementColor = window.getComputedStyle(element).backgroundColor;
		if (elementColor === color) {
			foundElements.push(element);
		}
	});
	console.log(`Found ${foundElements.length} elements with color ${color}`);
	return foundElements;
}

function changeColorOrImage(colorToReplace, colorToReplaceWith) {
	let foundElements = findElementsWithColor(colorToReplace);
	foundElements.forEach(element => {
		element.style.setProperty('background-color', colorToReplaceWith, 'important');
	});
	console.log(`Changed color from ${colorToReplace} to ${colorToReplaceWith}`);
}