const displayMaps= () => {

fetch(`/api/cache`).then(function (response) {
    return response.json();
}).then(function (data) {
    for(let i = 0; i< data.length; i++) {
        // console.log(data[i]);
        let map = L.map(`map-${data[i].id}`).setView([data[i].lat, data[i].lon], 20);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([data[i].lat, data[i].lon]).addTo(map);
    }
})



    

}

displayMaps()

// let map = L.map(`map-1`).setView([50, 50], 13);
//     L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//         maxZoom: 10,
//         attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//     }).addTo(map);
//     var marker = L.marker([50, 50]).addTo(map);