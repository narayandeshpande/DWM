package com.practice;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class AlarmReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d("AlarmReceiver", "📢 Alarm triggered!");
        Intent serviceIntent = new Intent(context, AlarmService.class);
        context.startService(serviceIntent);
    }
}
