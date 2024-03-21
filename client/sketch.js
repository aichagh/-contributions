// connect to socket server, default is window.location.host
const socket = io();

function setup() {
    createCanvas(400, 400);

    socket.on("mouse", (data) => {
        console.log(` ${socket.id} mouse`, data);
        // broadcast to other clients
        socket.broadcast.emit("mouse", data); 
      });
}

function mouseDragged() {
    // send mouse data to server
    let data = { x: mouseX, y: mouseY }
    socket.emit('mouse', data)
}
  