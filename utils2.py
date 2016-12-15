import math
from mpl_toolkits.basemap import Basemap

m = Basemap(projection='merc',llcrnrlat=-80,urcrnrlat=80,llcrnrlon=-180,urcrnrlon=180,lat_ts=20,resolution='c')
left_down_x, left_down_y = m(-180.0, -89.999)
right_up_x, right_up_y = m(180.0, 89.999)

width = 1440
height = 960

length_width = right_up_x - left_down_x
length_height = right_up_y - left_down_y

def coordinate2pixel(latitude, longitude):
    #dx = math.floor(abs(longitude))
    #dy = math.floor(abs(latitude))
    dx, dy = m(longitude, latitude)

    x = (width * (dx - left_down_x)) / length_width
    y = (height * (dy - left_down_y)) / length_height
    print(x)
    print(y)

    return {'x': x, 'y': y}


def pixel2coordinate(dx, dy):
    print('there')
    return (1.0, 1.0)