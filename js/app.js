// Initialize map's position to Gôteborg
var map = L.map('map').setView([57.7072326, 11.9670171], 13);

// Positron layer
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
}).addTo(map);

// Classic OpenStreetMap layer
//L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
//
var popupOpen = false;
var dragging = false;
var zooming = false;
var lastSecondEvent = false;

fadeOut = function () {
    $('#logo').fadeOut(function() {
        $(this).remove();
    });
    $('#tagbar').fadeOut();
}

fadeIn = function () {
    lastSecondEvent = true;
    setTimeout(function () {
        lastSecondEvent = false;
    }, 1300);
        
    if (!popupOpen && !dragging && !zooming) {
        setTimeout(function () {
            if (!popupOpen && !dragging && !zooming && !lastSecondEvent) {
                $('#tagbar').fadeIn();
            }
        }, 1500);
    }
}

// Fade out logo at map dragging
map.on('dragstart', function() {
    dragging = true;
    fadeOut();
});

map.on('dragend', function() {
    dragging = false;
    fadeIn();
});

map.on('zoomstart', function() {
    zooming = true;
    fadeOut();
});

map.on('zoomend', function() {
    zooming = false;
    fadeIn();
});

map.on('popupopen', function() {
    popupOpen = true;
    fadeOut();
}); 

map.on('popupclose', function() {
    popupOpen = false;
    fadeIn();
}); 

setTimeout(function () {
    $('#logo').fadeOut(function() {
        $(this).remove();
    });
}, 3000);

// Display and track the location as a blue circle on the map
map.locate({setView: false, maxZoom: 128, enableHighAccuracy: false, watch: true});

var currentCircle = new L.circle(new L.LatLng(0,0), 1000);
map.addLayer(currentCircle);

map.on('locationfound', function(e) {
    var radius = e.accuracy / 2;
    currentCircle.setLatLng(e.latlng);
    currentCircle.setRadius(radius);
});


// Create different icons
var greenIcon = L.icon({
    iconUrl: 'images/vegan-green.png',
    shadowUrl: 'images/vegan-shadow.png',

    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 50], // size of the shadow
    iconAnchor:   [24, 47], // point of the icon which will correspond to marker's location
    shadowAnchor: [24, 47],  // the same for the shadow
    popupAnchor:  [0, -36] // point from which the popup should open relative to the iconAnchor
});

var greyIcon = L.icon({
    iconUrl: 'images/vegan-fade.png',

    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 50], // size of the shadow
    iconAnchor:   [24, 47], // point of the icon which will correspond to marker's location
    shadowAnchor: [24, 47],  // the same for the shadow
    popupAnchor:  [0, -36] // point from which the popup should open relative to the iconAnchor
});


// Filtering tags
unique = function(elem, pos, arr) {
    return arr.indexOf(elem) == pos;
}; 

var allTags = [];
var availableTags = [];
var currentTags = [];

function getTags(feature) {
    if (feature.properties && feature.properties.description) {
        // Tags are set in the last line of the description
        tags = feature.properties.description.split('\n').pop();
        tags = tags.replace(/tags:/g, '');
        tags = tags.split(',');
        elementTags = [];

        $.each(tags, function(index, tag) {
            allTags.push(tag.trim());
            elementTags.push(tag.trim());
        });

        allTags = allTags.filter(unique);
        return elementTags
    } else {
        return [];
    }
}

// Parse uMap GeoJSON descriptions to HTML
function parseToHTML(text) {
    text = text.replace(/{{(.+)}}/g, "<img src='$1'>");
    text = text.replace(/# (.+)\n/g, "<h1>$1</h1>");
    text = text.replace(/\*\*(.+)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/: (http:\/\/.+)\n/g, ": <a href='$1'>$1</a><br />");
    text = text.replace(/elefon<\/strong>: (.+)\n/g, "elefon</strong>: <a href='tel:$1'>$1</a><br />");
    text = text.replace(/\n/g, "<br />");
    text = text.replace(/---/g, "<hr />");

    return text;
}

// Add the popup to each point
function onEachFeature(feature, layer) {
    textToParse = "";
    if (feature.properties && feature.properties.name) {
        textToParse = textToParse +"# "+ feature.properties.name + '\n';
    }
    if (feature.properties && feature.properties.description) {
        textToParse = textToParse + feature.properties.description;
    }

    layer.bindPopup(parseToHTML(textToParse));
}

function pointToLayer(feature, latlng) {
    var icon = greyIcon;
    featureTags = getTags(feature);

    // Filter if any tag is selected
    if (currentTags.length > 0) {

        // Compare matching elements by their tags
        matched = 0;
        $.each(currentTags, function(index, currentTag) {
            $.each(featureTags, function(index, tag) {
                if (currentTag === tag) {
                    matched++;
                    if (matched === currentTags.length) {
                        icon = greenIcon;
                   }
                }
            });
        });
    } else {
        icon = greenIcon;
    }

    // If an element matches, add its tags to the available tags
    if (icon === greenIcon) {
        $.each(featureTags, function(index, tagToAdd) {
            if (currentTags.indexOf(tagToAdd) === -1) {
                availableTags.push(tagToAdd);
            }
        });
        availableTags = availableTags.filter(unique);
    }

    return L.marker(latlng, {icon: icon});
}

var markerLayer;

function reloadTags(data) {
    availableTags = [];

    if (markerLayer !== undefined) {
        map.removeLayer(markerLayer);
    }

    markerLayer = L.geoJson(data, {
        pointToLayer: pointToLayer,
        onEachFeature: onEachFeature
    });

    map.addLayer(markerLayer);

    if (currentTags.length == 0) {
        availableTags = allTags;
    }

    $('#tagbar button.tag').css('opacity', 0.5).removeClass('focused').prop('disabled', true);
    $.each(currentTags, function(index, tag) {
        $('#tagbar button[data='+tag+']').css('opacity', 1).addClass('focused').prop('disabled', false);
    });
    $.each(availableTags, function(index, tag) {
        $('#tagbar button[data='+tag+']').css('opacity', 1).prop('disabled', false);
    });
}

$.getJSON('data.geojson', function(data) {
    reloadTags(data);

    $.each(availableTags, function(index, tag) {
        $('#tagbar').append('<button class="tag" data="'+ tag +'">'+ tag +'</button>');
    });
    
    $('body').on('click', 'button.tag', function() {
        if ($(this).hasClass('focused')) {
            currentTags.splice(currentTags.indexOf($(this).attr('data')), 1);
        } else {
            currentTags.push($(this).attr('data'));
        }
        currentTags = currentTags.filter(unique);
        reloadTags(data);
    });
});
