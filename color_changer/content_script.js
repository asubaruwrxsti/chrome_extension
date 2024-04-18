chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'changeColor') {
		changeColorOrImage(request.oldColor, request.newColor);
	}
});

document.addEventListener('DOMContentLoaded', () => {
	chrome.storage.sync.get(
		{
			enabledTab: 'Color',
			name: '',
			color: '#f4a3f1',
			newColor: '#ff0000',
			waitForLoad: 0,
			useImageInstead: false,
			imageUrl: '',
			applyOnLoad: false,
		},
		(items) => {
			if (typeof window['handle' + items.enabledTab] === 'function') {
				window['handle' + items.enabledTab](items);
			}

			setInterval(() => {
				items.waitForLoad = 0;
				if (typeof window['handle' + items.enabledTab] === 'function') {
					window['handle' + items.enabledTab](items);
				}
			}, 15000);
		}

	);
});

function handleColor(items) {
	if (items.applyOnLoad) {
		console.log(`Waiting for ${items.waitForLoad} seconds to apply changes...`);
		setTimeout(() => {
			changeColorOrImage(hexToRGB(items.color), hexToRGB(items.newColor), items.imageUrl, items.useImageInstead);
		}, items.waitForLoad * 1000);
	}
}

function handleName(items) {
	if (items.applyOnLoad) {
		console.log(`Waiting for ${items.waitForLoad} seconds to apply changes...`);
		setTimeout(() => {
			changeColorOrImageWithName(items.name, hexToRGB(items.newColor), items.imageUrl, items.useImageInstead);
		}, items.waitForLoad * 1000);
	}
}

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

function findElementsWithName(name) {
	const elements = document.querySelectorAll('*');
	const foundElements = [];
	elements.forEach(element => {
		if (element.innerText === name) {
			foundElements.push(element);
		}
	});
	return foundElements;
}

function changeColorOrImage(colorToReplace, colorToReplaceWith, imageUrl = '', useImageInstead = false) {
	let foundElements = findElementsWithColor(colorToReplace);
	foundElements.forEach(element => {
		let currentColor = window.getComputedStyle(element).getPropertyValue('background-color');
		if (currentColor !== colorToReplaceWith) {
			if (imageUrl !== '' && useImageInstead) {
				element.style.setProperty('background-image', `url(${imageUrl})`, 'important');
				element.style.setProperty('background-size', 'cover', 'important');
			} else {
				element.style.setProperty('background-color', colorToReplaceWith, 'important');
			}
			console.log(`Changed color from ${colorToReplace} to ${colorToReplaceWith}`);
		}
	});
}

function changeColorOrImageWithName(name, colorToReplaceWith, imageUrl = '', useImageInstead = false) {
	let foundElements = findElementsWithName(name);
	foundElements.forEach(element => {
		let currentColor = window.getComputedStyle(element).getPropertyValue('background-color');
		if (currentColor !== colorToReplaceWith) {
			if (imageUrl !== '' && useImageInstead) {
				element.style.setProperty('background-image', `url(${imageUrl})`, 'important');
				element.style.setProperty('background-size', 'cover', 'important');
			} else {
				element.style.setProperty('background-color', colorToReplaceWith, 'important');
			}
			console.log(`Changed color of elements with name ${name} to ${colorToReplaceWith}`);
		}
	});
}