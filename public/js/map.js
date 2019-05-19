function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.924457491784686, lng: 2.360209682040704 },
        zoom: 16
    });

    var drawingManager = new google.maps.drawing.DrawingManager({
        //drawingMode: google.maps.drawing.OverlayType.RECTANGLE,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_CENTER,
            drawingModes: ['rectangle']
        },
        rectangleOptions: {
            fillColor: '#0011aa',
            fillOpacity: 1,
            strokeWeight: 5,
            clickable: true,
            editable: true,
            zIndex: 1
        }
    });
    // Initialise la map
    drawingManager.setMap(map);

    /**
     * Permets de : 
     * récupérer les attributs d'un rectangle lors de sa création
     * donnée un nom à cette forme
     * l'enregistrer en base de donnée
     */
    google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
        if(event.type == 'rectangle'){
            let bounds = event.overlay.getBounds();
            let boundNorth = bounds.getNorthEast().lat();
            let boundEast = bounds.getNorthEast().lng();
            let boundSouth = bounds.getSouthWest().lat();
            let boundWest = bounds.getSouthWest().lng();

            let fieldName = prompt("Veuillez entrer le nom du terrain");
            if (fieldName != null) {
                $.ajaxSetup({
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    }
                });
                $.ajax({
                    type: 'POST',
                    url: '/map/addField',
                    data: { 
                        type: event.type, 
                        name: fieldName, 
                        north: boundNorth, 
                        east: boundEast, 
                        south: boundSouth, 
                        west: boundWest
                    },
                    success: function (data) {
                        alert('Le champs a bien été ajouté');
                    }
                });
            }
        }
    });

    $('.deleteField').click(function(){
        let idField = this.dataset.id
        confirm = window.confirm("Êtes-vous sûr de vouloir supprimer ce terrain ?");

        if(confirm === true){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $.ajax({
                type: 'POST',
                url: '/map/deleteField',
                data: {
                    id: idField
                },
                success: function (data) {
                    alert('Le champs à bien été supprimé');
                }
            });
        }
    });

    /**
     * Parcours la liste des terrains, pour chaque terrain: 
     * on récupère ces attribus
     * puis on dessiner le terrain sur la carte
     */
    $('.field').each(function(index) {
        if (this.dataset.type == 'rectangle'){
            let rectangle = new google.maps.Rectangle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#75d135',
                fillOpacity: 0.35,
                clickable: true,
                editable: true,
                zIndex: 10,
                map: map,
                bounds: {
                    north: parseFloat(this.dataset.north),
                    south: parseFloat(this.dataset.south),
                    east: parseFloat(this.dataset.east),
                    west: parseFloat(this.dataset.west)
                }
            });
            rectangle.setMap(map);
            infoWindow = new google.maps.InfoWindow();
            createClickablePoly(rectangle, this.dataset.name, map);
        }
    });
}

function createClickablePoly(poly, html, map) {
    var contentString = html;
    var infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(poly, 'click', function (event) {
        infoWindow.setContent(contentString);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
    });
}