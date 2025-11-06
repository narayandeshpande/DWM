import { Platform, PermissionsAndroid } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { NativeModules } from 'react-native';
const { AlarmModule } = NativeModules as any;

// Request permission (Android 13+)
export const requestNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
      console.log('Notification permission:', granted);
    } catch (err) {
      console.warn('Permission request error:', err);
    }
  }

};

export async function scheduleAlarm(title: string, body: string) {
  try {
    const channelId = await notifee.createChannel({
      id: 'alarm',
      name: 'Alarm Channel',
      importance: AndroidImportance.HIGH,
      sound: 'alarm',
      vibration: true,
    });

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        sound: 'alarm',
        pressAction: { id: 'default' },
      },
    });
  } catch (err) {
    console.warn('⚠️ scheduleAlarm error:', err);
  }
}

export async function scheduleNotification(title: string, body: string) {
  try {
    const channelId = await notifee.createChannel({
      id: 'notification',
      name: 'Notification Channel',
      importance: AndroidImportance.HIGH,
      sound: 'notification',
      vibration: true,
    });

    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        sound: 'notification',
        pressAction: { id: 'default' },
      },
    });
  } catch (err) {
    console.warn('⚠️ scheduleNotification error:', err);
  }
}


