const msg_notSupported = "Sorry web Storage is not supported!";

let textArray = [];
localStorage.clear();

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

    if (textArray != null) {
        let split = textArray.split(",");

        for (j = 0; j < split.length; j++) {
            let n = new note(split[j], div);
        }
    }
    console.log(textArray);

}, 2000);

function note(text, parentDiv) {
    this.note = document.createElement("p");
    this.note.innerHTML = text;
    parentDiv.appendChild(this.note);
}