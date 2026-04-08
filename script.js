/* ESA Member States Data */
const esaMembers = [
    { country: "Austria", name: "FFG (Austrian Research Promotion Agency)", city: "Vienna", address: "Sensengasse 1, 1090 Wien, Austria", lat: 48.2205, lng: 16.3538 },
    { country: "Belgium", name: "BELSPO (Belgian Federal Science Policy Office)", city: "Brussels", address: "WTC III, Simon Bolivarlaan 30, 1000 Brussels, Belgium", lat: 50.8601, lng: 4.3562 },
    { country: "Czech Republic", name: "MDCR (Ministry of Transport)", city: "Prague", address: "nábř. L. Svobody 1222/12, 110 15 Nové Město, Czechia", lat: 50.0924, lng: 14.4347 },
    { country: "Denmark", name: "UFM (Danish Agency for Higher Education and Science)", city: "Copenhagen", address: "Haraldsgade 53, 2100 København, Denmark", lat: 55.7063, lng: 12.5539 },
    { country: "Estonia", name: "Estonian Space Office", city: "Tallinn", address: "Sepise 7, 11415 Tallinn, Estonia", lat: 59.4223, lng: 24.8058 },
    { country: "Finland", name: "Business Finland", city: "Helsinki", address: "Porkkalankatu 1, 00180 Helsinki, Finland", lat: 60.1633, lng: 24.9126 },
    { country: "France", name: "CNES (National Centre for Space Studies)", city: "Paris", address: "2 Place Maurice Quentin, 75001 Paris, France", lat: 48.8617, lng: 2.3456 },
    { country: "Germany", name: "DLR (German Aerospace Center)", city: "Cologne", address: "Linder Höhe, 51147 Köln, Germany", lat: 50.8524, lng: 7.1228 },
    { country: "Greece", name: "Hellenic Space Center (HSC)", city: "Athens", address: "Kifissias Ave. 11, 151 23 Marousi, Greece", lat: 38.0315, lng: 23.7997 },
    { country: "Hungary", name: "Hungarian Space Office (HSO)", city: "Budapest", address: "Fő u. 44-50, 1011 Budapest, Hungary", lat: 47.5054, lng: 19.0384 },
    { country: "Ireland", name: "Enterprise Ireland", city: "Dublin", address: "East Point Business Park, Dublin 3, Ireland", lat: 53.3592, lng: -6.2238 },
    { country: "Italy", name: "ASI (Italian Space Agency)", city: "Rome", address: "Via del Politecnico snc, 00133 Roma, Italy", lat: 41.8610, lng: 12.6247 },
    { country: "Luxembourg", name: "Luxembourg Space Agency (LSA)", city: "Luxembourg City", address: "19-21 Boulevard Royal, 2449 Luxembourg", lat: 49.6117, lng: 6.1265 },
    { country: "Netherlands", name: "Netherlands Space Office (NSO)", city: "The Hague", address: "Prinses Beatrixlaan 2, 2595 AL Den Haag, Netherlands", lat: 52.0805, lng: 4.3275 },
    { country: "Norway", name: "Norwegian Space Agency (NOSA)", city: "Oslo", address: "Drammensveien 165, 0277 Oslo, Norway", lat: 59.9213, lng: 10.6865 },
    { country: "Poland", name: "POLSA (Polish Space Agency)", city: "Gdansk", address: "Trzy Lipy 3, 80-172 Gdańsk, Poland", lat: 54.3486, lng: 18.5721 },
    { country: "Portugal", name: "PT Space (Portuguese Space Agency)", city: "Lisbon", address: "Estr. das Laranjeiras 205, 1649-018 Lisboa, Portugal", lat: 38.7456, lng: -9.1678 },
    { country: "Romania", name: "ROSA (Romanian Space Agency)", city: "Bucharest", address: "Str. Mendeleev nr. 21-25, 010362 București, Romania", lat: 44.4447, lng: 26.0957 },
    { country: "Spain", name: "AEE (Agencia Espacial Española)", city: "Seville", address: "Av. de José Galán Merino, s/n, 41015 Sevilla, Spain", lat: 37.4116, lng: -5.9928 },
    { country: "Sweden", name: "SNSA (Swedish National Space Agency)", city: "Solna", address: "Hemvärnsgatan 15, 171 54 Solna, Sweden", lat: 59.3512, lng: 17.9739 },
    { country: "Switzerland", name: "SSO (Swiss Space Office)", city: "Bern", address: "Einsteinstrasse 2, 3003 Bern, Switzerland", lat: 46.9407, lng: 7.4526 },
    { country: "United Kingdom", name: "UKSA (UK Space Agency)", city: "Swindon", address: "Polaris House, North Star Ave, Swindon SN2 1SZ, UK", lat: 51.5644, lng: -1.7852 }
];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Map - Center of Europe
    const map = L.map('map', {
        center: [49.0, 10.0],
        zoom: 4,
        zoomControl: false // Add it later to a different position if needed
    });

    L.control.zoom({
        position: 'topright'
    }).addTo(map);

    // Use a dark theme map from CartoDB
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Custom glowing marker icon
    const esaIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="marker-pin"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
    });

    const tbody = document.querySelector('#agencies-table tbody');
    const markers = [];

    // Populate data
    esaMembers.forEach((member, index) => {
        // Add Marker
        const marker = L.marker([member.lat, member.lng], { icon: esaIcon }).addTo(map);
        marker.bindPopup(`
            <h3>${member.country}</h3>
            <p><strong>Agency:</strong> ${member.name}</p>
            <p><strong>City:</strong> ${member.city}</p>
        `);
        markers.push(marker);

        // Add Table Row
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="highlight">${member.name}</td>
            <td>${member.country}</td>
            <td>${member.city}</td>
            <td>${member.address}</td>
            <td style="font-family: monospace;">${member.lat.toFixed(4)}, ${member.lng.toFixed(4)}</td>
        `;
        
        // Interaction: Clicking row centers map
        tr.addEventListener('click', () => {
            map.flyTo([member.lat, member.lng], 8, {
                animate: true,
                duration: 1.5
            });
            setTimeout(() => {
                marker.openPopup();
            }, 1500);
            
            // Highlight active row temporarily
            const allRows = document.querySelectorAll('#agencies-table tbody tr');
            allRows.forEach(r => r.style.background = 'transparent');
            tr.style.background = 'rgba(56, 189, 248, 0.15)';
        });

        tbody.appendChild(tr);
    });
});
