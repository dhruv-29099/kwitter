//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyCfZCVzL5J1PAEUT51MJzHqyvYcrrFenQ4",
      authDomain: "kwitter-db5ba.firebaseapp.com",
      databaseURL: "https://kwitter-db5ba-default-rtdb.firebaseio.com",
      projectId: "kwitter-db5ba",
      storageBucket: "kwitter-db5ba.appspot.com",
      messagingSenderId: "488752288404",
      appId: "1:488752288404:web:49a3d74f83d6a5ffebda81"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    user_name =localStorage.getItem("user_name");
    room_name =localStorage.getItem("room_name");

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
names = message_data['name']
message = message_data['message']
like = message_data['like']
name_with_tag = "<h4> "+ names +"<img class='user_tick' src='tick.png'></h4>";
message_with_tag ="'<h4 class='message_h4'>" + message +"</h4>";
Like_button ="<button class='btn btn-warning' id=" +firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
span_with_tag ="<span class='glyphicon glyphicon-thumb-up'>Like: "+ like +"</span> </button> <hr>"


row= name_with_tag + message_with_tag +Like_button + span_with_tag;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();

function send(){
msg = document.getElementById("msg").value;
firebase.database().ref(room_name).push({
name:user_name,
message:msg,
like:0
});

document.getElementById("msg").value ="";
}
function updateLike(message_id){
console.log("clicked on the liked button - " + message_id);
button_id = message_id;
likes = document.getElementById(button_id).value;
update_likes = Number(likes) + 1;
console.log(update_likes);

firebase.database().ref(room_name).child(message_id).update({
like : update_likes
});

}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location ="index.html"
      }