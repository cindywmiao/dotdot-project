from flask import Flask, jsonify, render_template, request

from faker import Factory
from models import User
import math
import sqlite3
import os
from flask_bootstrap import Bootstrap
import utils as utils

#self.user.longitude(), self.user.latitude
index_counter = 0

app = Flask(__name__)
Bootstrap(app)

def delete_db(filename):
    if os.path.exists(filename):
        os.remove(filename)

def init_db():
    sql = 'create table user (id INT, name TEXT, address TEXT, longitude FLOAT, latitude FLOAT)'
    conn = sqlite3.connect("test.db")
    cursor = conn.cursor()
    cursor.execute(sql)
    conn.commit()
    cursor.close()
    conn.close()


@app.route('/_add_numbers')
def add_numbers():
    """Add two numbers server side, ridiculous but well..."""
    global index_counter
    customer = User(index_counter)
    customer.save()

    index_counter += 1

    longitude = customer.user.longitude()
    latitude = customer.user.latitude()

    result = utils.coordinate2pixel(longitude, latitude)

    return jsonify(x=result['x'], y=result['y'])


@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    delete_db('test.db')
    init_db()
    app.run()
