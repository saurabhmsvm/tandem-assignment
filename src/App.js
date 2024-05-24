import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import VehicleMap from './component/VechicleMap';
import { processGPSData } from './component/processGPSData';

const App = () => {
  const [gpsData, setGpsData] = useState([]);
  const [stoppages, setStoppages] = useState([]);
  const stoppageThreshold = 5;      // threshold in minutes

  useEffect(() => {
    const fetchGPSData = async () => {
      try {
        const response = await axios.get('/data.csv');
        const csvData = response.data;
        Papa.parse(csvData, {
          header: true,
          complete: (results) => {
            setGpsData(results.data);
          },
          error: (error) => {
            console.error('Error parsing CSV data', error);
          }
        });
      } catch (error) {
        console.error('Error fetching GPS data', error);
      }
    };

    fetchGPSData();
  }, []);

  useEffect(() => {
    if (gpsData.length > 0) {
      const stops = processGPSData(gpsData, stoppageThreshold);
      setStoppages(stops);
    }
  }, [gpsData]);

  return (
    <div>
      <VehicleMap stoppages={stoppages} gpsData={gpsData} />
    </div>
  );
};

export default App;

