from flask import Flask, jsonify, render_template, request

from faker import Factory
from models import User, Item
import math
from flask_bootstrap import Bootstrap
import utils as utils
import pandas

database_path = 'test.db'

index_counter_customers = 0
index_counter_items = 0

all_unit_categories_file = './static/all-unit-categories.txt'
reader = open(all_unit_categories_file, 'r')
lines = list()
units = list()
for line in reader:
    unit = line.split(',')[0]
    if unit not in units:
        units.append(unit)
    lines.append(line)

airports = pandas.read_csv("./static/airports.csv", header=None, dtype=str)
airports.columns = ["id", "name", "city", "country", "code", "icao", "latitude", "longitude", "altitude", "offset", "dst", "timezone"]

longitudes = list(airports["longitude"].astype(float))
latitudes = list(airports["latitude"].astype(float))

app = Flask(__name__)
Bootstrap(app)

@app.route('/_add_prob')
def add_prob():
    chart = utils.random_probablity(units)
    print(chart)
    return jsonify(top1 = chart.keys()[0], prob1 = chart.values()[0],
                   top2 = chart.keys()[1], prob2 = chart.values()[1],
                   top3 = chart.keys()[2], prob3 = chart.values()[2])

@app.route('/_add_numbers')
def add_numbers():
    """Add two numbers server side, ridiculous but well..."""
    global index_counter_customers
    customer = User(index_counter_customers)
    customer.save()
    index_counter_customers += 1

    # longitude = customer.user.longitude()
    # latitude = customer.user.latitude()

    random_number = utils.random_int()
    longitude = longitudes[random_number % 9000]
    latitude = latitudes[random_number % 9000]
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
    utils.delete_db(database_path)
    utils.init_db(database_path)
    app.run()
