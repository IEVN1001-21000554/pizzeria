from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_mysqldb import MySQL
from config import config

app = Flask(__name__)
app.config.from_object(config['development'])
CORS(app, origins="http://localhost:4200") 
mysql = MySQL(app)

@app.route('/consultar-ventas', methods=['GET'])
def consultar_ventas():
    try:
        fecha = request.args.get('fecha')  
        

        if not fecha:
            return jsonify({'mensaje': 'Fecha es requerida', 'exito': False}), 400
        
        cursor = mysql.connection.cursor()
        
        cursor.execute("SELECT nombre, total, fecha FROM pedidos WHERE fecha = %s", (fecha,))
        ventas = cursor.fetchall()
        
        cursor.close()

        if ventas:
            return jsonify({'ventas': [{'nombre': venta[0], 'total': venta[1], 'fecha': venta[2]} for venta in ventas]})
        else:
            return jsonify({'mensaje': 'No se encontraron ventas para la fecha especificada', 'exito': False}), 404
        
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'mensaje': 'Error al consultar las ventas', 'exito': False}), 500

@app.route('/')
def index():
    return "API de Pedidos - Flask"

if __name__ == '__main__':
    app.run(port=5000, debug=True)
