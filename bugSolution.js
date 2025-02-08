// bugSolution.js
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        setErrorMsg(`Error getting location: ${error.message}`);
        console.error("Error getting location:", error); // Added detailed error logging
      }
    })();
  }, []);

  return (
    <View>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : location ? (
        <Text>Your location: {JSON.stringify(location)}</Text>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}
