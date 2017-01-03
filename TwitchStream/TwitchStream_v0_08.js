//https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js
//https://use.fontawesome.com/693350c330.js


var userArray = [["aceuser","tangentgaming"],["baceuser","esl_sc2"],["caceuser","freecodecamp"],["daceuser","schviftyfive"],["eaceuser","comstar404"],["faceuser","r3tr0v3r5e"],["gaceuser","drdisrespectlive"]];

//Replace the Twitch API base URL https://api.twitch.tv/kraken 
//with https://wind-bow.gomix.me/twitch-api
var basepassthroughURL = "https://wind-bow.gomix.me/twitch-api",
    users = "/users/",
    channels = "/channels/",
    streams = "/streams/";

function master(user, place) {
  var APIstream = basepassthroughURL + streams + user,
      APIURL = basepassthroughURL + users + user,
      base = "col-sm-3 streamer magic",
      onzloco = place + "onzoffz",
      gamezloco = place + "Gamo",
      statusloco = place + "Stato",
      logoloco = place + "Logo",
      bioloco = place + "Bio";
  
      $.getJSON(APIURL, function(nonCurrent){
        if (nonCurrent.status === 404) {
          document.getElementById(onzloco).className = base + " isUnknown";
          document.getElementById(bioloco).innerHTML = "USER NOT FOUND";
          document.getElementById(statusloco).innerHTML = "UNKOWN STATUS";
          document.getElementById(gamezloco).innerHTML = "UNKOWN STATUS"
          document.getElementById(logoloco).src = "http://i1255.photobucket.com/albums/hh626/patenakev/Web%20Temp/redEx_zpsiup6nacu.png"; //img src= replace
        } else {
            document.getElementById(bioloco).innerHTML = "BIO: " + nonCurrent.bio;
            var iconLink = nonCurrent.logo; //icon image link
            document.getElementById(logoloco).src = iconLink; //img src= replace
            $.getJSON(APIstream, function(current){
              if (current.stream === null) {
                document.getElementById(statusloco).innerHTML = "USER OFFLINE!";
                document.getElementById(onzloco).className = base + " isOffline"; 
                document.getElementById(gamezloco).innerHTML = "NO CURRENT STREAM!"
              } else {
                document.getElementById(statusloco).innerHTML = "USER IS STREAMING!";
                document.getElementById(onzloco).className = base + " isOnline"; 
                document.getElementById(gamezloco).innerHTML = "STREAM: " + current.stream.channel.game +
                  "; INFO: " + current.stream.channel.status;
              }
            });
        }
      });
};

for(i=0; i<userArray.length; i++){
  var newlink = '<a href="https://www.twitch.tv/' + (userArray[i][1]) +'" target="_blank">' + 
      (userArray[i][1]) + '</a>';
  document.getElementById(userArray[i][0]).innerHTML = newlink + '     ' + '<i class="fa fa-twitch"></i>'; //populate username
  master(userArray[i][1], userArray[i][0]); //color online green and pull stream info:
  //getEach(userArray[i][1], userArray[i][0]); //get user info [like bio, logo, etc.]
}




          