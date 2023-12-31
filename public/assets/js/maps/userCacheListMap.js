mapboxgl.accessToken = 'pk.eyJ1IjoibWNobWVkaWEiLCJhIjoiY2xqbHJ3MDByMHVqcjNocGJiZnZoMGI2biJ9.Hn1DeJrMYc1622-RKUH-fA';

const map = new mapboxgl.Map({
    container: 'big-map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-87.84, 42.0],
    zoom: 10
});


const displayMaps = () => {

    fetch('/api/cache/user/id')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            for (let i = 0; i < data.caches.length; i++) {
                const marker = new mapboxgl.Marker()
                    .setLngLat([data.caches[i].lon, data.caches[i].lat])
                    .addTo(map);
            }
            return map;
        })

        .catch(function (error) {
            console.error('Error fetching data:', error);
        });
}

function zoomMap(lat, lon) {
    map.setCenter([lon, lat]);
    map.setZoom(17);
}

displayMaps();