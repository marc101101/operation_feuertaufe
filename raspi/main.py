# IMPORT: LIBS
import Adafruit_DHT
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
IDU_PIN = 17

# INIT: DATA VALS
humidity = 0.0
temperature = 0.0
sound = "LOW"
gas_lpg = 0.0
gas_co = 0.0
gas_smoke = 0.0

start_time = time.time()

GPIO.setmode(GPIO.BCM)

GPIO.setup(24, GPIO.OUT)
GPIO.output(24, GPIO.LOW)

GPIO.setup(22, GPIO.OUT)
GPIO.output(22, GPIO.LOW)

while True:
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
        print(perc)
        gas_lpg = perc["GAS_LPG"]
        gas_co = perc["CO"]
        gas_smoke = perc["SMOKE"]
    except Exception as e:
        print("ERROR (MQ-2): " + e)

    # STORE: MYSQL DATABASE
    delta = time.time() - start_time
    print(temperature)

    if(temperature >= 25):
        # RED
        GPIO.setup(24, GPIO.OUT)
        GPIO.output(24, GPIO.HIGH)
        GPIO.output(22, GPIO.LOW)
    else:
        # GREEN
        GPIO.setup(22, GPIO.OUT)
        GPIO.output(22, GPIO.HIGH)
        GPIO.output(24, GPIO.LOW)

    if(delta >= (60)):
        start_time = time.time()
        try:
            cnx = mysql.connector.connect(
                user='root', password='root', database='sensor_collector')
            cursor = cnx.cursor()

            add_new_dataset = ("INSERT INTO sensor_table "
                               "(timestamp, dht_humidity, dht_temperature, idu_sound, gas_lpg, gas_co, gas_smoke) "
                               "VALUES (%s, %s, %s, %s, %s, %s, %s)")

            data_set = (str(datetime.now()), humidity, temperature,
                        sound, gas_lpg, gas_co, gas_smoke)

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
