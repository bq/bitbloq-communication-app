cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "com.fabiorogeriosj.sensors.sensors",
        "file": "plugins/com.fabiorogeriosj.sensors/www/sensors.js",
        "pluginId": "com.fabiorogeriosj.sensors",
        "clobbers": [
            "sensors"
        ]
    },
    {
        "id": "com.phonegap.plugins.nativesettingsopener.Settings",
        "file": "plugins/com.phonegap.plugins.nativesettingsopener/www/settings.js",
        "pluginId": "com.phonegap.plugins.nativesettingsopener",
        "clobbers": [
            "cordova.plugins.settings"
        ]
    },
    {
        "id": "cordova-plugin-bluetooth-serial.bluetoothSerial",
        "file": "plugins/cordova-plugin-bluetooth-serial/www/bluetoothSerial.js",
        "pluginId": "cordova-plugin-bluetooth-serial",
        "clobbers": [
            "window.bluetoothSerial"
        ]
    },
    {
        "id": "cordova-plugin-device.device",
        "file": "plugins/cordova-plugin-device/www/device.js",
        "pluginId": "cordova-plugin-device",
        "clobbers": [
            "device"
        ]
    },
    {
        "id": "cordova-plugin-flashlight.Flashlight",
        "file": "plugins/cordova-plugin-flashlight/www/Flashlight.js",
        "pluginId": "cordova-plugin-flashlight",
        "clobbers": [
            "window.plugins.flashlight"
        ]
    },
    {
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "id": "cordova-plugin-lightSensor.light",
        "file": "plugins/cordova-plugin-lightSensor/www/light.js",
        "pluginId": "cordova-plugin-lightSensor",
        "clobbers": [
            "cordova-plugin-lightSensor"
        ]
    },
    {
        "id": "cordova-plugin-nativeaudio.nativeaudio",
        "file": "plugins/cordova-plugin-nativeaudio/www/nativeaudio.js",
        "pluginId": "cordova-plugin-nativeaudio",
        "clobbers": [
            "window.plugins.NativeAudio"
        ]
    },
    {
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "cordova.plugins.diagnostic.api-22.Diagnostic",
        "file": "plugins/cordova.plugins.diagnostic.api-22/www/android/diagnostic.js",
        "pluginId": "cordova.plugins.diagnostic.api-22",
        "clobbers": [
            "cordova.plugins.diagnostic"
        ]
    },
    {
        "id": "ionic-plugin-keyboard.keyboard",
        "file": "plugins/ionic-plugin-keyboard/www/android/keyboard.js",
        "pluginId": "ionic-plugin-keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognition",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognition.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognition"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionError",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionError.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionError"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionAlternative",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionAlternative.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionAlternative"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionResult",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionResult.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionResult"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionResultList",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionResultList.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionResultList"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechRecognitionEvent",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechRecognitionEvent.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechRecognitionEvent"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechGrammar",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechGrammar.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechGrammar"
        ]
    },
    {
        "id": "org.apache.cordova.speech.speechrecognition.SpeechGrammarList",
        "file": "plugins/org.apache.cordova.speech.speechrecognition/www/SpeechGrammarList.js",
        "pluginId": "org.apache.cordova.speech.speechrecognition",
        "clobbers": [
            "SpeechGrammarList"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.fabiorogeriosj.sensors": "0.7.0",
    "com.phonegap.plugins.nativesettingsopener": "1.3",
    "cordova-plugin-bluetooth-serial": "0.4.6",
    "cordova-plugin-compat": "1.1.0",
    "cordova-plugin-console": "1.0.5",
    "cordova-plugin-device": "1.1.3",
    "cordova-plugin-flashlight": "3.2.0",
    "cordova-plugin-inappbrowser": "1.6.2-dev",
    "cordova-plugin-lightSensor": "0.2.1",
    "cordova-plugin-nativeaudio": "3.0.6",
    "cordova-plugin-splashscreen": "4.0.0",
    "cordova-plugin-statusbar": "2.2.0",
    "cordova-plugin-whitelist": "1.3.0",
    "cordova.plugins.diagnostic.api-22": "2.3.10-api-22",
    "ionic-plugin-keyboard": "2.2.1",
    "org.apache.cordova.speech.speechrecognition": "0.1.2"
};
// BOTTOM OF METADATA
});