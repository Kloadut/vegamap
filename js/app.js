// Initialize map's position to Gôteborg
var map = L.map('map').setView([57.6997, 11.9540], 13);

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

//setTimeout(function () {
//    $('#logo').fadeOut(function() {
//        $(this).remove();
//    });
//}, 3000);

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
    iconUrl: 'images/icons/vegan-food.png',

    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 50], // size of the shadow
    iconAnchor:   [24, 47], // point of the icon which will correspond to marker's location
    shadowAnchor: [24, 47],  // the same for the shadow
    popupAnchor:  [0, -36] // point from which the popup should open relative to the iconAnchor
});

var greyIcon = L.icon({
    iconUrl: 'images/vegan-fade.png',

    iconSize:     [25, 25], // size of the icon
    iconAnchor:   [12, 24], // point of the icon which will correspond to marker's location
    shadowAnchor: [12, 24],  // the same for the shadow
    popupAnchor:  [0, -18] // point from which the popup should open relative to the iconAnchor
});

var restaurantIcon = L.icon({
    iconUrl: 'images/icons/restaurant.png',

    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 50], // size of the shadow
    iconAnchor:   [24, 47], // point of the icon which will correspond to marker's location
    shadowAnchor: [24, 47],  // the same for the shadow
    popupAnchor:  [0, -36] // point from which the popup should open relative to the iconAnchor
});

var cafeIcon = L.icon({
    iconUrl: 'images/icons/cafe.png',

    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 50], // size of the shadow
    iconAnchor:   [24, 47], // point of the icon which will correspond to marker's location
    shadowAnchor: [24, 47],  // the same for the shadow
    popupAnchor:  [0, -36] // point from which the popup should open relative to the iconAnchor
});

var indianIcon = L.icon({
    iconUrl: 'images/icons/india.png',

    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 50], // size of the shadow
    iconAnchor:   [24, 47], // point of the icon which will correspond to marker's location
    shadowAnchor: [24, 47],  // the same for the shadow
    popupAnchor:  [0, -36] // point from which the popup should open relative to the iconAnchor
});

var sushiIcon = L.icon({
    iconUrl: 'images/icons/sushi.png',

    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 50], // size of the shadow
    iconAnchor:   [24, 47], // point of the icon which will correspond to marker's location
    shadowAnchor: [24, 47],  // the same for the shadow
    popupAnchor:  [0, -36] // point from which the popup should open relative to the iconAnchor
});

var noodleIcon = L.icon({
    iconUrl: 'images/icons/noodles.png',

    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 50], // size of the shadow
    iconAnchor:   [24, 47], // point of the icon which will correspond to marker's location
    shadowAnchor: [24, 47],  // the same for the shadow
    popupAnchor:  [0, -36] // point from which the popup should open relative to the iconAnchor
});

var pastaIcon = L.icon({
    iconUrl: 'images/icons/pasta.png',

    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 50], // size of the shadow
    iconAnchor:   [24, 47], // point of the icon which will correspond to marker's location
    shadowAnchor: [24, 47],  // the same for the shadow
    popupAnchor:  [0, -36] // point from which the popup should open relative to the iconAnchor
});

var friesIcon = L.icon({
    iconUrl: 'images/icons/fries.png',

    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 50], // size of the shadow
    iconAnchor:   [24, 47], // point of the icon which will correspond to marker's location
    shadowAnchor: [24, 47],  // the same for the shadow
    popupAnchor:  [0, -36] // point from which the popup should open relative to the iconAnchor
});

var burgerIcon = L.icon({
    iconUrl: 'images/icons/burger.png',

    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 50], // size of the shadow
    iconAnchor:   [24, 47], // point of the icon which will correspond to marker's location
    shadowAnchor: [24, 47],  // the same for the shadow
    popupAnchor:  [0, -36] // point from which the popup should open relative to the iconAnchor
});

var pizzaIcon = L.icon({
    iconUrl: 'images/icons/pizza.png',

    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 50], // size of the shadow
    iconAnchor:   [24, 47], // point of the icon which will correspond to marker's location
    shadowAnchor: [24, 47],  // the same for the shadow
    popupAnchor:  [0, -36] // point from which the popup should open relative to the iconAnchor
});

var beerIcon = L.icon({
    iconUrl: 'images/icons/beer.png',

    iconSize:     [50, 50], // size of the icon
    shadowSize:   [50, 50], // size of the shadow
    iconAnchor:   [24, 47], // point of the icon which will correspond to marker's location
    shadowAnchor: [24, 47],  // the same for the shadow
    popupAnchor:  [0, -36] // point from which the popup should open relative to the iconAnchor
});

var favoriteIcon = L.icon({
    iconUrl: 'images/icons/vegan.png',

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
function parseToHTML(title, text) {
    text = text.replace(/tags:(.*)/g, '');
    text = text.replace(/{{(.+)}}\n\n/g, "<img src='$1'><h1>"+ title +"</h1>");
    text = text.replace(/# (.+)\n/g, "<h1>$1</h1>");
    matchedAddress = text.match(/dress\*\*: (.+)\n/g)
    if (matchedAddress !== null) {
        address = matchedAddress[0].replace(/dress\*\*: (.+)\n/g, "$1");
    } else {
        address = 'nope'
    }
    text = text.replace(/\*\*(.+)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/: (http:\/\/.+)\n/g, ": <a href='$1' target=_blank>$1</a><br />");
    text = text.replace(/elefon<\/strong>: (.+)\n/g, "elefon</strong>: <a href='tel:$1'>$1</a><br />");
    text = text.replace(/\n/g, "<br />");
    //text = text.replace(/---/g, "<hr />");
    text = text.replace(/---/g, "");
    text = text + '<a class="go" href="https://www.google.se/maps/dir//'+ address.replace(/ /g, '+') +',Göteborg/@57.7023257,11.9619544,13z/" target=_blank>Go!</a>'

    return text;
}

// Add the popup to each point
function onEachFeature(feature, layer) {
    if (feature.properties && !feature.properties.hidden && feature.properties.description && feature.properties.name) {
        layer.bindPopup(parseToHTML(feature.properties.name, feature.properties.description), { closeButton: false });
    }
}

function pointToLayer(feature, latlng) {
    var icon = greyIcon;
    feature.properties.hidden = true;
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
        feature.properties.hidden = false;
        $.each(featureTags, function(index, tagToAdd) {
            if (currentTags.indexOf(tagToAdd) === -1) {
                availableTags.push(tagToAdd);
            }
        });
        availableTags = availableTags.filter(unique);

        if (featureTags.indexOf('favorite') !== -1) {
            icon = favoriteIcon;
        } else if (featureTags.indexOf('sushi') !== -1) {
            icon = sushiIcon;
        } else if (featureTags.indexOf('indian') !== -1) {
            icon = indianIcon;
        } else if (featureTags.indexOf('east-asian') !== -1) {
            icon = noodleIcon;
        } else if (featureTags.indexOf('café') !== -1) {
            icon = cafeIcon;
        } else if (featureTags.indexOf('pizza') !== -1) {
            icon = pizzaIcon;
        } else if (featureTags.indexOf('junk-food') !== -1) {
            icon = friesIcon;
        } else if (featureTags.indexOf('pasta') !== -1) {
            icon = pastaIcon;
        } else if (featureTags.indexOf('hamburger') !== -1 || featureTags.indexOf('burger') !== -1) {
            icon = burgerIcon;
        } else if (featureTags.indexOf('beer') !== -1 || featureTags.indexOf('pub') !== -1) {
            icon = beerIcon;
        } else if (featureTags.indexOf('restaurant') !== -1) {
            icon = restaurantIcon;
        } else if (featureTags.indexOf('vegan') !== -1) {
            icon = greenIcon;
        }

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

computeData = function(data) {
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

    $('body').on('click', '#logo', function() {
        $('#layout').fadeToggle();
    });
}

$.getJSON('https://goteborg.vegamap.org/data.geojson', computeData)
  .fail(function() {
    $.getJSON('data.geojson', computeData);
  });
