package com.practice;

import android.content.Intent;
import androidx.annotation.Nullable;
import com.facebook.react.HeadlessJsTaskService;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.jstasks.HeadlessJsTaskConfig;

public class AlarmService extends HeadlessJsTaskService {
    @Override
    protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
        if (intent == null) {
            return null;
        }

        WritableMap data = Arguments.createMap();
        String message = intent.getStringExtra("message");
        if (message == null) {
            message = "Default alarm triggered!";
        }
        data.putString("message", message);

        return new HeadlessJsTaskConfig(
                "AlarmTask", // JS task name (should match your BackgroundTask.register)
                data,        // ✅ must not be null
                5000,        // timeout
                true         // run even if app is killed
        );
    }
}
