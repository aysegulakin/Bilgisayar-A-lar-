/*
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on('connection', (ws) => {
    clients.push(ws);

    ws.on('message', (message) => {
        // Mesajı diğer istemcilere ilet
        clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
    });
});

console.log('Signaling server running on ws://localhost:8080');
*/
/*const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

console.log("Signaling server running on ws://localhost:8080");

wss.on('connection', (ws) => {
    console.log('Yeni bir istemci bağlandı.');

    ws.on('message', (message) => {
        // Gelen mesajı JSON'a çevirme
        try {
            const data = JSON.parse(message);
            console.log("Alınan mesaj:", data);
        } catch (error) {
            console.error("Mesaj JSON'a dönüştürülemedi:", error);
        }
    });

    ws.send(JSON.stringify({ message: "Bağlantı başarılı!" }));
});
*/const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
const io = socketIo(server);

// WebSocket bağlantısı kurulduğunda
io.on('connection', (socket) => {
    console.log('Yeni bir istemci bağlandı.');

    // Teklif (offer) alındığında
    socket.on('offer', (offer) => {
        console.log('Teklif alındı:', offer);
        // Teklifi tüm istemcilere gönder
        socket.broadcast.emit('offer', offer);
    });

    // Cevap (answer) alındığında
    socket.on('answer', (answer) => {
        console.log('Cevap alındı:', answer);
        // Cevabı diğer istemcilere gönder
        socket.broadcast.emit('answer', answer);
    });

    // ICE adayları alındığında
    socket.on('iceCandidate', (candidate) => {
        console.log('ICE Adayı alındı:', candidate);
        // Adayları diğer istemcilere gönder
        socket.broadcast.emit('iceCandidate', candidate);
    });
});

server.listen(8080, () => {
    console.log('Sunucu 8080 portunda çalışıyor...');
});
