import React from "react";
import { useState } from "react";

interface wsDataType {
  currentData: string;
  roomId: string;
  isConnected?: boolean;
}

const ConnectSocket: React.FC = () => {
  const [roomData, setRoomData] = useState<wsDataType>({
    roomId: "",
    currentData: "",
    isConnected: false,
  });
  const [webSocket, setWebSocket] = useState<WebSocket>();

  const connect = () => {
    const ws = new WebSocket("ws://localhost:8080");
    setWebSocket(ws);

    ws.addEventListener("open", () => {
      ws.send(JSON.stringify(roomData));
    });

    ws.addEventListener("message", ({ data }) => {
      console.log(data);
      setRoomData(JSON.parse(data));
    });
  };

  const updateData = (newData: wsDataType) => {
    webSocket?.send(JSON.stringify(newData));
  };

  return (
    <>
      {roomData.isConnected ? (
        <div>
          <h1>Room {roomData.roomId}</h1>
          <textarea
            value={roomData.currentData}
            onChange={({ target }) =>
              updateData({ ...roomData, currentData: target.value })
            }
          ></textarea>
          <p>{roomData.currentData}</p>
        </div>
      ) : (
        <div>
          <h1>Connect to a room</h1>
          <input
            value={roomData.roomId}
            onChange={({ target }) =>
              setRoomData({ ...roomData, roomId: target.value })
            }
          />
          <button onClick={connect}>Connect!</button>
        </div>
      )}
      <pre>{JSON.stringify(roomData, null, 2)}</pre>
    </>
  );
};

export default ConnectSocket;
