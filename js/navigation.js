
var target = null;
var dest = null;
var infodiv = $("#info");

//they clicked on a target
function stationCallback(newTarget)
{
    if (newTarget.name == "Ship #1")
    {
	console.log("Don't scan yourself");
	return;
    }
    
    if (target)
    {
	console.log("Should unclick");
    }
    target = newTarget;
    infodiv.html(target.name + "<hr>" + target.info );
}

//they clicked on a position
function stationCallback2(location)
{
    if (target)
    {
	target = null;
    }

}

function inputHandler(event)
{
    console.log("Click: " + event);
    if (event.keyCode == 37) //Left
    {
	rotate(-1);
    }
    else if (event.keyCode == 39) //Right
    {
	rotate(1);
    }
    else if (event.keyCode == 38) //Up
    {
	thrust(1);
    }
    else if (event.keyCode == 40) //Down
    {
	thrust(-1);
    }
    else //let the rest of the inputs go
    {
	return true;
    }
    event.preventDefault(); //stop from scrolling page
    return false;

}

//$("document").keydown(inputHandler);
document.addEventListener("keydown",inputHandler,false);  

function rotate(direction)
{
    //TODO: should our ship always be available?
    var ship = thingManager.getThingById(0);
    var dx = ship.dx;
    var dy = ship.dy;
    //TODO: should probably save these
    var v = Math.sqrt((dx*dx)+(dy*dy));
    var angle = Math.atan2(dx,dy) * 180 / Math.PI;
    console.log("At start",ship.dx,ship.dy,v,angle);
    angle += (direction * 5); //rotate 5 degrees each time
    var mathAngle = angle * Math.PI / 180.0;
    ship.dy = v * Math.cos(mathAngle);
    ship.dx = v * Math.sin(mathAngle);
    console.log("At Finish",ship.dx,ship.dy,v,angle);
    ship.marker.setIconAngle(angle);
}

function thrust(direction)
{
    //TODO: should our ship always be available?
    var ship = thingManager.getThingById(0);
    var dx = ship.dx;
    var dy = ship.dy;
    //TODO: should probably save these
    var v = Math.sqrt((dx*dx)+(dy*dy));
    var angle = Math.atan2(dx,dy);
    console.log("At start",ship.dx,ship.dy,v,angle * 180 / Math.PI);

    v += direction; //increment speed
    if (v > 10)
    {
	v = 10.0;
    }
    else if (v < 0)
    {
	v = 0;
    }
    ship.dx = v * Math.sin(angle);
    ship.dy = v * Math.cos(angle);

    console.log("At Finish",ship.dx,ship.dy,v,angle * 180 / Math.PI);
}




function stop()
{
    dest = null;
}


function setCourse()
{



}

function updateCourse()
{
    if (dest)
    {


    }

}


function scanTargetResults()
{
    console.log("Results arrived");
    if (target.name == "Ship #2")
    {
	target.info = "Friendly ship captained by Capn Crunch";
	target.updateThingInfo(false,false,false,false,"img/friendlyship.png")
    }
    else
    {
	target.info = "Enemy ship";
	target.updateThingInfo(false,false,false,false,"img/enemyship.png")
    }
    //TODO: make this a generic thing
    infodiv.html(target.name + "<hr>" + target.info );
}
