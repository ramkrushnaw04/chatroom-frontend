// // src/socket.js
import { io } from 'socket.io-client';



class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      // this.socket = io('http://192.168.85.179:3000'); 
      this.socket = io(import.meta.env.VITE_SERVER_LINK); 
      console.log(import.meta.env.VITE_SERVER_LINK)
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }
}

export const socketService = new SocketService();

