var xhr = new XMLHttpRequest();
	
xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(this.responseText);
	
		if(response['stream'] != null){
			let status = document.getElementById("status");
			let statusBullet = document.getElementById("statusBullet");
			let statusGame = document.getElementById("statusGame");
			
			status.innerText = " En Live";
			status.style.color = "#33DD33";
			
			statusBullet.setAttribute("src", "bullet_green.png");
			
			statusGame.innerText = response['stream']['channel']['game'];
			statusGame.style.color = "#33DD33";
			
			// Brodcasting Info div changes
			let body = document.getElementsByTagName("body")[0];
			let broadcastInfoDiv = document.getElementById("broadcastInfoDiv");
			let broadcastTitle = document.getElementById("broadcastTitle");
			let broadcastThumbnail = document.getElementById("broadcastThumbnail");
		
			body.style.height = "380";
			broadcastInfoDiv.style.display = "block";
			
			broadcastTitle.innerText = response['stream']['channel']['status'];
			broadcastThumbnail.setAttribute("src",response['stream']['channel']['status']);
		}		
	}
}

xhr.open('GET', 'https://api.twitch.tv/kraken/streams/apophisen', true);
xhr.setRequestHeader('Client-ID', 'mbugqztlt39gcpnzvx6u39iotto5zm');
xhr.send();