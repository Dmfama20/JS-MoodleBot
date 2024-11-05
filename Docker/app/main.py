from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI


import os


# Modell für die Anfrage (Pydantic-Modell)
class TextRequest(BaseModel):
    text: str
    assistantID: str  #Übergibt die Assistant ID

# API KEY
client = OpenAI(
    api_key = "sk-.......",
)





app = FastAPI()

@app.get("/")
def hello_world():
    return {"message": "I.O"}

# Route für POST-Anfragen
@app.post("/receive_text")
def receive_text(text_request: TextRequest):
    received_text = text_request.text
    print(received_text)
    thread = client.beta.threads.create()
    message = client.beta.threads.messages.create(
    thread_id=thread.id,
    role="user",
    content=received_text)
    run = client.beta.threads.runs.create_and_poll(
    thread_id=thread.id,
    assistant_id=text_request.assistantID,
    instructions=""
    )

    if run.status == 'completed':
        messages = client.beta.threads.messages.list(
        thread_id=thread.id)
        answer= messages.data[0].content[0].text.value
   
    return {"received_text": answer}

origins = [
   "https://<your_moodle_URL>"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["POST", "GET"],
	allow_headers=["*"],
    max_age=3600,
)
