const msg_notSupported = "Sorry web Storage is not supported!";
let textArray = [];

// reading and updating time every 2 seconds
if (typeof (Storage) == "undefined") {
    document.write(msg_notSupported);
    window.stop();
}

window.setInterval(function() {

    let div = document.getElementById("notesReader");
    div.innerHTML = "";
        
    // displaying time it is updated
    let time = new Date();
    document.getElementById("timeR").innerHTML = "updated at: " + time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});

    textArray = localStorage.getItem("array");
    let split = textArray.split(",");

    console.log(textArray);

    // reading
    for (j = 0; j < split.length; j++) {
        

        // create p tag
        let ptag= document.createElement("p");
        ptag.innerHTML = split[j];
        // append p tag to div
        
        div.appendChild(ptag);
    }

}, 2000);