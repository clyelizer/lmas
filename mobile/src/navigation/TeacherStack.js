import { createStackNavigator } from '@react-navigation/stack';
import TeacherDashboard from '../screens/TeacherDashboard';
import GradeManagementScreen from '../screens/GradeManagementScreen';
import GradeListScreen from '../screens/GradeListScreen';
import OcrGradeScreen from '../screens/OcrGradeScreen';
import BulletinScreen from '../screens/BulletinScreen';

const Stack = createStackNavigator();

const TeacherStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TeacherDashboard"
        component={TeacherDashboard}
        options={{ title: 'Tableau de Bord Professeur' }}
      />
      <Stack.Screen
        name="GradeManagement"
        component={GradeManagementScreen}
        options={{ title: 'Ajouter une Note' }}
      />
      <Stack.Screen
        name="GradeList"
        component={GradeListScreen}
        options={{ title: 'Consulter les Notes' }}
      />
      <Stack.Screen
        name="OcrGrade"
        component={OcrGradeScreen}
        options={{ title: 'Ajouter une Note via OCR' }}
      />
      <Stack.Screen
        name="Bulletin"
        component={BulletinScreen}
        options={{ title: 'Générer un Bulletin' }}
      />
    </Stack.Navigator>
  );
};

export default TeacherStack;
