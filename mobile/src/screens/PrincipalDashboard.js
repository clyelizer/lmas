import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

const PrincipalDashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue, {user?.username}</Text>
      <Button
        title="Gérer les utilisateurs"
        onPress={() => {}}
        buttonStyle={styles.button}
      />
      <Button
        title="Gérer les classes"
        onPress={() => {}}
        buttonStyle={styles.button}
      />
      <Button
        title="Générer un bulletin"
        onPress={() => navigation.navigate('Bulletin')}
        buttonStyle={styles.button}
      />
      <Button
        title="Déconnexion"
        onPress={() => {
          dispatch(logout());
          navigation.navigate('Home');
        }}
        buttonStyle={[styles.button, styles.logoutButton]}
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
  logoutButton: {
    backgroundColor: 'red',
  },
});

export default PrincipalDashboard;
