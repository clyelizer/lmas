import { View, StyleSheet, FlatList } from 'react-native';
import { Input, Button, Text, Card } from 'react-native-elements';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import api from '../services/api';
import Toast from 'react-native-toast-message';

const schema = yup.object().shape({
  student_id: yup.number().required('Étudiant requis'),
  subject: yup.string().required('Matière requise'),
  moy_cl: yup.number().min(0).max(20).required('Note de classe requise'),
  n_compo: yup.number().min(0).max(20).required('Note de composition requise'),
  coef: yup.number().min(1).required('Coefficient requis'),
  period: yup.string().required('Période requise'),
});

const GradeManagementScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  // Charger les étudiants et les matières (simulé, à adapter avec API)
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/users?role=student');
        setStudents(response.data);
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Erreur lors du chargement des étudiants' });
      }
    };

    const fetchSubjects = async () => {
      // À implémenter avec l'API des structures de bulletin
      setSubjects(['MATHS', 'PHYSIQUE', 'CHIMIE', 'ANGLAIS']);
    };

    fetchStudents();
    fetchSubjects();
  }, []);

  const onSubmit = async (data) => {
    try {
      await api.post('/grades', data);
      Toast.show({ type: 'success', text1: 'Note ajoutée avec succès' });
      reset();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error.response?.data?.error || 'Erreur lors de l’ajout',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Ajouter une Note</Text>
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
        name="subject"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Matière"
            onChangeText={onChange}
            value={value}
            errorMessage={errors.subject?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="moy_cl"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Note de classe (0-20)"
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
            errorMessage={errors.moy_cl?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="n_compo"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Note de composition (0-20)"
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
            errorMessage={errors.n_compo?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="coef"
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="Coefficient"
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
            errorMessage={errors.coef?.message}
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
        title="Ajouter"
        onPress={handleSubmit(onSubmit)}
        buttonStyle={styles.button}
      />
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
    marginTop: 10,
  },
});

export default GradeManagementScreen;
