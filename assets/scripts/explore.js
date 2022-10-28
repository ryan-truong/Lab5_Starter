// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // TODO
  
  let voices = speechSynthesis.getVoices();
  const voiceSelect = document.getElementById('voice-select');

  speechSynthesis.addEventListener('voiceschanged', () => {
    voices = speechSynthesis.getVoices();
    for(let i = 0; i < voices.length; i++){
      const option = document.createElement('option');
      option.textContent = `${voices[i].name}`;
      voiceSelect.appendChild(option);
    }
  
    let voice = null;
    voiceSelect.addEventListener('change', (event) => {
      voice = event.target.value;
    });
  
    const button = document.getElementsByTagName('button')[0];
    button.addEventListener('click', (event) => {
      const text = document.getElementById('text-to-speak');
      const utterThis = new SpeechSynthesisUtterance(text.value);
  
      for(let i =0; i < voices.length; i++){
        if (voices[i].name === voice){
          utterThis.voice = voices[i];
        }
      }
      if(utterThis.text == ''){
        return;
      }
      else{
        speechSynthesis.speak(utterThis);
        const image = document.getElementsByTagName('img')[0];
        if(speechSynthesis.speaking){
          image.src = 'assets/images/smiling-open.png';
        }
        else{
          image.src = 'assets/images/smiling.png';
        }
      }
      utterThis.addEventListener('end', (event) => {
        const image = document.getElementsByTagName('img')[0];
        image.src = 'assets/images/smiling.png';
      })
    });
  });
}