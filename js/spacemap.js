var ships = [{x:0,y:0},{x:30,y:30},{x:-30,y:30},{x:-60,y:-120}];
var shipIcons = [];
var target = null;
var infodiv = $("#info");

function unClickTarget()
{
    target = null;
    infodiv.html();
}

function clickTarget(evt)
{
    if (target) unClickTarget();
    var x = evt.target;
    console.log("This is located at " + x.getLatLng());
    infodiv.html("This is located at " + x.getLatLng());
      
}
      
function updateShips()
{
    for (var ind in shipIcons)
    {
        var ship = shipIcons[ind];
          var ll = ship.getLatLng();
        ll.lat += 0.01;
        ship.setLatLng(ll);
    }
}

      
var map = L.map('map').setView([0, 0], 2);
L.tileLayer('spacetiles/{z}/{x}/{y}.png', {
    minZoom: 1,
    maxZoom: 4,
    attribution: 'ESO/INAF-VST/OmegaCAM',
    //continuousWorld: true,
    noWrap: true,
    tms: true
}).addTo(map);
map.on('click', function(e) {
    alert(e.latlng);
});
createShipIcons();
setInterval(updateShips,100);

function createShipIcons()
{
    for (var ind in ships)
    {
        var ship = ships[ind];
	var icon = L.marker([ship.x,ship.y]);
	icon.addTo(map).on("click",clickTarget);
        shipIcons.push(icon);
	
    }
}

