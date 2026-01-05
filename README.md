# Social Media Addiction Predictor App

This is a full stack web application that predicts the social media addiction based on the user input. The app uses machine learning to predict the addiction level.

## Features

- Machine Learning Prediction : Uses trained ML model to predict the addiction level . Categories are divided onto Low, Medium and High.
- Interactive UI : React based interface allowing the user to input their data.

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

## Frontend Setup

cd frontend

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

1. Open the application in your browser at http://localhost"5173
2. Fill in the form with your information
   - Average Daily Usage ( hours) : Enter the hours you use social media on average
   - Sleep Hours Per Night : Enter your average sleep hours
   - Most Used Platfrom : From the dropdown you can select one of the social media app that you use most.
3. Click on the "Predict Addiction Level"
4. View you prediction result.

# Author

- Github : https://github.com/puran05
- LinkedIn : https://www.linkedin.com/in/puran-subedi-aa3544231
