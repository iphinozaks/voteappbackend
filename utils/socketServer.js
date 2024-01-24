import {Server} from 'socket.io';

export const io = new Server({
    cors: {
        origin: "http://localhost:3000"
    }
});

export var Socket = {
    emit: function (event, data) {
        io.sockets.emit(event, data);
    }
};
