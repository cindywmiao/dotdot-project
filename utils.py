import math
import sqlite3
import os
from random import randint
import random
# from mpl_toolkits.basemap import Basemap
#
# m = Basemap(projection='merc',llcrnrlat=-80,urcrnrlat=80,llcrnrlon=-180,urcrnrlon=180,lat_ts=20,resolution='c')
# left_down_x, left_down_y = m(-180.0, -89.999)
# right_up_x, right_up_y = m(180.0, 89.999)

width = 1440
height = 820

# length_width = right_up_x - left_down_x
# length_height = right_up_y - left_down_y

def coordinate2pixel(longitude, latitude):
    y = height - ((float(latitude) + 90.0) * height) / 180.0 + 75
    x = width - ((float(longitude) + 180.0) * width) / 360.0
    return {'x': int(math.floor(x)), 'y': int(math.floor(y))}


def pixel2coordinate(dx, dy):
    print('there')
    return (1.0, 1.0)


def delete_db(filename):
    if os.path.exists(filename):
        os.remove(filename)

def init_db(filename):
    sql = 'create table users (id INT, name TEXT, address TEXT, longitude FLOAT, latitude FLOAT)'
    conn = sqlite3.connect(filename)
    cursor = conn.cursor()
    cursor.execute(sql)
    conn.commit()
    cursor.close()
    conn.close()

    sql = 'create table items (id INT, unit TEXT, category TEXT)'
    conn = sqlite3.connect(filename)
    cursor = conn.cursor()
    cursor.execute(sql)
    conn.commit()
    cursor.close()
    conn.close()

def random_int():
    return randint(0,9000)

def random_probablity(units):

    x = randint(0, 100)
    y = randint(0, 100)
    z = randint(0, 100)
    nums = random.sample(range(0, len(units)), 3)
    sum = 0
    sum += x
    sum += y
    sum += z
    mydict = {}
    mydict[units[nums[0]]] = (x * 1.0)/sum
    mydict[units[nums[1]]] = (y * 1.0)/sum
    mydict[units[nums[2]]] = (z * 1.0)/sum

    return mydict


