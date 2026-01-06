# Social Media Addiction Predictor App

This is a full stack web application that predicts the social media addiction based on the user input. The app uses machine learning to predict the addiction level.

## Features

- Machine Learning Prediction : Uses trained ML model to predict the addiction level . Categories are divided onto Low, Medium and High.
- Interactive UI : React based interface allowing the user to input their data.

## Model Details

- The models is trained on the Students Social Media Addiction data available for public use on Kaggle. Using the features such as the Average Daily Usage Hours, Sleep Hours per night and the Most Used platform to predict the addiction level. The Overall Performance of the model is as followed

### Overall Performance

- Accuracy: 0.79
- Macro Average : Precision 0.79 , F-1 Score 0.79
- Weighted Average: Precision 0.79 , Recall 0.79 , F1-Score 0.79

## Data Usage

This project uses a publicly available dataset from Kaggle:
https://www.kaggle.com/datasets/adilshamim8/social-media-addiction-vs-relationships?select=Students+Social+Media+Addiction.csv

## Tech Stack

## Frontend

- React.js
- CSS
- Fetch API

## Backend

- FastAPI
- Python
- Scikit-learn
- Pandas
- Joblib

## Prerequisites

Before running the project, make sure you have these installed

- Node.js (v14 or higher)
- Python (v3 or higher)
- npm or yarn

## Installation & Setup

Clone the Repository

## Backend Setup

cd backend
python -m venv venv

To run the FastAPI server
uvicorn main:app --reload

The backend of will run on http://127.0.0.1:8000

## API Endpoint

/predict

To request a sample response you can use the following
{
"Avg_Daily_Usage_Hours": 6,
"Sleep_Hours_Per_Night": 10,
"Most_Used_Platform": 5
}

## Frontend Setup

cd frontend
cd social-media-addicition-app
To install the dependencies
npm install

To start the development server
npm run dev

The above command will run the dev server and you will see the application on http://localhost:5173

## Project Structure

- socialMediaRiskApp
  - backend/
    - main.py
    - addiction_model.pkl
  - frontend/
    - src/
      - App.jsx
      - App.css
    - package.json
  - README.md

## Instruction to use the application

1. Open the application in your browser at http://localhost:5173
2. Fill in the form with your information
   - Average Daily Usage ( hours) : Enter the hours you use social media on average
   - Sleep Hours Per Night : Enter your average sleep hours
   - Most Used Platfrom : From the dropdown you can select one of the social media app that you use most.
3. Click on the "Predict Addiction Level"
4. View you prediction result.
   ![App Screenshot](screenshot/sc.png)

## Future Enhancement

1. Machine Learning Model Improvements

   - Currently the model only predicts on the basis of limited amount of data. The future goal is to use a newer available data and also advanced model.
   - Add feature importance visualization so that it shows what contribitutes most to the addiction

2. Data Visualization
   - Add charts and graph showing the trends of usage using libraries like Chart.js

# Author

- Github : https://github.com/puran05
- LinkedIn : https://www.linkedin.com/in/puran-subedi-aa3544231
