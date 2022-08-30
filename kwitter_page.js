//YOUR FIREBASE LINKS
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
  room_name = localStorage.getItem("room_name");
  

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
var name=message_data['name'];
var message=message_data['message'];
var like=message_data['like'];
var name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
var message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
var like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
var span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";
var row=name_with_tag+message_with_tag+like_button+span_with_tag;
document.getElementById("output").innerHTML +=row;

//End code
      } });  }); }
getData();
function updateLike(message_id){
  console.log("click on like button: "+message_id);
  button_id=message_id;
  likes=document.getElementById(button_id).value;
  var updated_likes=Number(likes)+1;
  console.log(updated_likes);
  firebase.database().ref(room_name).child(message_id).update({
    like:updated_likes
  });
}


function send(){
  var msg=document.getElementById("msg").value;
  firebase.database().ref(room_name).push({
      name:user_name,
      message:msg,
      like:0
  });
  document.getElementById("msg").value="";    
}

function logout(){
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}
