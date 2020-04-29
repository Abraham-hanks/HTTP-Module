const http = require("http");
const axios = require("axios");
const fs = require("fs");

const data = JSON.stringify({
    name: "Damilola",
    username: "idmcalculus",
    courses: "nodejs, JS, PHP"
})

//--GET 
// const request = http.get("http://www.google.com",(res)=>{
//     console.log({'status-code': res.statusCode}),
//     console.log(res.headers);

//     res.on("data", (chunk) =>{
//         console.log("This is a chunk\n");
//         console.log(chunk.toString());
//     });
// });

//--POST
const options = {
    hostname: 'localhost',
    port: '3000',
    path: '/users',
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
        "Authorization": Buffer.from("myUsername" + ":" + "myPassword").toString("base64")
    }
}
const request = http.request(options,(res)=>{
    console.log(`statusCode: ${res.statusCode}`),
    console.log(res.headers);
    res.on("data", (chunk) =>{
        console.log("This is a chunk\n");
        console.log(chunk.toString());
    });
});
request.write(data);

//--AXIOS PACKAGE GET
// axios({
//     method: "GET",
//     url:"http://www.google.com", 
//     responseType: "stream"
// })
// .then(
//     (res)=>{
//         res.data.pipe(fs.createWriteStream("google.html"));
//     }
// )
// .catch(
//     (err)=>{
//         console.log(err);
//     }
// )

// axios.all([
//     axios.get("http://localhost:3000/metadata?id=1"),
//     axios.get("http://localhost:3000/metadata?id=1")
// ])
// .then(
//     (res)=>{
//         console.log(res[0].data.description);
//         console.log(res[1].data.description);
//     }
// )

//--AXIOS PACKAGE POST
// axios({
//     method: "POST",
//     url:"http://localhost:3000/users", 
//     data: {name: "Johhny Storm"},
//     transformRequest: (data, headers)=>{
//         const newData = {
//             name: data.name + "!"
//         };
//         return JSON.stringify(newData);
//     },
//     // transformResponse: (data)=>{}
// })
// .then(
//     (res)=>{
//         res.data.pipe(fs.createWriteStream("google.html"));
//     }
// )
// .catch(
//     (err)=>{
//         console.log(err);
//     }
// )

// const request = http.request({hostname: "www.google.com"},(res)=>{
//     console.log({'status-code': res.statusCode}),
//     console.log(res.headers);
//     const body =[];

//     res.on("data", (chunk) =>{
//         console.log("This is a chunk\n");
//         console.log(chunk.toString());
//     });
// });

request.on("error",(err)=>{
    console.error(err);
});


request.end();
