package com.practice

import android.os.Bundle
import com.facebook.react.ReactActivity

class MainActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        // Prevent fragment restore crash (React Native Screens)
        super.onCreate(null)
    }

    override fun getMainComponentName(): String {
        return "practice" // 👈 your app name here
    }
}
