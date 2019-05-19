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
        let centerLat = circle.getCenter().lat();
        let centerLng = circle.getCenter().lng();
        let radius = circle.getRadius();
        console.log('Circle center lat: ' + centerLat);
        console.log('Circle center lng: ' + centerLng);
        console.log('Circle radius: ' + radius);
    });

    /**
     * Parcours la liste des terrains, pour chaque terrain: 
     * on récupère ces attribus
     * puis on dessiner le terrain sur la carte
     */

    $('.field').each(function(index) {
        if(this.dataset.type == 'circle'){
            let centerCircle = new google.maps.LatLng(
                parseFloat(this.dataset.lat), 
                parseFloat(this.dataset.lng)
            );
            let fieldCircle = new google.maps.Circle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                map: map,
                center: centerCircle,
                radius: parseFloat(this.dataset.radius)
            });
        }
    })
}