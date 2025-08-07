import { createStackNavigator } from '@react-navigation/stack';
import PrincipalDashboard from '../screens/PrincipalDashboard';
import BulletinScreen from '../screens/BulletinScreen';

const Stack = createStackNavigator();

const PrincipalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PrincipalDashboard"
        component={PrincipalDashboard}
        options={{ title: 'Tableau de Bord Proviseur' }}
      />
      <Stack.Screen
        name="Bulletin"
        component={BulletinScreen}
        options={{ title: 'Générer un Bulletin' }}
      />
    </Stack.Navigator>
  );
};

export default PrincipalStack;
