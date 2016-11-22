cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-bluetooth-serial.bluetoothSerial",
        "file": "plugins/cordova-plugin-bluetooth-serial/www/bluetoothSerial.js",
        "pluginId": "cordova-plugin-bluetooth-serial",
        "clobbers": [
            "window.bluetoothSerial"
        ]
    },
    {
        "id": "cordova-plugin-nativeaudio.nativeaudio",
        "file": "plugins/cordova-plugin-nativeaudio/www/nativeaudio.js",
        "pluginId": "cordova-plugin-nativeaudio",
        "clobbers": [
            "window.plugins.NativeAudio"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-bluetooth-serial": "0.4.6",
    "cordova-plugin-nativeaudio": "3.0.6"
};
// BOTTOM OF METADATA
});