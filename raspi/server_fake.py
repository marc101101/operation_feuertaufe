from flask import Flask
from flask_restful import Resource, Api
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

api = Api(app)


class GetDataFromDB(Resource):
    def get(self):
        data = [{
            "timestamp": 1590434411,
            "dht_humidity": 25.7,
            "dht_temperature": 35,
            "idu_sound": 'LOW',
            "gas_lpg": 2.123,
            "gas_co": 5.239,
            "gas_smoke": 18.125,
        },
            {
            "timestamp": 1590434412,
            "dht_humidity": 25.7,
            "dht_temperature": 35.1,
            "idu_sound": 'HIGH',
            "gas_lpg": 2.123,
            "gas_co": 5.239,
            "gas_smoke": 18.125,
        },
            {
            "timestamp": 1590434413,
            "dht_humidity": 25.7,
            "dht_temperature": 35.1,
            "idu_sound": 'HIGH',
            "gas_lpg": 2.123,
            "gas_co": 5.239,
            "gas_smoke": 18.125,
        },
            {
            "timestamp": 1590434414,
            "dht_humidity": 25.7,
            "dht_temperature": 35.1,
            "idu_sound": 'HIGH',
            "gas_lpg": 2.123,
            "gas_co": 5.239,
            "gas_smoke": 18.125,
        },
        ]

        return data


api.add_resource(GetDataFromDB, '/getdata')

if __name__ == '__main__':
    app.run(debug=True)
