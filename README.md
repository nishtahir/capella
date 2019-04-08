# Capella 

House plant monitoring to keep our greens happy.

## Hardware

* Wemos D1 mini
* FC-28 Soil moisture sensor

## Server

To start the server in Production mode,

```
npm start
```

To start the server in Development mode, it should suffice to start the main script.

```
node index.js
```

The server can be built as a single docker container

```
docker build -t capella/server .
```

To start the server

```
docker run -p 3000:3000 -d capella/server
```