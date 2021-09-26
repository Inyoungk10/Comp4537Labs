const msg_notSupported = "Sorry web Storage is not supported!";

// reading and updating time every 2 seconds
if (typeof (Storage) == "undefined") {
    document.write(msg_notSupported);
    window.stop();
}

let count = 0;

// storing and updating time every 2 seconds
window.setInterval(function() {

    // displaying time it is updated
    let time = new Date();
    document.getElementById("timeW").innerHTML = "stored at: " + time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});

    let textArray = [];

    for (i = 0; i < count; i++) {
        let textBox = document.getElementById("text" + i);
        if (textBox == null) {
            continue;
        }
        console.log(textBox.value);
        let text = textBox.value;
        textArray.push(text);
        //console.log("text being pushed: " + text);
        localStorage.setItem("array", textArray);
    };
    
}, 2000);

function txtbox(id, type, bgcolor, textcolor, parentDiv) {
    this.tb = document.createElement("input");
    this.tb.id = "text" + id;
    this.type = type;
    this.tb.style.background = bgcolor;
    this.tb.style.color = textcolor;
    parentDiv.appendChild(this.tb);
}

function rButton(bgcolor, txtcolor, id, parentDiv) {
    this.btn = document.createElement("button");
    this.btn.innerHTML = "remove";
    this.btn.style.backgroundColor = bgcolor;
    this.btn.style.color = txtcolor;
    this.btn.id = "btn" + id;
    this.btn.onclick = function () {
        document.getElementById("text" + id).remove();
        document.getElementById("btn" + id).remove();
    };
    parentDiv.appendChild(this.btn);
}

document.getElementById("add").onclick = function() {
    let notesDiv = document.getElementById("notes");

    let div = document.createElement("div");
    let textbox = new txtbox(count, "text", "blue", "white", div);
    let removeButton = new rButton("orange", "white", count, div);

    notesDiv.appendChild(div);
    console.log("yay!" + count);
    count++;
    
};