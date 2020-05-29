from flask import Flask
from flask_restful import Resource, Api
import mysql.connector

app = Flask(__name__)
api = Api(app)


class GetDataFromDB(Resource):
    def get(self):
        db_connection = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="root",
            database="sensor_collector"
        )
        my_database = db_connection.cursor()
        sql_statement = "SELECT * FROM sensor_table"
        my_database.execute(sql_statement)
        output = my_database.fetchall()

        return output


api.add_resource(GetDataFromDB, '/getdata')

if __name__ == '__main__':
    app.run(debug=True)
