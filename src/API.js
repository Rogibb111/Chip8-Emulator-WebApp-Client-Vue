let socket = null;

export async function getGames() {
    const response = await fetch('http://localhost:8080/games');

    return response.json();
}

export async function startGame(fileName, frequency) {
    const response = await fetch('http://localhost:8080/start', {
        method: 'POST',
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

    return response.json();
}

export function startSocket(frameCallback, soundCallback, id) {
    const socket = new WebSocket('ws://localhost:8080');
    socket.addEventListener('open', () => {
       socket.send(JSON.stringify({ id, type: 'init' }));
    });
    socket.addEventListener('message', (jsonData) => {
        const data = JSON.parse(jsonData);
        if (data.type === 'frame') {
            frameCallback(data);
        } else if (data.type === 'sound') {
            soundCallback(data);
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

export function stopSocket() {
    socket.close();
    socket = null;
}