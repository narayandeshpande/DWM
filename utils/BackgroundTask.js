import notifee from '@notifee/react-native';
import BackgroundFetch from 'react-native-background-fetch';
import { scheduleAlarm } from './notificationService';



export default async function BackgroundTask() {
        // console.log('✅ BackgroundTask triggered in headless mode')
        let isItDailyTimer = false
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        // console.log(`⏰ Time: ${hours}:${minutes}`);

        // this is for daily Reminder
        if (hours === 20 && minutes >= 1) {
                isItDailyTimer = true
                // console.log('🚀 Running scheduleAlarm() in headless mode');
                await scheduleAlarm("Daily Work Reminder 🔔", "It’s time to review your tasks for tomorrow 📅. Stay prepared and organized 💪✨!"); // works if it’s plain async function
        }


        // show this notification if need with one varibale is show notification
        if (!isItDailyTimer) {
                await notifee.displayNotification({
                        title: '⏰ Background check',
                        body: `Time: ${hours}:${minutes}`,
                        android: { channelId, smallIcon: 'ic_launcher' },
                });
        }
}

export const initBackgroundTask = async () => {
        // Configure background fetch
        BackgroundFetch.configure(
                {
                        minimumFetchInterval: 60, // every 1 hours  
                        forceAlarmManager: true, // ensures frequent execution
                        stopOnTerminate: false,  // keep running after app is killed
                        startOnBoot: true,       // auto-start after device reboot
                        enableHeadless: true,
                        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE,
                },
                async (taskId) => {
                        // console.log('[BackgroundFetch] taskId:', taskId);
                        BackgroundTask()
                        // MUST call finish()
                        BackgroundFetch.finish(taskId);
                },
                (error) => {
                        console.log('[BackgroundFetch] failed to start:', error);
                }
        );

        // Start background fetch manually
        BackgroundFetch.start();
};
