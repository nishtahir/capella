#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include "ArduinoJson.h"

int ANALOG_SENSOR = A0;
int MOISTURE_MIN = 1024;
int MOISTURE_MAX = 300;
int PERCENT_MIN = 0;
int PERCENT_MAX = 100;

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
    Serial.println(buffer);

    if (WiFi.status() == WL_CONNECTED)
    {

        HTTPClient http;

        http.begin(PATH);
        http.addHeader("Content-Type", "application/json");

        int httpCode = http.POST(buffer);
        String payload = http.getString();

        Serial.println(httpCode);
        Serial.println(payload);

        http.end();
    }
    else
    {
        Serial.println("Error in WiFi connection");
    }

    delay(60000);
}