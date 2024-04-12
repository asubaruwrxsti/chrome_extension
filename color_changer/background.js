chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.action === 'changeColor') {
		console.log('changeColor message received');
		chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
			console.log('sending message to tab');
			chrome.tabs.sendMessage(tabs[0].id, request);
		});
	}
});