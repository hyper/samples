// eslint-disable-next-line import/no-extraneous-dependencies
const { ipcRenderer } = require('electron');

const login = document.getElementById('login');

login.onclick = function handleLoginClicked() {
	ipcRenderer.send('login');
};
