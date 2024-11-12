from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
from config import config

app = Flask(__name__)
app.config.from_object(config['development'])
CORS(app, origins="http://localhost:4200") 
mysql = MySQL(app)

@app.route('/confirmar-pedido', methods=['POST'])
def confirmar_pedido():
    try:

        data = request.json
        pedidos = data['pedidos'] 

        cursor = mysql.connection.cursor()

        for pedido in pedidos:
            nombre = pedido.get('nombre')
            direccion = pedido.get('direccion')
            telefono = pedido.get('telefono')
            fecha = pedido.get('fecha')
            total = pedido.get('total')

            cursor.execute("""
                INSERT INTO pedidos (nombre, direccion, telefono, fecha, total) 
                VALUES (%s, %s, %s, %s, %s)
            """, (nombre, direccion, telefono, fecha, total))

        mysql.connection.commit()
        cursor.close()


        return jsonify({'mensaje': 'Pedidos confirmados y almacenados en la base de datos', 'exito': True})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'mensaje': 'Error al confirmar los pedidos', 'exito': False}), 500

@app.route('/')
def index():
    return "API de Pedidos - Flask"

if __name__ == '__main__':
    app.run(port=5000, debug=True)
