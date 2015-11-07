function ThingManager()
{
    this.things = []
}

ThingManager.prototype.addThingToMap = function(x,y,dx,dy,img,name,map)
{
    this.things.push(new Thing(x,y,dx,dy,img,name,map,this.things.length));
    return this.things.length-1;
}

ThingManager.prototype.getThingById = function(id)
{
    return this.things[id];
}


ThingManager.prototype.updateThingInfo = function(id,newX,newY,newDx,newDy)
{
    this.things[id].updateThingInfo(newX,newY,newDx,newDy);
}

ThingManager.prototype.updateThing = function(id)
{
    this.things[id].updateThing();
}

ThingManager.prototype.updateAllTheThings = function()
{
    for (var ind in this.things)
    {
	this.things[ind].updateThing();
    }
}


function Thing(x,y,dx,dy,img,name,id)
{
    this.id = id;
    this.name = name;
    this.dx = dx;
    this.dy = dy;
    this.info = "Nothing is known about this ship, yet";
    this.icon = L.icon({iconUrl:img, iconSize:[32,32]}); //TODO: this should probably be done as a cache or similar
    this.marker = L.marker([x,y],{icon: this.icon});
    var angle = Math.atan2(dx,dy) * 180 / Math.PI;
    this.marker.setIconAngle(angle);
    this.marker.addTo(map).on("click",this.clickThing.bind(this));
}

Thing.prototype.clickThing = function(evt)
{
    if (typeof(stationCallback) === typeof(Function))
    {
	stationCallback(this);
    }
    else
    {
	console.log("Clicked " + this.name);
    }
}


Thing.prototype.updateThingInfo = function(x,y,dx,dy,image)
{
    if (!image)
    {
	this.dx = dx;
	this.dy = dy;
	var ll = this.marker.getLatLng();
	ll.lat = y;
	ll.lng = x;
	this.marker.setLatLng(ll);
    }
    if (image)
    {
	this.icon = L.icon({iconUrl:image, iconSize:[32,32]}); //TODO: this should probably be done as a cache or similar
	this.marker.setIcon(this.icon);
    }
}

Thing.prototype.updateThing = function()
{
    var ll = this.marker.getLatLng();
    ll.lat += this.dy;
    ll.lng += this.dx;
    this.marker.setLatLng(ll);
}
