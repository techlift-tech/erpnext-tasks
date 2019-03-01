import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
// XMLHttpRequest = GLOBAL.originalXMLHttpRequest ? GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;
AppRegistry.registerComponent(appName, () => App);