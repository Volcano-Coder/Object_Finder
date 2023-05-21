status="";
objects=[];
function preload(){
}

function setup(){
    canvas=createCanvas(480, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function start(){
objectDetector=ml5.objectDetector('cocossd', modelLoaded)
document.getElementById("status").innerHTML="Status: Detecting objects";
object_name=document.getElementById("object_name").value
}

function modelLoaded(){
    console.log("modelLoaded");
    status=true;
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="status: objects detected";
            fill("#D4AF37");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#D4AF37");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label==object_name){
            video.stop();
            objectDetector.detect(gotResults);
            document.getElementById("number_of_objects").innerHTML=object_name+" found";
        }
        else{
            document.getElementById("number_of_objects").innerHTML=object_name+" not found";
        }
        }
    }
}