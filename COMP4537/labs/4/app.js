const { pbkdf2 } = require('crypto');
const http = require('http');
let url = require('url');
const words = require("./definitions/words");

let counter = 0;
let dictionary = [{word: "word", definition: "this is a great word"}, {word: "hello", definition: "hi there"}];

/**
 * [
 *     {word, definition}, {word, definition}
 * ]
 */

const server = http.createServer((req, res) => {
    // display how many requests have been made
    counter++;
    let wordq = q.query["word"];
    let definitionq = q.query["definition"];

    let postUrl = "/api/definitions/?word=" + wordq + "&definition=" + definitionq;

    let q = url.parse(req.url, true);
    if(req.url === "/api/definitions")
    {
        res.writeHead(200, {
            'Content-type' : 'text/html',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(counter + " requests have been made.");
    }
    else if (req.method === 'GET' && req.url === "/api/definitions") {
        let word = q.query["word"];

        let obj = dictionary.find(o => o.word === word);
        console.log(obj);
        if (obj != undefined) {
            res.writeHead(200, {
                'Content-type' : 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            // get from storage and display here
            res.end(JSON.stringify(obj));
            console.log("found " + obj.word + ":" + obj.definition);
        }
        else
        {
            res.writeHead(404, {
                'Content-type' : 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            let message = "Request # " + counter + ", word: '" + word + "' could not be found";
            res.end(JSON.stringify({error: message}));
        }
        
        
    }
    else if (req.method === 'POST' && req.url === postUrl) {

        if (wordq != undefined || definitionq != undefined) {
            res.writeHead(201, {
                'Content-type' : 'application/json',
                'Access-Control-Allow-Origin': '*'
            });

            let post = {
                word: wordq,
                definition: definitionq
            };

            dictionary.push(post);
            res.end(JSON.stringify(post));
            console.log("you added " + post.word +  " : " + post.definition);
        }
        else
        {
            res.writeHead(404, {
                'Content-type' : 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            res.end(JSON.stringify({error: "Undefined"}));
        }
    }
    else {
        res.writeHead(404, {
            'Content-type' : 'application/json',
            'Access-Control-Allow-Origin': '*'
        });

        res.end(JSON.stringify({message: "Route not found" + " posturl" + postUrl}));
    }
});

server.listen(9000, () => console.log('server running on port 9000'));