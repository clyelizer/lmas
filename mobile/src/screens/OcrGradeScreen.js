import { View, StyleSheet, Image } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { RNCamera } from 'react-native-camera';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import api from '../services/api';

const OcrGradeScreen = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [extractedData, setExtractedData] = useState(null);

  const takePicture = async (camera) => {
    try {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      setImageUri(data.uri);

      // Simuler l'extraction OCR (à remplacer par Tesseract.js ou Google Cloud Vision)
      const ocrResult = {
        student_id: 1,
        subject: 'MATHS',
        moy_cl: 14.5,
        n_compo: 15.0,
        coef: 5,
        period: '1ère Période',
      };
      setExtractedData(ocrResult);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Erreur lors de la capture' });
    }
  };

  const saveGrade = async () => {
    try {
      await api.post('/grades', extractedData);
      Toast.show({ type: 'success', text1: 'Note ajoutée via OCR' });
      navigation.goBack();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.response?.data?.error || 'Erreur lors de l’enregistrement',
      });
    }
  };

  return (
    <View style={styles.container}>
      {!imageUri ? (
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          captureAudio={false}
        >
          {({ camera }) => (
            <Button
              title="Prendre une photo"
              onPress={() => takePicture(camera)}
              buttonStyle={styles.button}
            />
          )}
        </RNCamera>
      ) : (
        <View>
          <Image source={{ uri: imageUri }} style={styles.image} />
          {extractedData && (
            <>
              <Text>Étudiant: {extractedData.student_id}</Text>
              <Text>Matière: {extractedData.subject}</Text>
              <Text>Note Classe: {extractedData.moy_cl}</Text>
              <Text>Note Composition: {extractedData.n_compo}</Text>
              <Text>Coefficient: {extractedData.coef}</Text>
              <Text>Période: {extractedData.period}</Text>
              <Button title="Valider" onPress={saveGrade} buttonStyle={styles.button} />
              <Button
                title="Reprendre"
                onPress={() => setImageUri(null)}
                buttonStyle={[styles.button, styles.cancelButton]}
              />
            </>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
});

export default OcrGradeScreen;
