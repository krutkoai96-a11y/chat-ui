import * as signalR from "@microsoft/signalr";

export const createConnection = (token) => {
  return new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/chatHub", {
      accessTokenFactory: () => token
    })
    .withAutomaticReconnect()
    .build();
};