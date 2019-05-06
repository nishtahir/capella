# Capella 

House plant monitoring to keep our greens happy.

## Hardware

This project is built around the following hardware

* Wemos D1 mini
* FC-28 Soil moisture sensor

For network connectivity, you need to update the `platformio.ini` build flags with your network credentials,
host name running the server, path and plant name.

```
build_flags = 
    -DSSID_NAME=\"your ssid\"
    -DSSID_PASSWORD=\"your password\"
    -DHOST=\"your hostname\"
    -DPATH=\"your measurements path\"
    -DPLANT_NAME=\"your plant name\"
```

This will need to be updated and generated per plant such that they have unique ids.


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