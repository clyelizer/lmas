import { View, StyleSheet, Linking } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import Pdf from 'react-native-pdf';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import Toast from 'react-native-toast-message';
import api from '../services/api';
import { useDispatch } from 'react-redux';
import { generateBulletin } from '../store/bulletinsSlice';

const schema = yup.object().shape({
  student_id: yup.number().required('Étudiant requis'),
  period: yup.string().required('Période requise'),
});

const BulletinScreen = () => {
  const [pdfUri, setPdfUri] = useState(null);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const fileUri = await dispatch(generateBulletin(data)).unwrap();
      setPdfUri(fileUri);
      Toast.show({ type: 'success', text1: 'Bulletin généré' });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error || 'Erreur lors de la génération',
      });
    }
  };

  const sharePdf = async () => {
    if (pdfUri && (await Sharing.isAvailableAsync())) {
      await Sharing.shareAsync(pdfUri);
    } else {
      Toast.show({ type: 'error', text1: 'Partage non disponible' });
    }
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Générer un Bulletin</Text>
      <Controller
        control={control}
        name="student_id"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="ID de l’étudiant"
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
            errorMessage={errors.student_id?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="period"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Période (ex: 1ère Période)"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.period?.message}
          />
        )}
      />
      <Button
        title="Générer"
        onPress={handleSubmit(onSubmit)}
        buttonStyle={styles.button}
      />
      {pdfUri && (
        <>
          <Pdf
            source={{ uri: pdfUri }}
            style={styles.pdf}
          />
          <Button
            title="Partager"
            onPress={sharePdf}
            buttonStyle={styles.button}
          />
          <Button
            title="Télécharger"
            onPress={() => Linking.openURL(pdfUri)}
            buttonStyle={styles.button}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: 300,
    marginVertical: 10,
  },
});

export default BulletinScreen;
