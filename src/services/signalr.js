import * as signalR from "@microsoft/signalr";

export const createConnection = (token) => {
  return new signalR.HubConnectionBuilder()
    .withUrl("https://antonkrutko.azurewebsites.net/chatHub", {
      accessTokenFactory: () => token
    })
    .withAutomaticReconnect()
    .build();
};