package com.practice;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.provider.Settings;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AlarmModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public AlarmModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "AlarmModule";
    }

    /**
     * Schedule a one-time exact alarm for a given timestamp.
     * Each alarm is unique because it uses a unique requestCode.
     */
    @ReactMethod
    public void setAlarm(double timestamp) {
        long timeInMillis = (long) timestamp;
        Context context = reactContext.getApplicationContext();

        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(context, AlarmReceiver.class);

        // 🆕 Unique request code for every alarm (so they don’t overwrite each other)
        int requestCode = (int) (System.currentTimeMillis() & 0xfffffff);

        PendingIntent pendingIntent = PendingIntent.getBroadcast(
                context,
                requestCode,
                intent,
                PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);

        // ✅ Handle Android 12+ Exact Alarm Permission
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            if (alarmManager != null && !alarmManager.canScheduleExactAlarms()) {
                try {
                    Intent settingsIntent = new Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM);
                    settingsIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    context.startActivity(settingsIntent);
                    Log.w("AlarmModule", "⚠️ Exact alarm permission not granted — requesting user permission");
                    return;
                } catch (Exception e) {
                    Log.e("AlarmModule", "❌ Failed to open exact alarm settings: " + e.getMessage());
                }
            }
        }

        // 🕐 Schedule the alarm
        if (alarmManager != null) {
            alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, timeInMillis, pendingIntent);
            Log.d("AlarmModule", "⏰ Alarm set for " + new java.util.Date(timeInMillis) +
                    " (reqCode=" + requestCode + ")");
        } else {
            Log.e("AlarmModule", "❌ AlarmManager is null — cannot schedule alarm");
        }
    }

    /**
     * (Optional) Cancel a specific alarm by its ID — you can use later.
     */
    @ReactMethod
    public void cancelAlarm(int requestCode) {
        Context context = reactContext.getApplicationContext();
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(context, AlarmReceiver.class);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(
                context,
                requestCode,
                intent,
                PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);

        if (alarmManager != null) {
            alarmManager.cancel(pendingIntent);
            Log.d("AlarmModule", "🛑 Alarm cancelled (reqCode=" + requestCode + ")");
        } else {
            Log.e("AlarmModule", "❌ AlarmManager is null — cannot cancel alarm");
        }
    }

    @ReactMethod
    public void setDaily8PMAlarm() {
        Context context = reactContext.getApplicationContext();
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

        if (alarmManager == null) {
            Log.e("AlarmModule", "❌ AlarmManager is null — cannot schedule 9PM alarm");
            return;
        }

        // Intent for your AlarmReceiver
        Intent intent = new Intent(context, AlarmReceiver.class);
        intent.putExtra("message", "🕘 It's 9 PM! Check your tomorrow's todos.");

        PendingIntent pendingIntent = PendingIntent.getBroadcast(
                context,
                1009, // fixed request code so it doesn’t duplicate
                intent,
                PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);

        // ✅ Handle Android 12+ Exact Alarm Permission
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            if (!alarmManager.canScheduleExactAlarms()) {
                try {
                    Intent settingsIntent = new Intent(Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM);
                    settingsIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    context.startActivity(settingsIntent);
                    Log.w("AlarmModule", "⚠️ Exact alarm permission not granted — requesting user permission");
                    return;
                } catch (Exception e) {
                    Log.e("AlarmModule", "❌ Failed to open exact alarm settings: " + e.getMessage());
                }
            }
        }

        // Calculate next 9 PM
        java.util.Calendar calendar = java.util.Calendar.getInstance();
        calendar.setTimeInMillis(System.currentTimeMillis());
        calendar.set(java.util.Calendar.HOUR_OF_DAY, 20); // 21 = 9 PM
        calendar.set(java.util.Calendar.MINUTE, 0);
        calendar.set(java.util.Calendar.SECOND, 0);
        calendar.set(java.util.Calendar.MILLISECOND, 0);

        // If 9 PM already passed today, schedule for tomorrow
        if (calendar.getTimeInMillis() <= System.currentTimeMillis()) {
            calendar.add(java.util.Calendar.DAY_OF_MONTH, 1);
        }

        long triggerTime = calendar.getTimeInMillis();

        // 🕗 Schedule repeating alarm every 24 hours
        alarmManager.setRepeating(
                AlarmManager.RTC_WAKEUP,
                triggerTime,
                AlarmManager.INTERVAL_DAY,
                pendingIntent);

        Log.d("AlarmModule", "✅ Daily 9 PM alarm set for: " + calendar.getTime());
    }
}
