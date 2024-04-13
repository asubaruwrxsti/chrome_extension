// Saves options to chrome.storage
const saveOptions = () => {
    const color = document.getElementById('color').value;
    const newColor = document.getElementById('newColor').value;
    const applyOnLoad = document.getElementById('apply-on-load').checked;
    const useImageInstead = document.getElementById('use-image-instead').checked;
    const imageUrl = document.getElementById('imageUrl').value;

    chrome.storage.sync.set(
        { color: color, newColor: newColor, useImageInstead: useImageInstead, imageUrl: imageUrl, applyOnLoad: applyOnLoad },
        () => {
            // Update status to let user know options were saved.
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
            color: '#f4a3f1',
            newColor: '#ff0000',
            applyOnLoad: false,
            useImageInstead: false,
            imageUrl: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
        },
        (items) => {
            document.getElementById('color').value = items.color;
            document.getElementById('newColor').value = items.newColor;
            document.getElementById('apply-on-load').checked = items.applyOnLoad;
            document.getElementById('use-image-instead').checked = items.useImageInstead;
            document.getElementById('imageUrl').value = items.imageUrl;

            if (items.useImageInstead) {
                document.getElementById('imageUrl').style.maxHeight = '100px';
                document.getElementById('imageUrl').style.opacity = '1';
            }
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

document.getElementById('use-image-instead').addEventListener('change', function () {
    var imageUrlInput = document.getElementById('image-url');
    if (this.checked) {
        imageUrlInput.style.maxHeight = '100px';
        imageUrlInput.style.opacity = '1';
    } else {
        imageUrlInput.style.maxHeight = '0';
        imageUrlInput.style.opacity = '0';
    }
});