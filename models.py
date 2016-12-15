from faker import Factory
import sqlite3
from random import randint


def get_conn():
    return sqlite3.connect("test.db")

class User(object):
    def __init__(self, user_id):
        self.user_id = user_id
        faker = Factory.create()
        self.user = faker

    def save(self):
        sql = 'insert into users VALUES (?,?,?,?,?)'
        conn = get_conn()
        cursor = conn.cursor()
        name = self.user.name()
        address = self.user.address()
        longitude = self.user.longitude()
        latitude = self.user.latitude()
        cursor.execute(sql, (self.user_id, name, address, float(longitude), float(latitude)))
        conn.commit()
        cursor.close()
        conn.close()

    def __str__(self):
        return 'User=> id:{} name:{} '.format(self.user_id, self.user)


class Item(object):
    def __init__(self, item_id, lines):
        self.item_id = item_id;
        index = randint(0,63)
        line = lines[index].split(',')
        self.unit = line[0]
        self.category = line[1][:-1]

    def save(self):
        sql = 'insert into items VALUES (?,?,?)'
        conn = get_conn()
        cursor = conn.cursor()
        cursor.execute(sql, (self.item_id, self.unit, self.category ))
        conn.commit()
        cursor.close()
        conn.close()


    def __str__(self):
        return 'Item => unit:{} category:{}'.format(self.unit, self.category)