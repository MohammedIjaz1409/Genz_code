from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from openai import OpenAI
import os 

app = Flask(__name__, static_folder=".")
CORS(app)
import os

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)


@app.route("/")
def home():
    return send_file("index.html")


@app.route("/style.css")
def css():
    return send_file("style.css")


@app.route("/script.js")
def js():
    return send_file("script.js")


@app.route("/chat", methods=["POST"])
def chat():

    data = request.json
    user_message = data["message"]

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        max_tokens=500,
        messages=[
            {
                "role":"system",
                "content":"You are an AI Business Assistant. Help with business growth, sales, marketing and revenue."
            },
            {
                "role":"user",
                "content":user_message
            }
        ]
    )


    return jsonify({
        "reply": response.choices[0].message.content
    })


if __name__ == "__main__":
    app.run(debug=True)