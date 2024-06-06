export type Region = {
    name: string,
    lat: number,
    lon: number
}

export const regions: Region[] = [

    { name: "Aveiro", lat: 40.6333, lon: -8.6500 },
    { name: "Beja", lat: 38.0333, lon: -7.8833 },
    { name: "Braga", lat: 41.5503, lon: -8.4200 },
    { name: "Guimarães", lat: 41.4500, lon: -8.3000 },
    { name: "Bragança", lat: 41.8067, lon: -6.7589 },

    { name: "Castelo Branco", lat: 39.8167, lon: -7.5000 },
    { name: "Coimbra", lat: 40.2028, lon: -8.4139 },
    { name: "Évora", lat: 38.5667, lon: -7.9000 },
    { name: "Faro", lat: 37.0161, lon: -7.9350 },
    { name: "Sagres", lat: 37.0166, lon: -8.9412 },

    { name: "Portimão", lat: 37.1353, lon: -8.5408 },
    { name: "Loulé", lat: 37.1381, lon: -8.0217 },
    { name: "Guarda", lat: 40.5333, lon: -7.3333 },
    { name: "Penhas Douradas", lat: 40.4090, lon: -7.5553 },
    { name: "Leiria", lat: 39.7500, lon: -8.8000 },

    { name: "Lisboa", lat: 38.7253, lon: -9.1500 },
    { name: "Portalegre", lat: 39.2970, lon: -7.4301 },
    { name: "Porto", lat: 41.1578, lon: -8.6314 },
    { name: "Santarém", lat: 39.2368, lon: -8.6894 },
    { name: "Setúbal", lat: 38.5243, lon: -8.8926 },

    { name: "Sines", lat: 37.9575, lon: -8.8593 },
    { name: "Viana do Castelo", lat: 41.7000, lon: -8.8333 },
    { name: "Vila Real", lat: 41.2958, lon: -7.7461 },
    { name: "Viseu", lat: 40.6667, lon: -7.9167 },
    { name: "Funchal", lat: 32.6499, lon: -16.9101 },

    { name: "Porto Santo", lat: 33.0507, lon: -16.3472 },
    { name: "Vila do Porto", lat: 36.9563, lon: -25.1381 },
    { name: "Ponta Delgada", lat: 37.7411, lon: -25.6806 },
    { name: "Angra do Heroísmo", lat: 38.6634, lon: -27.2308 },
    { name: "Santa Cruz da Graciosa", lat: 39.0869, lon: -28.0149 },

    { name: "Velas", lat: 38.6839, lon: -28.2131 },
    { name: "Madalena", lat: 38.5303, lon: -28.5139 },
    { name: "Horta", lat: 38.5352, lon: -28.6295 },
    { name: "Santa Cruz das Flores", lat: 39.4539, lon: -31.1276 },
    { name: "Vila do Corvo", lat: 39.7023, lon: -31.1078 },

]

function degreesToRadians(degrees: number) {
    return degrees * Math.PI / 180;
}
  
export function distBetweenEarthPoints(lat1: number, lon1: number, lat2: number, lon2: number) {
    const earthRadiusKm = 6371;
  
    const dLat = degreesToRadians(lat2-lat1);
    const dLon = degreesToRadians(lon2-lon1);
  
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
  
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
}

export function getClosestRegionName(lat: number, lon: number) {
    let min = Number.MAX_VALUE;
    let region = "";
    regions.forEach(r => {
        if(min > distBetweenEarthPoints(lat, lon, r.lat, r.lon)) {
            region = r.name;
        }
    })
    return region;
}

export function getClosestRegionIdx(lat: number, lon: number) {
    let min = Number.MAX_VALUE;
    let idx = -1;
    for(let i = 0; i < regions.length; i++) {
        let r = regions[i];
        if(min > distBetweenEarthPoints(lat, lon, r.lat, r.lon)) {
            idx = i;
        }
    }
    return idx;
}