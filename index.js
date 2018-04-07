var sourceQuery = require('sourcequery')
const express = require('express')
const app = express()
var sq = new sourceQuery(10000); // 1000ms timeout 

async function query(ip, port) {
    return new Promise(function (resolve, reject) {
        sq.open('208.103.169.23', 27015);
        sq.getInfo(function (err, info) {
            if (err) reject(err);
            resolve(info);
        });
    })

}


app.get('/', (req, res) => res.send('Usage: HOSTNAME.COM/IP/PORT'))

app.get('/*:*', async (req, res) => {
    var ipPort = req.url.split(":"); // Split into array [ip, port]
    ipPort[0] = ipPort[0].replace('/', ''); // Remove strating /
    var data = await query(ipPort[0], ipPort[1])
    res.json(data);
})

app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${process.env.PORT || 3000}`))