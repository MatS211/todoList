from flask import Flask, render_template, request, redirect, jsonify
import mysql.connector

app = Flask(__name__)

# konfiguracja polączenia

db_config = {
    'host': 'localhost',  
    'user': 'root',       
    'password': '',  
    'database': 'todo_db'  
}


# połączenie z bazą
def get_db_connection():
    connection = mysql.connector.connect(**db_config)
    return connection

@app.route("/")
def index():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM tasks")
    tasks = cursor.fetchall()
    cursor.close()
    connection.close()
    return render_template("index.html", tasks=tasks)

@app.route("/api/add", methods = ['POST'])
def add():
    new_task = request.get_json()
    tytul = new_task.get('tytul')
    opis = new_task.get('opis')
    kategoria = new_task.get('kategoria')
    if not new_task or "tytul" not in new_task or "opis" not in new_task or "kategoria" not in new_task:
        return jsonify({"error": "Brak wymaganego pola 'tytul', 'opis' lub 'kategoria'"}), 400
    
    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        cursor.execute(
            "INSERT INTO tasks(tytul, opis, kategoria) VALUES (%s, %s, %s)",
            (tytul, opis, kategoria)
        )
        connection.commit()
        new_task_id = cursor.lastrowid

        return jsonify({"id": new_task_id, "tytul": tytul, "opis": opis, "kategoria": kategoria}), 201
    
    except Exception as e:
        return jsonify({"error": "Wystąpił błąd", "szczegoly":str(e)}), 500
    
    finally:
        cursor.close()
        connection.close()
# 201- created

@app.route("/api/show", methods = ["GET"])
def show():
    connection = get_db_connection()
    cursor = connection.cursor()
    cursor.execute(
        "Select * from tasks"
    )
    tasks = cursor.fetchall()
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify(tasks), 200
# 200 - OK  

@app.route("/api/update/<int:task_id>", methods = ["PATCH"])
def update(task_id):
    connection = get_db_connection()
    cursor = connection.cursor()
    update_task = request.get_json()
    try:
        cursor.execute(
        "Select * from tasks WHERE ID = %s", (task_id,)
        )
        current_task = cursor.fetchone()
        if current_task is None:
            return jsonify({"error":f"Task z id {task_id} nie istnieje"}), 404
        
        new_title = update_task.get("tytul", current_task[1])
        new_description = update_task.get("opis", current_task[2])
        new_category = update_task.get("kategoria", current_task[3])
        new_status = update_task.get("status", current_task[4])
        if new_status != 0 and new_status != 1:
            new_status = 0
    
        # Aktualizacja rekordu w bazie
        cursor.execute(
            "UPDATE tasks SET tytul = %s, opis = %s, kategoria = %s, status = %s WHERE ID = %s",
            (new_title, new_description, new_category,new_status, task_id)
        )
        
        connection.commit()
        return jsonify({"tytul": new_title, "opis": new_description, "kategoria": new_category  ,"status": new_status, "id": task_id}), 200

    except Exception as e:
        return jsonify({"error": "Wystąpił błąd", "szczegoly":str(e)}), 500

    finally:
        cursor.close()
        connection.close()


@app.route("/api/delete/<int:task_id>", methods = ["DELETE"])
def delete(task_id):
    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        cursor.execute(
            "DELETE FROM tasks WHERE ID = %s", (task_id,)
        )
        connection.commit()
        if cursor.rowcount == 0:
            return jsonify({"error": f"Zadanie o ID {task_id} nie istnieje"}), 404
        
        return jsonify({"message": f"TASK z id {task_id} usunięte."}), 200
    except Exception as e:
        return jsonify({"error":"wystąpił błąd", "szczegoly": str(e)}), 500
    finally:
        cursor.close()
        connection.close()




# bez html
@app.route("/api/show_by_id/<int:task_id>", methods = ["GET"])
def show_by_id(task_id):
    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT * FROM tasks WHERE ID = %s", (task_id,))
        task = cursor.fetchone()

        if task is None:
            return jsonify({"error": "Zadanie nie znalezione"}), 404

        return jsonify({"id": task[0], "tytul": task[1], "opis": task[2], "status": task[3]}), 201
    
    except Exception as e:
        return jsonify({"error":"Wystąpił błąd", "szczegoly": str(e)}), 500

    finally:
        cursor.close()
        connection.close()

@app.route("/stats")
def stats():
    return render_template("stats.html")


@app.route("/api/stats/pie")
def stats_api_pie():
    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT kategoria, COUNT(*) from tasks GROUP BY kategoria")
        result = cursor.fetchall()
        
        labels = [row[0] for row in result]   # Kategorie
        values = [row[1] for row in result]   # Liczba zadań

        return jsonify({"labels": labels, "values": values})
    
    except Exception as e:
        return jsonify({"error":"Wystąpił błąd", "szczegoly": str(e)}), 500
    
    finally:
        cursor.close()
        connection.close()

@app.route("/api/stats/line")
def stats_api_line():
    connection = get_db_connection()
    cursor = connection.cursor()
    try:
        cursor.execute("SELECT DATE(data_utworzenia), COUNT(*) FROM tasks GROUP BY DATE(data_utworzenia) ORDER BY DATE(data_utworzenia);")
        result = cursor.fetchall()
        
        labels = [row[0] for row in result]   # Data utworzenia
        values = [row[1] for row in result]   # Ilość

        return jsonify({"labels": labels, "values": values})
    
    except Exception as e:
        return jsonify({"error":"Wystąpił błąd", "szczegoly": str(e)}), 500
    
    finally:
        cursor.close()
        connection.close()

if __name__ == '__main__':
    app.run(host="0.0.0.0")