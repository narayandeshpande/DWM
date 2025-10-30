import {AppRegistry} from 'react-native';
import App from './App';
import BackgroundTask from './utils/BackgroundTask';

AppRegistry.registerComponent('practice', () => App);

// 👇 Register background task (important)
AppRegistry.registerHeadlessTask('BackgroundFetch', () => BackgroundTask);
