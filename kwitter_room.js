var firebaseConfig = {
    apiKey: "AIzaSyBdAjQRVLDOqslKfK8eFbSZexQ2RRXczfs",
    authDomain: "new-kwitter-app.firebaseapp.com",
    databaseURL: "https://new-kwitter-app-default-rtdb.firebaseio.com",
    projectId: "new-kwitter-app",
    storageBucket: "new-kwitter-app.appspot.com",
    messagingSenderId: "848529006758",
    appId: "1:848529006758:web:823f65dee8fff0fee21467",
    measurementId: "G-YPZ9SNYE4X"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);


user_name = localStorage.getItem("user_name");


 document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

 function addRoom() {
     room_name = document.getElementById("room_name").value;

     firebase.database().ref("/").child(room_name).update({
         purpose: "adding room name"
     });

     localStorage.setItem("room_name", room_name);

     window.location = "kwitter_page.html";
 }

 function getData() {
     firebase.database().ref("/").on('value', function (snapshot) {
         document.getElementById("output").innerHTML = "";
         snapshot.forEach(function (childSnapshot) {
             childKey = childSnapshot.key;
             Room_names = childKey;
             console.log("Room Name - " + Room_names);
             row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' >#" + Room_names + "</div><hr>";
             document.getElementById("output").innerHTML += row;
         });
     });

 }

 getData();

 function logout(){
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location="index.html";
 }

 function redirectToRoomName(name){
    console.log(name);
    localStorage.setItem("room_name",name);
    window.location="kwitter_page.html";
 }
