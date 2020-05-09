// Status of the broadcaster
var live = false;

// Streaming status checker
function checkStatus (){
	var xhr = new XMLHttpRequest();
	
	// Obtaining our response
	xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let response = JSON.parse(this.responseText);
			
			// If there isn't any live
			if(response['stream'] == null){
				if(live){ // Change if it was true before
					live = false;
					browser.browserAction.setIcon({
						path: {
						  32: "icons/logo-32-offline.png"
						}
					});
				}
			}else{ // If there is 
				if(!live){ // Change if it was false before
					live = true;
					browser.browserAction.setIcon({
						path: {
						  32: "icons/logo-32-live.png"
						}
					});
					
					// Notify the user
					browser.notifications.create({
						"type": "basic",
						"iconUrl": browser.extension.getURL("icons/logo-96.png"),
						"title": "Apoph'ISEN est en LIVE sur " + response['stream']['channel']['game'],
						"message": response['stream']['channel']['status'] + "\n\nOn a besoin de ton soutien, rejoins-nous !",
					});
				}
			}
       }
    };
	
	xhr.open('GET', 'https://api.twitch.tv/kraken/streams/apophisen', true);
	xhr.setRequestHeader('Client-ID', 'mbugqztlt39gcpnzvx6u39iotto5zm');
	xhr.send();
}

// Every 10 minutes we are checking the status
browser.alarms.onAlarm.addListener((alarm) => {
	checkStatus();
});

browser.alarms.create({periodInMinutes : 10});

// We launch a check at start
checkStatus();