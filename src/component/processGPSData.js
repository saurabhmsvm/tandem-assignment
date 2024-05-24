export const processGPSData = (gpsData, stoppageThreshold) => {
  const stoppages = []
  

  let startStoppageTime = 0;
  let endStoppageTime = 0;
  let duration = 0;

  for (let i = 1; i < gpsData.length; i++) {
    const prevPoint = gpsData[i - 1];
    const currPoint = gpsData[i];

    const prevSpeed = parseInt(prevPoint.speed);
    const currSpeed = parseInt(currPoint.speed);

    if (prevSpeed === 0 || currSpeed === 0) {
      startStoppageTime = new Date(parseInt(prevPoint.eventGeneratedTime, 10));
      endStoppageTime = new Date(parseInt(currPoint.eventGeneratedTime, 10));
      duration = (endStoppageTime > startStoppageTime) ? (endStoppageTime - startStoppageTime) / (1000 * 60) : (startStoppageTime - endStoppageTime) / (1000 * 60);
    } 

      if (duration >= stoppageThreshold) {
        const stoppage = {
          reachTime: startStoppageTime.toLocaleString(),
          endTime: endStoppageTime.toLocaleString(),
          duration: duration,
          latitude: parseFloat(currPoint.latitude),
          longitude: parseFloat(currPoint.longitude)
        };
        stoppages.push(stoppage);
      }

      startStoppageTime = 0;
      endStoppageTime = 0;
      duration = 0;
  }

  return stoppages;
};
