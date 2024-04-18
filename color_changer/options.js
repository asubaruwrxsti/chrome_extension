// Saves options to chrome.storage
const saveOptions = () => {
	const enabledTab = document.querySelector('.tablinks.active').textContent;
	const name = document.getElementById('name-option').value;
	const color = document.getElementById('color').value;
	const newColor = document.getElementById('newColor').value;
	const applyOnLoad = document.getElementById('apply-on-load').checked;
	const waitForLoad = document.getElementById('wait-for-load').value;
	const useImageInstead = document.getElementById('use-image-instead').checked;
	const imageUrl = document.getElementById('imageUrl').value;

	chrome.storage.sync.set(
		{
			enabledTab: enabledTab,
			name: name,
			color: color,
			newColor: newColor,
			useImageInstead: useImageInstead,
			imageUrl: imageUrl,
			applyOnLoad: applyOnLoad,
			waitForLoad: waitForLoad
		},
		() => {
			const status = document.getElementById('status');
			status.textContent = 'Options saved.';
			setTimeout(() => {
				status.textContent = '';
			}, 750);
		}
	);
};

const restoreOptions = () => {
	chrome.storage.sync.get(
		{
			enabledTab: 'Color',
			name: '',
			color: '#f4a3f1',
			newColor: '#ff0000',
			applyOnLoad: false,
			waitForLoad: 0,
			useImageInstead: false,
			imageUrl: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
		},
		(items) => {
			document.getElementById(`${items.enabledTab.toLowerCase()}Tab`).click();

			document.getElementById('name-option').value = items.name;
			document.getElementById('color').value = items.color;
			document.getElementById('newColor').value = items.newColor;
			document.getElementById('apply-on-load').checked = items.applyOnLoad;
			document.getElementById('wait-for-load').value = items.waitForLoad;
			document.getElementById('use-image-instead').checked = items.useImageInstead;
			document.getElementById('imageUrl').value = items.imageUrl;

			if (items.useImageInstead) {
				document.getElementById('newColor').disabled = true;
			}
		}
	);
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

document.getElementById('use-image-instead').addEventListener('change', function () {
	let imageUrlInput = document.getElementById('image-url');
	let newColor = document.getElementById('newColor');
	if (this.checked) {
		imageUrlInput.style.maxHeight = '100px';
		imageUrlInput.style.opacity = '1';
		imageUrlInput.style.margin = '0';
		imageUrlInput.style.padding = '0';

		newColor.disabled = true;
	} else {
		imageUrlInput.style.maxHeight = '0';
		imageUrlInput.style.opacity = '0';
		imageUrlInput.style.margin = '5px';
		imageUrlInput.style.padding = '5px';

		newColor.disabled = false;
	}
});

document.getElementById('save').addEventListener('click', function () {
	var status = document.getElementById('status');
	status.textContent = 'Options saved.';
	status.style.opacity = '1';
	status.style.maxHeight = '100px';

	setTimeout(function () {
		status.style.opacity = '0';
		status.style.maxHeight = '0';
	}, 500);
});

document.getElementById('colorTab').addEventListener('click', function (event) {
	openTab(event, 'Color');
});

document.getElementById('nameTab').addEventListener('click', function (event) {
	openTab(event, 'Name');
});

function openTab(evt, tabName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.opacity = '0';
		tabcontent[i].style.maxHeight = '0';
		tabcontent[i].style.margin = '0'; // Set margin to 0
		tabcontent[i].style.padding = '0'; // Set padding to 0
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	var activeTabContent = document.getElementById(tabName);
	activeTabContent.style.display = "block";
	setTimeout(function () {
		activeTabContent.style.opacity = '1';
		activeTabContent.style.maxHeight = '300px'; /* You can adjust this value based on your content size */
		activeTabContent.style.margin = ''; // Reset margin
		activeTabContent.style.padding = ''; // Reset padding
	}, 500);
	evt.currentTarget.className += " active";
}