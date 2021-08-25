export class AppConfig {
    public static SMS_OPTIONS = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
            intent: 'INTENT'  // send SMS with the native android SMS messaging
            // intent: '' // send SMS without open any other app
        }
    };
}
