import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';

import App from './App';

// Verificar se a inicialização está ocorrendo
console.log('Initializing App...');

registerRootComponent(App);

console.log('App Registered Successfully');
