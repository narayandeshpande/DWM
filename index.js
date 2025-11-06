// import {AppRegistry} from 'react-native';
// import App from './App';
// import BackgroundTask from './utils/BackgroundTask';

// AppRegistry.registerComponent('practice', () => App);

// // 👇 Register background task (important)
// AppRegistry.registerHeadlessTask('BackgroundFetch', () => BackgroundTask);

// import BackgroundFetch from 'react-native-background-fetch';
// import { AppRegistry } from 'react-native';
// import App from './App';
// import {BackgroundTask} from './utils/BackgroundTask'

// // Register headless task
// const MyHeadlessTask = async (event) => {
//   console.log('[BackgroundFetch HeadlessTask] start:', event.taskId);
//   await BackgroundTask();
//   BackgroundFetch.finish(event.taskId);
// };
// BackgroundFetch.registerHeadlessTask(MyHeadlessTask);

// AppRegistry.registerComponent('practice', () => App);

// import { AppRegistry, NativeModules } from 'react-native';
// import App from './App';
// const { AlarmModule } = NativeModules;
// import {BackgroundTasks} from './utils/BackgroundTask'

// // 🕐 Schedule next alarm 1 minute later
// const scheduleNextAlarm = async () => {
//   try {
//     const now = new Date();
//     const next = new Date(now.getTime() + 60000); // 30 minute later
//     AlarmModule.setAlarm(next.getTime());
//     console.log('✅ Next alarm set for:', next.toLocaleTimeString());
//   } catch (e) {
//     console.log('⚠️ scheduleNextAlarm error:', e);
//   }
// };

// // Register your main app
// AppRegistry.registerComponent('practice', () => App);

// // 🚀 Register background task (Headless JS)
// const AlarmTask = async (data) => {
//   try {
//    await BackgroundTasks()
//     console.log('🔔 Notification shown successfully!');
//     // 🔁 Schedule the next one automatically
//     await scheduleNextAlarm();
//   } catch (error) {
//     console.log('⚠️ AlarmTask error:', error);
//   }
// };
// // Register background task
// AppRegistry.registerHeadlessTask('AlarmTask', () => AlarmTask);


// import {AppRegistry, NativeModules} from 'react-native';
// import App from './App';
// import notifee, {AndroidImportance} from '@notifee/react-native';

// const {AlarmModule} = NativeModules;

// // 🕐 Schedule next alarm 1 minute later
// const scheduleNextAlarm = async () => {
//   try {
//     const now = new Date();
//     const next = new Date(now.getTime() + 60000); // 1 minute later
//     AlarmModule.setAlarm(next.getTime());
//     console.log('✅ Next alarm set for:', next.toLocaleTimeString());
//   } catch (e) {
//     console.log('⚠️ scheduleNextAlarm error:', e);
//   }
// };

// // Register your main app
// AppRegistry.registerComponent('practice', () => App);

// // 🚀 Register background task (Headless JS)
// const AlarmTask = async (data) => {
//   try {
//     console.log('⏰ Alarm Triggered:', data?.message);

//     const channelId = await notifee.createChannel({
//       id: 'alarm',
//       name: 'Repeating Alarm',
//       importance: AndroidImportance.HIGH,
//     });

//     await notifee.displayNotification({
//       title: '🕒 Reminder',
//       body: data?.message || 'This is your 1-minute repeating notification!',
//       android: {
//         channelId,
//         sound: 'default',
//         pressAction: {id: 'default'},
//         smallIcon: 'ic_launcher',
//       },
//     });

//     console.log('🔔 Notification shown successfully!');
//     // 🔁 Schedule the next one automatically
//     await scheduleNextAlarm();
//   } catch (error) {
//     console.log('⚠️ AlarmTask error:', error);
//   }
// };

// // Register background task
// AppRegistry.registerHeadlessTask('AlarmTask', () => AlarmTask);


import { AppRegistry, NativeModules } from 'react-native';
import App from './App';
import { BackgroundTasks } from './utils/BackgroundTask';

const { AlarmModule } = NativeModules;

// Register your main app
AppRegistry.registerComponent('practice', () => App);

// 🚀 Register background task (Headless JS)
// This runs when AlarmReceiver → AlarmService triggers Headless JS
const AlarmTask = async (data) => {
  try {
    console.log('⏰ Alarm Triggered:', data?.message);
    await BackgroundTasks();
    console.log('🔔 Notification shown successfully!');
  } catch (error) {
    console.log('⚠️ AlarmTask error:', error);
  }
};

// Register background task name (must match AlarmService)
AppRegistry.registerHeadlessTask('AlarmTask', () => AlarmTask);








