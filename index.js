async function getData() {
  const response = await fetch(
    "https://api.wheretheiss.at/v1/satellites/25544"
  );
  const data = await response.json();
  const { latitude, longitude } = data;

  return { latitude, longitude };
}
function InitializeMap() {
  const myMap = L.map("issMap").setView([-23.5489, -46.6388], 7);

  const attribution =
    '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';

  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const tiles = L.tileLayer(tileUrl, { attribution });
  tiles.addTo(myMap);

  const myIcon = L.icon({
    iconUrl: "ISS.png",
    iconSize: [50, 42],
    iconAnchor: [25, 16]
  });

  const marker = L.marker([0, 0], { icon: myIcon }).addTo(myMap);
  return { myMap, marker };
}
const { myMap, marker } = InitializeMap();
function renderingMap() {
  getData().then(result => {
    const { latitude, longitude } = result;

    document.getElementById("lat").textContent = latitude;
    document.getElementById("lon").textContent = longitude;

    myMap.setView([latitude, longitude], myMap.getZoom());
    marker.setLatLng([latitude, longitude]);

    //if (firstLoad) {
    // myMap.setView([latitude, longitude]);
    //firstLoad = false;
    // }
    //L.marker([parseFloat(latitude), parseFloat(longitude)]).addTo(mymap);
    // this one can make a pointer in each point that cops goes
  });
}

setInterval(renderingMap, 2000);
