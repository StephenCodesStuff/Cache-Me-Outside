mapboxgl.accessToken = 'pk.eyJ1IjoibWNobWVkaWEiLCJhIjoiY2xqbHJ3MDByMHVqcjNocGJiZnZoMGI2biJ9.Hn1DeJrMYc1622-RKUH-fA';

const lat = document.getElementById('lat').textContent;
const lon = document.getElementById('lon').textContent;



const displayMap = () => {
    console.log(lat, lon)

         const map = new mapboxgl.Map({
                container: 'selected-map',
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [lon, lat],
                zoom: 15
            });
        
            const marker = new mapboxgl.Marker()
                .setLngLat([lon, lat])
                .addTo(map);
        }

displayMap();