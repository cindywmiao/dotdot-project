from flask import Flask, jsonify, render_template, request

from faker import Factory
from models import User, Item
import math
import sqlite3
import os
from flask_bootstrap import Bootstrap
import utils as utils

#self.user.longitude(), self.user.latitude
index_counter_customers = 0
index_counter_items = 0

all_unit_categories_file = './static/all-unit-categories.txt'
reader = open(all_unit_categories_file, 'r')
lines = list()
for line in reader:
    lines.append(line)

app = Flask(__name__)
Bootstrap(app)


def delete_db(filename):
    if os.path.exists(filename):
        os.remove(filename)

def init_db():
    sql = 'create table users (id INT, name TEXT, address TEXT, longitude FLOAT, latitude FLOAT)'
    conn = sqlite3.connect("test.db")
    cursor = conn.cursor()
    cursor.execute(sql)
    conn.commit()
    cursor.close()
    conn.close()

    sql = 'create table items (id INT, unit TEXT, category TEXT)'
    conn = sqlite3.connect("test.db")
    cursor = conn.cursor()
    cursor.execute(sql)
    conn.commit()
    cursor.close()
    conn.close()


@app.route('/_add_numbers')
def add_numbers():
    """Add two numbers server side, ridiculous but well..."""
    global index_counter_customers
    customer = User(index_counter_customers)
    customer.save()
    index_counter_customers += 1

    longitude = customer.user.longitude()
    latitude = customer.user.latitude()
    result = utils.coordinate2pixel(longitude, latitude)

    global index_counter_items
    global lines
    item = Item(index_counter_items, lines)
    item.save()
    index_counter_items += 1

    return jsonify(x=result['x'], y=result['y'], name = customer.user.name(), city = customer.user.city(),
                   unit = item.unit, category = item.category)


@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    delete_db('test.db')
    init_db()



    app.run()
