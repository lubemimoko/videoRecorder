function message(id="none"){
    if(id == "none"){
        document.getElementById("successmessage").style.opacity=0
        document.getElementById("errormessage").style.opacity=0;
        return;
    }
    
    document.getElementById(id).style.opacity=1
}        
    
    
    
function uploadVideo(mp3Data){
        
    let reader = new FileReader();      
  
    reader.onload = function(event){
        let mp3Name = encodeURIComponent('video_recording_' + new Date().getTime() + '.webm');
        let data = new FormData();
              
        data.append('name', mp3Name);
        data.append('csrfmiddlewaretoken', csrf);
        data.append('file', event.target.result);
              
        $.ajax({
            type: 'POST',
            url: url,
            enctype: "multipart/form-data",
            data: data,
            processData: false,
            contentType: false,   
            success: function(res) {
               message("successmessage")
            },
            error: function (res) {
              message("errormessage")
             }
    });}
    reader.readAsDataURL(mp3Data);
}
    
    
