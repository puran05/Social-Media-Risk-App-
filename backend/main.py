from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import joblib 
import pandas as pd 
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError
import datetime

# This will load the model that we have saved in teh pkl file 
model = joblib.load("addiction_model.pkl")

app = FastAPI(title="Social Media Addiction Predictor")

#for password hashing
ph = PasswordHasher()

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
    User_Id: float
#class for usersignup 

class UserSignup(BaseModel):
    first_name: str
    last_name: str
    username: str
    password: str

class UserLogin(BaseModel):
    username: str
    password : str

#This is the endpooint for our Post Api
@app.post("/predict")
def predict_addiction(input_data: UserInput):
    df = pd.DataFrame([input_data.model_dump()])

    prediction = model.predict(df)

    today = datetime.date.today().isoformat()    
    conn = None

    try:
        conn = sqlite3.connect("./database/database.db", check_same_thread=False)
        cursor = conn.cursor()

        cursor.execute(
            """
            SELECT user_id FROM daily_entries WHERE user_id = ? AND date= ?
            """,
        (input_data.User_Id, today)
        )

        if cursor.fetchone():
            raise HTTPException(status_code=429, detail =" You have already submitted your report for today")

        cursor.execute(
        """
        INSERT INTO daily_entries (user_id,avg_daily_usage_hours,sleep_hours_per_night,most_used_platform,addiction_result)
        VALUES (?,?,?,?,?)
        """,
        (input_data.User_Id,input_data.Avg_Daily_Usage_Hours,input_data.Sleep_Hours_Per_Night,input_data.Most_Used_Platform,prediction[0])
        )

        conn.commit()
        return{
            "message": "User daily data added successfully",
            "Addiction_Level": prediction[0]
            }
    except HTTPException:
        raise 
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=429, detail= "You have already submitted for today")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if conn:
            conn.close()


# Endpoint for the signup page 
@app.post("/signup")
def signup(user:UserSignup):
   try: 
        hashed_password = ph.hash(user.password)

        conn = sqlite3.connect("./database/database.db" ,check_same_thread= False)
        cursor = conn.cursor()

        cursor.execute(
            """
            INSERT INTO users (username, first_name, last_name, password_hash)
            VALUES (?, ?, ?, ?)
            """,
            (user.username,user.first_name,user.last_name,hashed_password)
        )

        conn.commit()

        return{"message":"User created sucessfully"}
   except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Username already exists")

  

@app.post("/login/")
def login(userprofile: UserLogin):    
    conn = sqlite3.connect("./database/database.db",check_same_thread=False)
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT user_id,username, first_name , last_name, password_hash
        FROM users 
        WHERE username = ?
        """,
        (userprofile.username,)
    )
    row = cursor.fetchone()

    if row:
        user_id,username, first_name, last_name, password_hash = row
        try:
            ph.verify(password_hash, userprofile.password)
        except VerifyMismatchError:
            raise HTTPException(status_code=401, detail="Invalid Credentials")
        return {"user_id":user_id,"username":username,"first_name":first_name,"last_name":last_name}
    else:
        raise HTTPException(status_code=401, detail="Invalid Credentials")