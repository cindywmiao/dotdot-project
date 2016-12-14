from faker import Factory


class User(object):
    def __init__(self, user_id, user_name, user_address):
        self.user_id = user_id
        self.user_name = user_name
        self.user_address = user_address

    def __str__(self):
        return 'User=> id:{} name:{} address:{}'.format(self.user_id, self.user_name, self.user_address)


class Item(object):
    def __init__(self, item_id, item_name):
        self.item_id = item_id
        self.item_name = item_name

    def __str__(self):
        return 'Item=> id:{} name:{}'.format(self.item_id, self.item_name)