      
var map = L.map('map').setView([0, 0], 2);
L.tileLayer('carleton/{z}/{x}/{y}.png', {
    minZoom: 1,
    maxZoom: 6,
    attribution: 'ESO/INAF-VST/OmegaCAM',
    //continuousWorld: true,
    noWrap: true,
    tms: true
}).addTo(map);
map.on('click', function(e) {
    //todo make this call appropiate callback
    console.log(e.latlng);
});

var thingManager = new ThingManager();

//todo make this come (mostly) from node
thingManager.addThingToMap(0,0,0,0.1,'img/ownship.png',"Ship #1",map);
thingManager.addThingToMap(30,30,0,0.1,'img/ship.png',"Ship #2",map);
thingManager.addThingToMap(30,30,0.1,0.1,'img/ship.png',"Ship #3",map);
thingManager.addThingToMap(30,30,0.1,0.0,'img/ship.png',"Ship #4",map);
thingManager.addThingToMap(-30,30,-0.2,0.2,'img/anomaly.png',"Anomaly #1",map);
thingManager.addThingToMap(-60,-120,0,0.0,'img/spacebase.png',"Base #1",map);


setInterval(thingManager.updateAllTheThings.bind(thingManager),100);

