const msg_notSupported = "Sorry web Storage is not supported!";
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

    textArray = JSON.parse(localStorage.getItem("array"));

    if (textArray != null) {
        for (j = 0; j < textArray.length; j++) {
            let textString = textArray[j].substring(1, textArray[j].length - 1);
            let n = new note(textString, div);
        }
    }
    
}, 2000);

function note(text, parentDiv) {
    this.note = document.createElement("p");
    this.note.innerHTML = text;
    this.note.className += "textNotes"
    parentDiv.appendChild(this.note);
}