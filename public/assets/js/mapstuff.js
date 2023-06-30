const displayMaps= async () => {

const cacheData = await fetch(`/`, {
    method: 'GET',
    body: JSON.stringify({id, lat, lon}),
    header: {
        'Content-Type': 'application/json'
    },
})

for (let index = 0; index < array.length; index++) {
    let map = L.map(`map-id`).setView([41.994, -87.6602], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 10,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([41.994, -87.6602]).addTo(map);
}
}