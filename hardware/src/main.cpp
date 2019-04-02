#include <Arduino.h>

int analogSensorPin = A0;

int dryValue = 1024;
int wetValue = 300;
int friendlyDryValue = 0;
int friendlyWetValue = 100;


int output_value;

void setup()
{

  Serial.begin(9600);

  Serial.println("Reading From the Sensor ...");

  delay(2000);
}

void loop()
{
  int rawValue = analogRead(A0);
  output_value = analogRead(analogSensorPin);

  int friendlyValue = map(rawValue, dryValue, wetValue, friendlyDryValue, friendlyWetValue);

  Serial.print("Mositure : ");

  Serial.print(friendlyValue);

  Serial.println("%");

  delay(1000);
}