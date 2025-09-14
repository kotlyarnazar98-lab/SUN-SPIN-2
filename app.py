from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello! 🚀 Бот рулетка готовится к запуску"

if __name__ == "__main__":
    app.run()
