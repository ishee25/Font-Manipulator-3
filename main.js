noseX = 0;
noseY = 0;
difference = 0;
rightWristX = 0;
leftWristX = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 550);
    canvas.position(600, 200);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw(){
    background('#eb3483');

    document.getElementById("updated_font_size").innerHTML = "Text Size = " + difference + "px";

    textSize(difference);
    fill('#42f5da');
    text('Isheeta', noseX, noseY, difference);
}

function modelLoaded(){
    console.log("PoseNet is Initialized!");
}

function gotPoses(results, error){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("x of nose = " + noseX + "y of nose = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("left wrist x = " + leftWristX + "right wrist x = " + rightWristX + "differnce = " + difference);
    }
    
    else{
        console.log(error);
    }
}