import { Platform, PermissionsAndroid, Alert } from 'react-native';
import notifee, { AndroidImportance, TriggerType, RepeatFrequency } from '@notifee/react-native';

// Request permission (Android 13+)
export const requestNotificationPermission = async () => {
        if (Platform.OS === 'android' && Platform.Version >= 33) {
                const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
                );

                console.log('Notification permission:', granted);
        }
};

export async function scheduleAlarm(title:string,body:string) {
        const channelId = await notifee.createChannel({
                id: 'alarm',
                name: 'Alarm Channel',
                importance: AndroidImportance.HIGH,
                sound: 'alarm', // or 'alarm.mp3' if custom
                vibration: true,
        });

        await notifee.displayNotification({
                title: title,
                body: body,
                android: {
                        channelId,
                        smallIcon: 'ic_launcher',
                        sound: 'alarm', // ensure you have sound enabled
                        pressAction: { id: 'default' },
                },
        });
}



