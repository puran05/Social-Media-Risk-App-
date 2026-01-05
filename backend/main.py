from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib 
import pandas as pd 

# This will load the model that we have saved in teh pkl file 
model = joblib.load("addiction_model.pkl")

app = FastAPI(title="Social Media Addiction Predictor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserInput(BaseModel):
    Avg_Daily_Usage_Hours: float
    Sleep_Hours_Per_Night: float
    Most_Used_Platform: str

#This is the endpooint for our Post Api
@app.post("/predict")
def predict_addiction(input_data: UserInput):
    df = pd.DataFrame([input_data.model_dump()])

    prediction = model.predict(df)

    return {"Addiction_Level": prediction[0]}
