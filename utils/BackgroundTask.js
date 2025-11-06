import { scheduleAlarm, scheduleNotification } from './notificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function BackgroundTasks() {
  try {
    console.log('✅ BackgroundTask triggered in headless mode');
    let isItDailyTimer = false;
    let isItNotification = false;
    let title = '';
    let body = '';
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    console.log(`⏰ Time: ${hours}:${minutes}`);

    // daily Reminder logic (example 20:01+)
    if (hours === 20 && minutes >= 1) {
      isItDailyTimer = true;
      console.log('🚀 Running scheduleAlarm() in headless mode');
      await scheduleAlarm(
        'Daily Work Reminder 🔔',
        'It’s time to review your tasks for tomorrow 📅. Stay prepared and organized 💪✨!'
      );
    }

    // check todos safely
    let todos = null;
    try {
      const raw = await AsyncStorage.getItem('my-todo');
      if (raw) {
        // only parse if we have a string
        todos = JSON.parse(raw);
      }
    } catch (err) {
      console.warn('⚠️ Failed to read/parse todos from AsyncStorage:', err);
      todos = null;
    }

    const formattedDate = date.toISOString().split('T')[0];
    const time = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })

    if (Array.isArray(todos)) {
      for (const todo of todos) {
        if (formattedDate === todo.date && !todo.completed && todo.time===time) {
          isItNotification = true;
          title = '⏰ Task Reminder';
        body = `Don't forget: "${todo.description}" is waiting for you.`;
          break;
        }
      }
    }

    // show this notification if needed
    if (!isItDailyTimer && isItNotification) {
      await scheduleNotification(title, body);
    }

    return true;
  } catch (err) {
    console.error('❌ BackgroundTask error:', err);
    // swallow error so headless task doesn't crash
    return false;
  }
}

// export const initBackgroundTask = async () => {
//   // Configure background fetch
//   await BackgroundFetch.configure(
//     {
//       minimumFetchInterval: 15, // suggest 15 minutes (1 is ignored by OS in release)
//       forceAlarmManager: true,
//       stopOnTerminate: false,
//       startOnBoot: true,
//       enableHeadless: true,
//       requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE,
//     },
//     async (taskId) => {
//       console.log('[BackgroundFetch] event:', taskId);
//       try {
//         // await the work and make sure it completes before finish()
//         await BackgroundTask();
//       } catch (e) {
//         console.log('[BackgroundFetch] BackgroundTask thrown:', e);
//       } finally {
//         BackgroundFetch.finish(taskId);
//       }
//     },
//     (error) => {
//       console.log('[BackgroundFetch] failed to start:', error);
//     }
//   );

//   // Start background fetch
//   await BackgroundFetch.start();
// };
