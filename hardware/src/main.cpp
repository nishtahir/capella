#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "ArduinoJson.h"

const int ANALOG_SENSOR = A0;
const int MOISTURE_MIN = 1024;
const int MOISTURE_MAX = 300;
const int PERCENT_MIN = 0;
const int PERCENT_MAX = 100;

const int PORT = 443;

const int SLEEP_SECONDS = 1800;

void startSerial()
{
    Serial.begin(9600);
    delay(100);
    Serial.println("Starting Serial...");
    Serial.println();
    Serial.println();
}

void startWifi()
{
    Serial.print("Connecting to SSID: ");
    Serial.println(SSID_NAME);

    WiFi.mode(WIFI_STA);
    WiFi.begin(SSID_NAME, SSID_PASSWORD);

    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    Serial.println();
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void setup()
{
    pinMode(D0, WAKEUP_PULLUP);

    startSerial();
    startWifi();
}

int readMoistureLevel()
{
    int rawValue = analogRead(ANALOG_SENSOR);
    int friendlyValue = map(
        rawValue,
        MOISTURE_MIN,
        MOISTURE_MAX,
        PERCENT_MIN,
        PERCENT_MAX);

    return friendlyValue;
}

void loop()
{
    float moistureLevel = readMoistureLevel();

    StaticJsonDocument<200> object;
    object["name"] = PLANT_NAME;
    object["moisture"] = moistureLevel;

    String buffer;
    serializeJson(object, buffer);

    if (WiFi.status() == WL_CONNECTED)
    {

        BearSSL::WiFiClientSecure client;
        client.setInsecure();

        HTTPClient https;

        if (https.begin(client, HOST, PORT, PATH)) {
            https.addHeader("Content-Type", "application/json");

            Serial.println(String("POST: ") + PATH);
            Serial.println(buffer);

            int httpCode = https.POST(buffer);
            String payload = https.getString();

            Serial.println(httpCode);
            Serial.println(payload);

            https.end();
        } else {
            Serial.println("Failed to connect to host.");
        }
    }
    else
    {
        Serial.println("Error in WiFi connection");
    }

    ESP.deepSleep(SLEEP_SECONDS * 1000000);
}