//import 'react-native-gesture-handler';
import PrincipalStack from './src/Stacks/PrincipalStack';
import { PaperProvider } from 'react-native-paper';
import AuthProvider from './src/Contexts/AuthContext';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>

          <PrincipalStack />
      </AuthProvider>
    </PaperProvider>
  );
}

