const textArea = document.querySelector('#text');
const btn = document.querySelector('.btn');
const voiceOption = document.querySelector('#voice');

btn.onclick = text2speech;
speechSynthesis.onvoiceschanged = voices;

function text2speech() {
	if (speechSynthesis.speaking && btn.innerHTML == 'pause speech') {
		btn.innerHTML = 'resume speech';
		speechSynthesis.pause();
	} else if (speechSynthesis.speaking && btn.innerHTML == 'resume speech') {
		btn.innerHTML = 'pause speech';
		speechSynthesis.resume();
	} else if (btn.innerHTML == 'convert to speech' && textArea.value != '') {
		const utterance = new SpeechSynthesisUtterance(textArea.value);
		speechSynthesis.getVoices().forEach((item, index, array) => {
			if (item.name == voiceOption.value) {
				utterance.voice = item;
			}
		});
		speechSynthesis.speak(utterance);
		btn.innerHTML = 'pause speech';
	} else {
		btn.innerHTML = 'convert to speech';
	}
}
function voices() {
	speechSynthesis.getVoices().forEach((element) => {
		let selected =
			element.name === 'Microsoft Ravi - English (India)' ? 'selected' : '';
		let result = `<option value='${element.name}' ${selected}>${element.name} (${element.lang})</option>`;
		voiceOption.insertAdjacentHTML('beforeend', result);
	});
}
const myInterval = setInterval(() => {
	if (!speechSynthesis.speaking) {
		btn.innerHTML = 'convert to speech';
	}
});
