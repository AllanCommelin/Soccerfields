function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 48.924457491784686, lng: 2.360209682040704 },
        zoom: 16
    });

    var drawingManager = new google.maps.drawing.DrawingManager({
        //drawingMode: google.maps.drawing.OverlayType.POLYGON,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.BOTTOM_CENTER,
            drawingModes: ['rectangle', 'polygon']
        },
        rectangleOptions: {
            fillColor: '#0daa28',
            fillOpacity: 1,
            strokeWeight: 5,
            zIndex: 1
        },
        polygonOptions: {
            fillColor: '#0daa49',
            fillOpacity: 1,
            strokeColor: '#055300',
            strokeWeight: 5,
            zIndex: 2
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
                        alert('Le terrain a bien été ajouté');
                        window.location.reload();
                    }
                });
            }
        } else if(event.type === 'polygon'){
            let pathArray = JSON.stringify(event.overlay.getPath().getArray());
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
                        path: pathArray,
                    },
                    success: function (data) {
                        alert('Le terrain a bien été ajouté');
                        window.location.reload();
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
                    alert('Le terrain a bien été supprimé');
                    window.location.reload();
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
        if (this.dataset.type === 'rectangle'){
            let rectangle = new google.maps.Rectangle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#75d135',
                fillOpacity: 0.35,
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
        else if(this.dataset.type === 'polygon'){
            let polygon = new google.maps.Polygon({
                paths: JSON.parse(this.dataset.path),
                strokeColor: '#055300',
                strokeOpacity: 0.8,
                strokeWeight: 3,
                fillColor: '#0daa49',
                fillOpacity: 0.35,
                zIndex: 11,
            });
            polygon.setMap(map);
            infoWindow = new google.maps.InfoWindow();
            createClickablePoly(polygon, this.dataset.name, map);
        }
    });
}

function createClickablePoly(poly, html, map) {
    let contentString = html;
    let infoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(poly, 'click', function (event) {
        infoWindow.setContent(contentString);
        infoWindow.setPosition(event.latLng);
        infoWindow.open(map);
    });
}