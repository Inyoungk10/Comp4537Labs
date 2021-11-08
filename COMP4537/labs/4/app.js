const http = require('http');
let url = require('url');

let counter = 0;
let dictionary = [];

/**
 * dictionary format
 * [
 *     {word, definition}, {word, definition}
 * ]
 */

const server = http.createServer((req, res) => {
    // display how many requests have been made
    counter++;
    let q = url.parse(req.url, true);

    let wordq = q.query["word"];
    let definitionq = q.query["definition"];

    let getUrl = "/api/definitions/?word=" + wordq;
    
    if(req.url === "/api/definitions")
    {
        res.writeHead(200, {
            'Content-type' : 'text/html',
            'Access-Control-Allow-Origin': '*'
        });
        res.end(counter + " requests have been made.");
    }
    else if (req.method === 'GET' && req.url === getUrl) {
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
    else if (req.method === 'POST') {

        if (wordq != undefined || definitionq != undefined) {
            res.writeHead(201, {
                'Content-type' : 'application/json',
                'Access-Control-Allow-Origin': '*'
            });
            
            let post = {
                word: wordq,
                definition: definitionq
            };
            //success message
            let message = "Request #" + counter + "\nNew Entry Recorded:\n" + post.word + " : " + post.definition;
            
            dictionary.push(post);
            res.end(JSON.stringify({posted:post, success: message}));
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

        res.end(JSON.stringify({message: "Route not found"}));
    }
});

server.listen(9000, () => console.log('server running on port 9000'));