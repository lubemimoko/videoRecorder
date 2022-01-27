let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let start_button = document.querySelector("#btnStart");
let stop_button = document.querySelector("#btnStop");
let recordvideo = document.getElementById('video');
let playvideo = document.getElementById('video2');
let img = document.getElementById("img")
   	
   	
   	
let camera_stream = null;
let media_recorder = null;
let blobs_recorded = [];

   	
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(cam_stream =>{
		start_button.removeAttribute("disabled")
		camera_stream = cam_stream
		if ("srcObject" in recordvideo) {
            recordvideo.srcObject = camera_stream;
		}
		else { // Old version
            recordvideo.src = window.URL
			.createObjectURL(camera_stream);
		}
	

		// It will play the recordvideo
		recordvideo.onloadedmetadata = function (ev) {
            recordvideo.play();
            };
}).catch(e =>{
    alert("Can not connect to camera. Try Again!")
})



start_button.addEventListener('click', function() {
    console.log(camera_stream)
    // set MIME type of recording as video/webm
    media_recorder = new MediaRecorder(camera_stream, { mimeType: 'video/webm' });
    // media_recorder = new MediaRecorder(camera_stream);
    media_recorder.start();
    
    img.setAttribute("style", "display:block;");
    start_button.setAttribute("disabled", "disabled")
    stop_button.removeAttribute("disabled")
    message()
    // event : new recorded video blob available 
    
    media_recorder.addEventListener('dataavailable', function(e) {
		blobs_recorded.push(e.data);
       });

    //    blobs_recorded = []



    // event : recording stopped & all blobs sent
    media_recorder.addEventListener('stop', function() {
    	// create local object URL from the recorded video blobs
    	videoData = new Blob(blobs_recorded, { type: 'video/webm' })
    	blobs_recorded= []
    	let video_local = URL.createObjectURL(videoData);
    	
        recordvideo.style.display = "none"
        
        playvideo.src = video_local;
        playvideo.setAttribute("style", "block")
        uploadVideo(videoData)
    });

    // start recording with each recorded blob having 1 second video
    // media_recorder.start(1000);
});



stop_button.addEventListener('click', function() {
	media_recorder.stop(); 
    
	img.setAttribute("style", "display:none;");
    start_button.removeAttribute("disabled")
    stop_button.setAttribute("disabled", "disabled")
    message()
});







