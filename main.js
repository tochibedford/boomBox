const audioContext  = new AudioContext();
const gainNode = audioContext.createGain();
const panNode = audioContext.createStereoPanner({pan: 100});
const cassetteHoles = document.querySelectorAll('.cassetteHole');

const audioElement = document.querySelector('audio');
const playPauseButton = document.querySelector('.playPauseButton');
const volumeControl = document.querySelector('.volumeControl');
const panControl = document.querySelector('.panControl');
playPauseButton.isPlaying = false;

const trackSourceNode =  audioContext.createMediaElementSource(audioElement);
trackSourceNode.connect(gainNode).connect(panNode).connect(audioContext.destination);

playPauseButton.addEventListener('click', function(){
    if(audioContext.state === 'suspended'){
        audioContext.resume();
    }

    if(this.isPlaying === false){
        audioElement.play();
        this.isPlaying = true;
        cassetteHoles.forEach(cassetteHole=>{
            cassetteHole.classList.add('spinningAnimation');
            cassetteHole.classList.remove('stoppingAnim');
        });
        

    }else{
        audioElement.pause();
        this.isPlaying = false;
        cassetteHoles.forEach(cassetteHole=>{
            cassetteHole.classList.remove('spinningAnimation');
            cassetteHole.classList.add('stoppingAnim');
        });
    }

}, false);

volumeControl.addEventListener('input', function(){
    gainNode.gain.value = this.value/100;
})

panControl.addEventListener('input', function(){
    panNode.pan.setValueAtTime(this.value/100, audioContext.currentTime);
})

audioElement.addEventListener('ended', ()=>{
    playPauseButton.isPlaying = false;
}, false);

// default settings
gainNode.gain.value = volumeControl.value/100;
var rythm = new Rythm()
rythm.setMusic('./audio/89.wav')
