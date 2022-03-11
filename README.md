# APS - 5° Semestre

## Chat em tempo real através de conexões de rede (TCP)

O objetivo da APS do 5° semestre é fazer uma aplicação para envio de mensagens em tempo real utilizando os conceitos de protocolos de rede.

### Arquitetura

```mermaid
sequenceDiagram
    participant Client
    participant Server
    participant Clients

    Client ->> Server: Connection
    Server ->> Clients: Broadcast a connection event
    Client ->> Server: Sends a message
    Server ->> Clients: Broadcasts a message to connected clients
```

### Exemplo de aplicação

Chat em tempo real utilizando o módulo `net` do Javascript.

```mermaid
graph
    Client -- Connects to --> Server
    Server -- Broadcasts a connection --> Clients
    Client -- Sends a message --> Server
    Server -- Broadcasts the message to the --> Clients
```
