
var target = null;
var infodiv = $("#info");
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

function scanTarget()
{
    console.log("Got here");
    if (target)
    {
	infodiv.html("Scanning: " + target.name + "<hr>" + target.info );
	//TODO: make this an animation with JqueryUI magick
	setTimeout(scanTargetResults,2000);
	console.log("And here");
    }
    else
    {
	console.log("Nothing to scan, try clicking something first");
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
