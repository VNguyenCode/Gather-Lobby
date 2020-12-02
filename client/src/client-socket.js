export let ws = new WebSocket(`ws://localhost:3000`);

export const initSocket = () => {
  ws = new WebSocket(`ws://localhost:3000`);
};

export const sendMessage = (m) => {
  ws.send(JSON.stringify(m));
};

ws.onopen = (e) => {
  console.log("open socket");
};
