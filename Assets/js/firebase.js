var app_firebase = {};
(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyC52LIjBVOOgbzWysF8zDr7ULDFoIVDIqE",
        authDomain: "eng-admission-english.firebaseapp.com",
        projectId: "eng-admission-english",
        storageBucket: "eng-admission-english.appspot.com",
        messagingSenderId: "132305563703",
        appId: "1:132305563703:web:987490dd85b80a170fcfb2",
        measurementId: "G-PKYPVN40CG"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    app_firebase = firebase;
    firebase.analytics();
})()