import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import PrincipalStack from './PrincipalStack';
import TeacherStack from './TeacherStack';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Connexion Proviseur' }}
      />
      <Stack.Screen
        name="Principal"
        component={PrincipalStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Teacher"
        component={TeacherStack}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
