##

1. Create a SHA-1 Signature
 
 ## keytool -exportcert -keystore <<keystore file location>> -list -v
 ## <<keystore file location>> is path of project -> android -> app -> debug.keystore

Note-you need to be very careful when you do this step  

 2. Create Firebase Project in firebase console
  ## https://firebase.google.com/

 3. Create and attach new app to the project with SHA-1 key mandatory

 4. Enable Google Login in Firebase
    ## Authentication → Sign-In Method → Google

5. Install the package for Google Login
  ## npm install or yarn add @react-native-community/google-signin
  ## pod install


### FOR ANDROID ###

1. Add google-services.json
 ## project -> android -> app
 
2. Update project -> android according to
 ## https://github.com/react-native-google-signin/google-signin/blob/master/docs/android-guide.md


 ### HURRAY ANDROID IS DONE 😆 ###



### FOR IOS ###

1. Add GoogleServices-info.plist
 ## in xCode

2. Update the project -> ios -> projetc.xcworkspace accroding to
 ## https://github.com/react-native-google-signin/google-signin/blob/master/docs/ios-guide.md#3-xcode-configuration

 ### HURRAY IOS IS DONE TOO 😆 ###
