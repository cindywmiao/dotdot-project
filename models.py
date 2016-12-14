from faker import Factory
import sqlite3

def get_conn():
    return sqlite3.connect("test.db")

class User(object):
    def __init__(self, user_id):
        self.user_id = user_id
        faker = Factory.create()
        self.user = faker

    def save(self):
        sql = 'insert into user VALUES (?,?,?,?,?)'
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
    def __init__(self, item_id, item_name):
        self.item_id = item_id
        self.item_name = item_name

    def __str__(self):
        return 'Item=> id:{} name:{}'.format(self.item_id, self.item_name)