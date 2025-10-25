import { Platform, PermissionsAndroid, Alert } from 'react-native';
import notifee, { AndroidImportance, TriggerType, RepeatFrequency } from '@notifee/react-native';

// Request permission (Android 13+)
export const requestNotificationPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
                const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
                );
                console.log('Notification permission:', granted);
        }
};

// Schedule alarm function
export const scheduleAlarm = async (secondsLater: number = 10) => {
        try {
                // Create Android notification channel (only needs to be done once, repeated calls are safe)
                const channelId = await notifee.createChannel({
                        id: 'alarm-channel',
                        name: 'Alarm Channel',
                        importance: AndroidImportance.HIGH,
                        sound: 'default', // or 'alarm.mp3' if custom
                        vibration: true,
                });

                // Schedule notification
                await notifee.createTriggerNotification(
                        {
                                title: 'Wake Up! ⏰',
                                body: 'Time for pooja work 🙏',
                                android: {
                                        channelId,
                                        smallIcon: 'ic_launcher',
                                        sound: 'default',
                                        importance: AndroidImportance.HIGH,
                                },
                        },
                        {
                                type: TriggerType.TIMESTAMP,
                                timestamp: Date.now() + secondsLater * 1000,
                        }
                );

                Alert.alert('Alarm Set', `Alarm will ring in ${secondsLater} seconds!`);
        } catch (error) {
                console.log('Error scheduling alarm:', error);
        }
};

/**
 * Schedule a daily 6 PM reminder to check tomorrow's work
 */
export const scheduleDailyReminder = async () => {
        const now = new Date();
        const triggerDate = new Date();
        triggerDate.setHours(20, 0, 0, 0); // 8:00 PM 

        if (now.getTime() > triggerDate.getTime()) {
                triggerDate.setDate(triggerDate.getDate() + 1);
        }

        const channelId = await notifee.createChannel({
                id: 'daily-reminder-channel',
                name: 'Daily Reminder',
                importance: AndroidImportance.HIGH,
                sound: 'default', // use the file name without .mp3
                vibration: true,
        });

        await notifee.createTriggerNotification(
                {
                        title: 'Check Your Tomorrow’s Work',
                        body: 'Don’t forget to check your work for tomorrow!',
                        android: {
                                channelId,
                                smallIcon: 'ic_launcher',
                                sound: 'default',
                                importance: AndroidImportance.HIGH,
                        },
                },
                {
                        type: TriggerType.TIMESTAMP,
                        timestamp: triggerDate.getTime(),
                        repeatFrequency: RepeatFrequency.DAILY,
                }
        );

        console.log('Daily reminder with sound scheduled at 8:00 PM');
};


