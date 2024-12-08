import React, { useState } from 'react';
import { StyleSheet, Button, Alert, FlatList, TouchableOpacity, Modal, Share } from 'react-native';
import { View, Text } from '@/components/Themed';
import DocumentScanner from 'react-native-document-scanner-plugin';
import Pdf from 'react-native-pdf';

export default function Tab() {
  const [scannedDocuments, setScannedDocuments] = useState([
    {
      name: 'Invoice_12345.pdf',
      uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
      name: 'Contract_2023.pdf',
      uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
      name: 'Receipt_56789.pdf',
      uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
  ]);

  const [selectedDocument, setSelectedDocument] = useState<null | { name: string; uri: string }>(null);
  const handleScanDocument = async () => {
    try {
      const result = await DocumentScanner.scanDocument();
      /*if (result.croppedImage) {
        const newDocument = {
          name: `Scanned_${Date.now()}.pdf`,
          uri: result.croppedImage, // Zamień na właściwy URI pliku PDF
        };
        setScannedDocuments((prev) => [newDocument, ...prev]);
      } else {
        Alert.alert('Error', 'No document detected.');
      }*/
    } catch (error: any) {
      Alert.alert('Error', `Failed to scan document: ${error.message}`);
    }
  };

  const handleShareDocument = async () => {
    if (selectedDocument) {
      try {
        await Share.share({
          message: `Check out this document: ${selectedDocument.name}`,
          url: selectedDocument.uri,
        });
      } catch (error) {
      // Alert.alert('Error', `Failed to share document: ${error.message}`);
      console.log("Failed to share document");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.scanContainer}>
        <Button title="Scan Document" onPress={handleScanDocument} />
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
              <TouchableOpacity
                style={styles.listItem}
                onPress={() => setSelectedDocument({ name: item.name, uri: item.uri })}
              >
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  listContainer: {
    flex: 2,
    padding: 10,
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
  documentName: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pdfViewer: {
    width: '90%',
    height: '70%',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
});