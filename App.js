//import 'react-native-gesture-handler';
import PrincipalStack from './src/Stacks/PrincipalStack';
import { PaperProvider } from 'react-native-paper';
import AuthProvider from './src/Contexts/AuthContext';

export default function App() {
  return (
    <PaperProvider>
      <AuthProvider>
        <PrincipalStack />
      </AuthProvider>
    </PaperProvider>
  );
}

