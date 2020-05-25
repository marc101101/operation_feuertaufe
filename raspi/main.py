# IMPORT: LIBS
import Adafruit_DHT
import sys
import time
import RPi.GPIO as GPIO
import mysql.connector

from datetime import date, datetime
from mysql.connector import errorcode
from mq import *

# INIT: PIN SETS
DHT_SENSOR = Adafruit_DHT.DHT22
DHT_PIN = 4
MQ_PIN = 0
IDU_PIN = 3

# INIT: DATA VALS
humidity = 0.0
temperature = 0.0
sound = "LOW"
gas_lpg = 0.0
gas_co = 0.0
gas_smoke = 0.0

# READ SENSOR: DHT22-AM2302
try:
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
except Exception as e:
    print("ERROR (DHT22-AM2302): " + e)

# READ SENSOR: Iduino-1485297
try:
    state_store = []
    GPIO.setup(IDU_PIN, GPIO.IN)

    while True:
        if (len(state_store) == 100):
            exit
        state = GPIO.input(IDU_PIN)
        state_store.append(state)

    if (True in state_store):
        sound = "HIGH"
    else:
        sound = "LOW"

except Exception as e:
    print("ERROR (Iduino-1485297): " + e)

# READ SENSOR: MQ-2
try:
    mq = MQ()
    perc = mq.MQPercentage()
    gas_lpg = perc["GAS_LPG"]
    gas_co = perc["CO"]
    gas_smoke = perc["SMOKE"]
except Exception as e:
    print("ERROR (MQ-2): " + e)

# STORE: MYSQL DATABASE
try:
    cnx = mysql.connector.connect(user='scott', database='employees')
    cursor = cnx.cursor()

    add_new_dataset = ("INSERT INTO collectiondata "
                       "(timestamp, humidity, temperature, sound, gas_lpg, gas_co, gas_smoke) "
                       "VALUES (%s, %s, %s, %s, %s, %s, %s)")

    # Insert salary information
    data_set = {
        "timestamp": datetime.now(),
        "humidity": humidity,
        "temperature": temperature,
        "sound": sound,
        "gas_lpg": gas_lpg,
        "gas_co": gas_co,
        "gas_smoke": gas_smoke
    }

    cursor.execute(add_new_dataset, data_set)
    cnx.commit()

    cursor.close()
except mysql.connector.Error as e:
    if e.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
    elif e.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
    else:
        print(e)
else:
    cnx.close()
