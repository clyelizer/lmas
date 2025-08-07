import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const TeacherDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tableau de Bord Professeur</Text>
      <Button
        title="Ajouter des notes"
        onPress={() => navigation.navigate('GradeManagement')}
        buttonStyle={styles.button}
      />
      <Button
        title="Consulter les notes"
        onPress={() => navigation.navigate('GradeList')}
        buttonStyle={styles.button}
      />
      <Button
        title="Ajouter via OCR"
        onPress={() => navigation.navigate('OcrGrade')}
        buttonStyle={styles.button}
      />
      <Button
        title="Générer un bulletin"
        onPress={() => navigation.navigate('Bulletin')}
        buttonStyle={styles.button}
      />
      <Button
        title="Retour"
        onPress={() => navigation.navigate('Home')}
        buttonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginVertical: 10,
    width: 200,
  },
});

export default TeacherDashboard;
