Step 1 : Create App On Facebook Developers And Add Basic App Info
=========================================================================================================================
a ) Login with your facebook account and go to https://developers.facebook.com/ and create new app
On successful creation of app you will have an app id like my app id is “964336743958925” . Keep it safe . It will be used in future
=========================================================================================================================
b ) Add Basic Information
Go to your facebook app dashboard settings https://developers.facebook.com/apps/{app_id}/settings/basic/
“app_id” , change it with our facebook app id
Add “Contact Email, Privacy Policy Url, Category, App Icon, Business use” and then save

Note-Now from 2020 if you want to live the facebook app then you must enter the privacy policy url in facebook developer console.
=========================================================================================================================
c) Add Platform IOS
Go to bottom of Basic Settings and add platform IOS . You have to add Bundle identifier of your app . You can find Bundle identifier in Xcode General Tab . As my app bundle identifier is “org.reactjs.native.example.FbSdkSample”
=========================================================================================================================
D) Add Platform ANDROID
You need to check “applicationId” of your android project which you can find in “android/app/build.gradle”
=========================================================================================================================
i ) Add “Google Play Package Name” : which is applicationId of android like my app have “com.fbsdksample”
=========================================================================================================================
ii ) Class Name : which will be for my app “com.fbsdksample.MainActivity” . Please Change according to your app id
Note : If popup comes for package name verification select “Use this package name”
=========================================================================================================================
iii ) You have to Add “Key Hashes” for Debug and Release Build
Note : You do not need release hash key if you only want to test and do not want to publish app with release key store.
=========================================================================================================================
=========================================================================================================================
E ) Make Facebook App Live


=========================================================================================================================
Step 2: Add react-native-fbsdk library
=========================================================================================================================
a ) Add library
i)if you using yarn :-
yarn add react-native-fbsdk
=========================================================================================================================
ii)using npm:-
npm install react-native-fbsdk
=========================================================================================================================
iii) cd ios && pod install

Step 3 : Configuration ANDROID/IOS Projects

A ) Android Configuration
=========================================================================================================================
=========================================================================================================================

a ) Add Facebook App ID
1. Open your /app/main/res/values/strings.xml file.
2. Add a string element with the name attribute facebook_app_id and value as your Facebook App ID (Replace it with your App Id)to the file. For example
<string name="facebook_app_id">Facebook App ID</string>

=========================================================================================================================

b ) Add uses-permission
1. Open /app/manifests/AndroidManifest.xml
2. Add a uses-permission element to the manifest:
<uses-permission android:name="android.permission.INTERNET"/>

=========================================================================================================================

c ) Add a meta-data element to the application element:
1. Open /app/manifests/AndroidManifest.xml
2. Add a meta-data element to the manifest:
<application android:label="@string/app_name" ...>
    ...
    <meta-data android:name="com.facebook.sdk.ApplicationId" android:value="@string/facebook_app_id"/>
    ...
</application>

B) IOS Configuration
=========================================================================================================================
a ) Configure Info.plist
=========================================================================================================================
1.In Xcode, right-click your project’s Info.plist file and select Open As -> Source Code.
2.Insert the following XML snippet into the body of your file just before the final </dict> element.

Note-Change the appId and appName in info.plist according to your app just after the first <dict>
=========================================================================================================================
b ) Connect App Delegate
To post-process the results from actions that require you to switch to the native Facebook app or Safari, such as Facebook Login or Facebook Dialogs, you need to connect your AppDelegate class to the FBSDKApplicationDelegate object. To accomplish this, add the following code to your AppDelegate.m file.

=========================================================================================================================

Now you are ready to use service/facebook
=========================================================================================================================





