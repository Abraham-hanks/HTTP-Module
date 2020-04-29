const http = require("http");
//using https
const https = require("https");
const url = require("url");
const service = require("./services/service");
// const textBody = require("body");
// const formBody = require("body/form");
// const anyBody = require("body/any");
const jsonBody = require("body/json");
const fs = require("fs");
const formidable = require("formidable");


const server = http.createServer();
//using https
// const server = https.createServer({
//     key: fs.readFileSync("*File containing SSL key*"),
//     cert: fs.readFileSync("*File containing SSL certificate*")
// });
// server.listen(443);


server.on("request", (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    console.log("this is an incoming request");
    // console.log(parsedUrl);
    // console.log(req.method, req.url);
    // console.log(req.headers);
    // console.log(req.body);
    // console.log(http.STATUS_CODES[404]); //constants in http
    if (req.method === "GET" && parsedUrl.pathname === "/metadata"){
        const { id } = parsedUrl.query;
        const metadata = service.fetchImageMetaData(id);
        res.setHeader("Content-Type", "JSON");
        res.statusCode = 200;
        const serializedJSON = JSON.stringify(metadata);
        res.write(serializedJSON);
        res.end();
    }
    else if (req.method === "POST" && parsedUrl.pathname === "/users"){
        jsonBody(req, res, (err, body)=> {
            if (err){
                console.log(err);
            }
            else{
                console.log(body);
                const name = body["name"];
                service.createNewUser(name);
            }

        });
    }
    else if ( req.method === "POST" && parsedUrl.pathname === "/upload"){
        const form = new formidable.IncomingForm({
            uploadDir: __dirname,
            keepExtensions: true,
            multiples: true,
            maxFileSize: 5 * 1024 * 1024,
            encoding: "utf-8",
            maxFields: 20

        });
        //---using a calllback
        // form.parse(req, (err, fields, files)=>{
        //     if(err){
        //         console.log(err);
        //         res.end("Upload Error");
        //     }
        //     else{
        //         console.log("fields:");
        //     console.log(fields);
        //     console.log("\n files:");
        //     console.log(files);
        //     res.statusCode = 200;
        //     res.end("Upload Successful!");
        //     }
        // });

        //---using an event emitter
        form.parse(req).on("fileBegin", (name, file)=>{
            console.log("Upload has started")
        })
        .on("file", (name, file)=>{
            console.log("Field + file pair has been received");
            console.log(name);
        })
        .on("field", (name, value)=>{
            console.log("Field received");
            console.log(name, value);
        })
        .on("progress", (bytesReceived, bytesExpected)=>{
            console.log(bytesReceived + '/' + bytesExpected);
        })
        .on("error", (err)=>{
            console.error(err);
            req.resume();
        })
        .on("aborted", ()=>{
            console.log("Request aborted by user");
        })
        .on("end", ()=>{
            console.log("Done-- Request fully received");
            res.end("Upload Successful");
        })
    }
    else{
        // // res.statusCode = 404;
        // res.setHeader("X-powered-by", "Node");
        // res.writeHead(404, {"Content-Type": "application/json"})
        // res.end("ERROR 404")
        fs.createReadStream("./view/index.html").pipe(res);
    }
});

// const body = [];
// server.on("data", (chunk) =>{
//     console.log("This is a chunk \n");
//     console.log(chunk);
//     console.log(chunk.toString());
//     body.push(chunk);
// }).on("end", () =>{
//     const parsedJSON = JSON.parse(Buffer.concat(body));
//     const userName = parsedJSON[0]["userName"];
// });
server.listen(3000);