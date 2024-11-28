import React, { useState } from 'react';
import { StyleSheet, Button, Image, Alert, FlatList, TouchableOpacity } from 'react-native';
import { View, Text } from '@/components/Themed';
import DocumentScanner from 'react-native-document-scanner-plugin';

export default function TabOneScreen() {
  const [scannedDocuments, setScannedDocuments] = useState([
    {
      name: 'Invoice_12345.pdf',
      thumbnail: 'https://via.placeholder.com/100x100.png?text=Doc+1',
    },
    {
      name: 'Contract_2023.pdf',
      thumbnail: 'https://via.placeholder.com/100x100.png?text=Doc+2',
    },
    {
      name: 'Receipt_56789.pdf',
      thumbnail: 'https://via.placeholder.com/100x100.png?text=Doc+3',
    },
  ]);

  const handleScanDocument = async () => {
    try {
      const result = await DocumentScanner.scanDocument();
      /*if (result.croppedImage) {
        const newDocument = {
          name: `Scanned_${Date.now()}.pdf`,
          thumbnail: result.croppedImage,
        };
        setScannedDocuments((prev) => [newDocument, ...prev]);
      } else {
        Alert.alert('Error', 'No document detected.');
      }*/
    } catch (error: any) {
      Alert.alert('Error', `Failed to scan document: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.scanContainer}>
        <Button title="Scan" onPress={handleScanDocument} />
      </View>
      <View style={styles.listContainer}>
        <Text style={styles.title}>Recently Scanned Documents</Text>
        {scannedDocuments.length === 0 ? (
          <Text style={styles.noDocumentsText}>No documents scanned yet.</Text>
        ) : (
          <FlatList
            data={scannedDocuments}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.listItem}>
                <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
                <Text style={styles.documentName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  scanContainer: {
    flex: 1, // 1/3 wysokości
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  listContainer: {
    flex: 2, // 2/3 wysokości
    padding: 10,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  noDocumentsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  thumbnail: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  documentName: {
    fontSize: 16,
  },
});
