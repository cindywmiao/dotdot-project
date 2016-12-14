# -*- coding: utf-8 -*-
"""
    jQuery Example
    ~~~~~~~~~~~~~~

    A simple application that shows how Flask and jQuery get along.

    :copyright: (c) 2015 by Armin Ronacher.
    :license: BSD, see LICENSE for more details.
"""
from flask import Flask, jsonify, render_template, request

from faker import Factory
from models import User
import math
import sqlite3
import os
from flask_bootstrap import Bootstrap

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
    index_counter += 1

    longitude = customer.user.longitude()
    latitude = customer.user.latitude()

    dx = math.floor(abs(longitude))
    dy = math.floor(abs(latitude))

    customer.save()

    return jsonify(x=dx, y=dy)


@app.route('/')
def example():
    return render_template('example.html')

@app.route('/home')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    delete_db('test.db')
    init_db()
    app.run()
