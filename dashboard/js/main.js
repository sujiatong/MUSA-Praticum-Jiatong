let map = L.map('map').setView([47.5, -120.5], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap'
}).addTo(map);

let geojsonLayer;
let allData;
let allCounties;

// determine each state information
const stateDataFiles = {
  'WA': {
    counties: countiesData_WA,
    summary: summaryData_WA,
    center: [47.5, -120.5], // Washington point
    zoom: 7
  },
  'MD': {
    counties: countiesData_MD,
    summary: summaryData_MD,
    center: [39.0, -76.7], // Maryland central point
    zoom: 7
  },
  'OR': {
    counties: countiesData_OR,
    summary: summaryData_OR,
    center: [43.8, -120.5], 
    zoom: 7
  },
  'CA': {
    counties: countiesData_CA,
    summary: summaryData_CA,
    center: [37.25, -119.75], // add more json if necessary
    zoom: 7
  }  
};

let currentState = 'WA'; // 

// 
loadStateData(currentState);

function loadStateData(state) {
  const stateInfo = stateDataFiles[state];
  if (!stateInfo) {
    console.error('State not found:', state);
    return;
  }

  allCounties = stateInfo.counties;
  allData = stateInfo.summary;

  map.setView(stateInfo.center, stateInfo.zoom);

  // update utiltiy
  populateUtilityOptions(allData);
  populateYearOptions(allData); // display year
  updateMap();
}

function populateUtilityOptions(data) {
  const utilitySelect = document.getElementById('utilitySelect');
  utilitySelect.innerHTML = ''; // ⭐️switch state

  const utilities = new Set();
  data.features.forEach(f => {
    if (f.properties.utility_name) {
      utilities.add(f.properties.utility_name);
    }
  });

  utilities.forEach(util => {
    const option = document.createElement('option');
    option.value = util;
    option.text = util;
    utilitySelect.appendChild(option);
  });

  // "all" option
  const allOption = document.createElement('option');
  allOption.value = "All";
  allOption.text = "All Utilities";
  utilitySelect.prepend(allOption);
  utilitySelect.value = "All";
}

function updateMap() {
  const selectedYear = document.getElementById('yearSelect').value;
  const selectedUtility = document.getElementById('utilitySelect').value;
  const selectedMetric = document.querySelector('input[name="metric"]:checked').value;

  if (geojsonLayer) {
    map.removeLayer(geojsonLayer);
  }

  const lookup = {};
  allData.features.forEach(f => {
    const key = `${f.properties.NAME}_${f.properties.year}_${f.properties.utility_name}`;
    lookup[key] = {
      total_disconnections: f.properties.total_disconnections,
      mape: f.properties.mape
    };
  });

  geojsonLayer = L.geoJSON(allCounties, {
    style: function(feature) {
      const countyName = feature.properties.NAME;
      let value;

      if (selectedUtility === "All") {
        let sum = 0;
        let count = 0;
        for (let key in lookup) {
          if (key.startsWith(`${countyName}_${selectedYear}_`)) {
            const data = lookup[key];
            if (data && data[selectedMetric] !== undefined && data[selectedMetric] !== null) {
              sum += data[selectedMetric];
              count++;
            }
          }
        }
        value = count > 0 ? sum / count : undefined;
      } else {
        const key = `${countyName}_${selectedYear}_${selectedUtility}`;
        const data = lookup[key];
        value = data ? data[selectedMetric] : undefined;
      }

      return {
        fillColor: (value !== undefined && value !== null) ? getColor(value, selectedMetric) : '#cce5ff',
        weight: 1,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      };
    },
    onEachFeature: function(feature, layer) {
      const countyName = feature.properties.NAME;
      let value;

      if (selectedUtility === "All") {
        let sum = 0;
        let count = 0;
        for (let key in lookup) {
          if (key.startsWith(`${countyName}_${selectedYear}_`)) {
            const data = lookup[key];
            if (data && data[selectedMetric] !== undefined && data[selectedMetric] !== null) {
              sum += data[selectedMetric];
              count++;
            }
          }
        }
        value = count > 0 ? sum / count : undefined;
      } else {
        const key = `${countyName}_${selectedYear}_${selectedUtility}`;
        const data = lookup[key];
        value = data ? data[selectedMetric] : undefined;
      }

      layer.bindPopup(
        "County: " + countyName +
        "<br>Year: " + selectedYear +
        "<br>Utility: " + (selectedUtility !== "All" ? selectedUtility : "Multiple") +
        `<br>${selectedMetric === 'total_disconnections' ? 'Total Disconnections' : 'MAPE'}: ` +
        (value !== undefined ? value.toFixed(2) : "NA")
      );
    }
  }).addTo(map);
}

function getColor(d, metric) {
  if (d === undefined || d === null || isNaN(d)) {
    return '#cce5ff';
  }

  if (metric === 'total_disconnections') {
    return d > 2000 ? '#800026' :
           d > 1000 ? '#BD0026' :
           d > 500  ? '#E31A1C' :
           d > 200  ? '#FC4E2A' :
           d > 100  ? '#FD8D3C' :
           d > 50   ? '#FEB24C' :
           d > 0    ? '#FED976' :
                      '#FFEDA0';
  } else if (metric === 'mape') {
    return d > 50 ? '#084081' :
           d > 30 ? '#0868AC' :
           d > 20 ? '#2B8CBE' :
           d > 10 ? '#4EB3D3' :
           d > 5  ? '#7BCCC4' :
           d > 0  ? '#A8DDB5' :
                    '#CCEBC5';
  }
}

// change event
document.getElementById('yearSelect').addEventListener('change', updateMap);
document.getElementById('utilitySelect').addEventListener('change', updateMap);

// state select
document.getElementById('stateSelect').addEventListener('change', function() {
  const newState = this.value;
  currentState = newState;
  loadStateData(newState);
});

/// year
function populateYearOptions(data) {
  const yearSelect = document.getElementById('yearSelect');
  yearSelect.innerHTML = ''; // ⭐️clean year select

  const years = new Set();
  data.features.forEach(f => {
    if (f.properties.year) {
      years.add(f.properties.year);
    }
  });

  // set & array
  const sortedYears = Array.from(years).sort((a, b) => a - b);

  sortedYears.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.text = year;
    yearSelect.appendChild(option);
  });
}
