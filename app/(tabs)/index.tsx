import React, { useState } from 'react';
import { StyleSheet, Button, Image, Alert } from 'react-native';
import { View, Text } from '@/components/Themed';
import DocumentScanner from 'react-native-document-scanner-plugin';

export default function TabOneScreen() {
  const [scannedImage, setScannedImage] = useState<string | null>(null);

  const handleScanDocument = async () => {
    try {
      const result = await DocumentScanner.scanDocument();
      /*if (result.croppedImage) {
        setScannedImage(result.croppedImage);
      } else {
        Alert.alert('Error', 'No document detected.');
      }*/
    } catch (error: any) {
      Alert.alert('Error', `Failed to scan document: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Document Scanner</Text>
      {!scannedImage ? (
        <Button title="Scan Document" onPress={handleScanDocument} />
      ) : (
        <View style={styles.previewContainer}>
          <Image source={{ uri: scannedImage }} style={styles.scannedImage} />
          <Button title="Scan Again" onPress={() => setScannedImage(null)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  previewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannedImage: {
    width: 300,
    height: 400,
    resizeMode: 'contain',
    marginVertical: 20,
  },
});
