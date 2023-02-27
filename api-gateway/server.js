
const gateway = require("fast-gateway");

const port = 9000;
const server = gateway({
    routes: [
        {
            prefix: "/server1",
            target: "http://localhost:9001/",
            hooks: {}
        },
        {
            prefix: "/server2",
            target: "http://localhost:9002/",
            hooks: {}
        }
    ]
});  

server.get('/mytesting', (req, res) => {
    res.send("Gateway Called");
})

server.start(port).then(server => {
    console.log("Gateway is running " + port);
})

