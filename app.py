from flask import Flask, render_template, jsonify, Response, url_for
from flask_bootstrap import Bootstrap

app = Flask(__name__)
Bootstrap(app)

@app.route('/')
def home():
    return render_template('index.html', title='Welcome')

@app.route('/test')
def example():
    return render_template('example.html')


# @app.template_test('current_link')
# def is_current_link(link):
#     return link[0] is request.url


# def generate_stock_table():
#     yield render_template('stock_header.html')
#     for stock in Stock.query.all():
#         yield render_template('stock_row.html', stock=stock)
#     yield render_template('stock_footer.html')
#
# @app.route('/stock-table')
# def stock_table():
#     return Response(generate_stock_table())

if __name__ == '__main__':
    app.run(debug=True)