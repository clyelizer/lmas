import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card } from 'react-native-elements';
import { useState, useEffect } from 'react';
import api from '../services/api';
import Toast from 'react-native-toast-message';

const GradeListScreen = () => {
  const [grades, setGrades] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGrades();
  }, [page]);

  const fetchGrades = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/grades?page=${page}`);
      setGrades(response.data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erreur lors du chargement des notes',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <Card>
      <Text>Étudiant: {item.student.username}</Text>
      <Text>Matière: {item.subject}</Text>
      <Text>Note Classe: {item.moy_cl}</Text>
      <Text>Note Composition: {item.n_compo}</Text>
      <Text>Coefficient: {item.coef}</Text>
      <Text>Appréciation: {item.appreciation}</Text>
      <Text>Période: {item.period}</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <Text h4 style={styles.title}>Liste des Notes</Text>
      <FlatList
        data={grades}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <Text>Chargement...</Text>}
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
});

export default GradeListScreen;
