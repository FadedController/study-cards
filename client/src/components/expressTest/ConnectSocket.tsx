import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const ConnectSocket: React.FC = () => {
  const [serverMsg, setServerMsg] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [webSocket, setWebSocket] = useState<WebSocket>();

  const connect = () => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.addEventListener("open", (e) => {
      setIsConnected(true);
    });

    ws.addEventListener("message", (e) => setServerMsg(e.data));

    return ws;
  };

  useEffect(() => {
    setWebSocket(connect());
  }, []);

  const updateMsg = (newValue: string) => {
    if (webSocket) {
      webSocket.send(newValue);
      setServerMsg(newValue);
    }
  };

  return (
    <>
      <h1>Web Sockets</h1>
      {!isConnected ? (
        <p>Loading...</p>
      ) : (
        <div>
          <textarea
            value={serverMsg}
            onChange={(e) => updateMsg(e.target.value)}
          />
        </div>
      )}
      <p>{serverMsg}</p>
    </>
  );
};

export default ConnectSocket;
