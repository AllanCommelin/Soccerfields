function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.924457491784686, lng: 2.360209682040704 },
        zoom: 16
    });

    var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
        },
        markerOptions: { icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png' },
        circleOptions: {
            fillColor: '#ffff00',
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: false,
            editable: true,
            zIndex: 1
        },
        polygonOptions: {
            editable: true,
            draggable: true,
            strokeColor: '#75d135',
            fillColor: '#75d135',
            strokeWeight: 5,
            strokeOpacity: 1,
            zIndex: 2
        }
    });
    // Initialise la map
    drawingManager.setMap(map);

    // Permets de récupérer la latitude et la longitude d'un cercle lorsqu'il est est créé
    google.maps.event.addListener(drawingManager, 'circlecomplete', function (circle) {
        var bounds = circle.getBounds();
        console.log('Circle: '+bounds);
    });


}