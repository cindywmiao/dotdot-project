from faker import Factory

faker = Factory.create()


for i in range(10):
    longitude = faker.longitude()
    latitude = faker.latitude()

    print(longitude, latitude)