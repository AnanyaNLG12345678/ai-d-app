song = "";
left_wrist_x=0;
right_wirst_x=0;
leftwrist_y=0;
right_wrist_y=0;
score_leftwrist = 0;
score_rightwrist = 0;
function preload()
{
    song = loadSound("music.mp3");
}

function setup()
{
    canvas = createCanvas(600,500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();
    
    poseNet =  ml5.poseNet('video',modelLoaded);
    poseNet.on('pose',gotposes);
}
function modelLoaded()
{
    console.log('modelLoaded');
}
function gotposes(results)
{
    console.log(results);
    if(results.length>0)
        {
            console.log(results);
            score_leftwrist = results[0].pose.keypoints[9].score;
            score_rightwrist = results[0].pose.keypoints[10].score;
            console.log('score_leftwrist'+score_leftwrist);
            console.log('score_rightwirst'+score_rightwrist);
            left_wrist_x = results[0].pose.leftWrist.x;
            left_wrist_y = results[0].pose.leftWrist.y;
            right_wrist_x = results[0].pose.rightWrist.x;
            right_wrist_y = results[0].pose.rightWrist.y;
        }
    
}
function draw()
{
    image(video,0,0,600,500);
    fill("red");
    stroke("red");
    if(score_rightwrist>0)
        {
             circle(right_wirst_x,right_wrist_y,20);
    if(right_wrist_y>0 && right_wrist_y<=100)
        {
            document.getElementById("speed").innerHTML = "speed=0.5x";
            song.rate(0.5);
        }
    else if(right_wrist_y>100 && right_wrist_y<=200)
    {
        document.getElementById("speed").innerHTML = "speed=1x";
            song.rate(1);
    }
    else if(right_wrist_y>200 && right_wrist_y<=300)
    {
        document.getElementById("speed").innerHTML = "speed=1.5x";
            song.rate(1.5);
    }
    else if(right_wrist_y>300 && right_wrist_y<=400)
    {
        document.getElementById("speed").innerHTML = "speed=2x";
            song.rate(2);
    }
    else
    {
        document.getElementById("speed").innerHTML = "speed=2.5x";
            song.rate(2.5);
    }
        }
    if(score_leftwrist>0)
        {
            circle(left_wrist_x,left_wrist_y,20);
            Number_leftwrist_y=Number(left_wrist_y);
            remove_decimals=floor(Number_leftwrist_y);
            volume = remove_decimals/500;
            document.getElementById("volume").innerHTML="volume ="+volume;
            song.setVolume(volume);
        }
}
function play()
{
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}
