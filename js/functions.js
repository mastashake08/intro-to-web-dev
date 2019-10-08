
var filters = [
  'grayscale',
  'sepia',
  'blur'
];
var link = document.createElement('a');
// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
// Define constants
const cameraView = document.querySelector("#camera"),
    cameraOutput = document.querySelector("#output"),
    cameraSensor = document.querySelector("#canvas"),
    cameraTrigger = document.querySelector("#take-photo")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/png");
    cameraOutput.classList.add("taken");

    link.setAttribute('href', cameraOutput.src);
    link.setAttribute('download', 'output.png');
    link.setAttribute('target', '_blank');
    link.style.display = 'none';
    cameraOutput.appendChild(link);

};
function addClass(index){
  //add class to canvas corresponding to the filter index
  cameraOutput.classList.add(filters[index]);
  link.click()
}
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
