import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import i18n from '../config/i18n';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{i18n.t('home.title')}</Text>
      <Button
        title={i18n.t('home.principal_button')}
        onPress={() => navigation.navigate('Login')}
        buttonStyle={styles.button}
      />
      <Button
        title={i18n.t('home.teacher_button')}
        onPress={() => navigation.navigate('Teacher')}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    marginVertical: 10,
    width: 200,
  },
});

export default HomeScreen;
