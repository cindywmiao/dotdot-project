import math
# from mpl_toolkits.basemap import Basemap
#
# m = Basemap(projection='merc',llcrnrlat=-80,urcrnrlat=80,llcrnrlon=-180,urcrnrlon=180,lat_ts=20,resolution='c')
# left_down_x, left_down_y = m(-180.0, -89.999)
# right_up_x, right_up_y = m(180.0, 89.999)

width = 1440
height = 960

# length_width = right_up_x - left_down_x
# length_height = right_up_y - left_down_y

def coordinate2pixel(longitude, latitude):

    print(latitude)
    print(longitude)
    y = ((float(latitude) + 90.0) * height) / 180.0
    x = ((float(longitude) + 180.0) * width) / 360.0


    print(x)
    print(y)

    return {'x': math.floor(x), 'y': math.floor(y)}


def pixel2coordinate(dx, dy):
    print('there')
    return (1.0, 1.0)