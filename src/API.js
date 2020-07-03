let socket = null;

export async function getGames() {
    const response = await fetch('http://localhost:8080/games');

    return response.json();
}

export async function startGame(fileName, frequency) {
    const response = await fetch('http://localhost:8080/start', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fileName,
            frequency
        })
    });

    return response.json();
}

export async function stopGame(id) {
    const response = await fetch('http://localhost:8080/stop', {
        method: 'POST',
        body: JSON.stringify({
            id
        })
    });

    socket.close();
    socket = null;

    return response.json();
}

export function startSocket(frameCallback, soundCallback, id) {
    const socket = new WebSocket('ws://localhost:8080');
    socket.addEventListener('open', () => {
       socket.send(JSON.stringify({ id, type: 'init' }));
    });
    socket.addEventListener('message', (msg) => {
        const data = JSON.parse(msg.data);
        if (data.type === 'frame') {
            frameCallback(data.screen);
        } else if (data.type === 'sound') {
            soundCallback(data.sound);
        }
    });
}

export function updateKeyboard(keyboard, id) {
    if (socket) {
        socket.send(JSON.stringify({
            type: 'keyPress',
            keyboard,
            id,
            timeStamp: new Date()
        }));
    }
}