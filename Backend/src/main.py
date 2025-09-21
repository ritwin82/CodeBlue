from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any
import os
from dotenv import load_dotenv
from services.experts.cardio_respiratory_expert import CardioRespiratoryExpert
from services.experts.infectious_expert import InfectiousExpert
from services.experts.chronic_expert import ChronicExpert

load_dotenv()

app = FastAPI(title="MediGuardAI API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Your Vite frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize experts
api_key = os.getenv("OPENAI_API_KEY")
cardio_expert = CardioRespiratoryExpert(api_key)
infectious_expert = InfectiousExpert(api_key)
chronic_expert = ChronicExpert(api_key)

@app.post("/analyze")
async def analyze_symptoms(symptoms: Dict[str, Any]):
    try:
        # Get analysis from each expert
        cardio_analysis = await cardio_expert.analyze(symptoms)
        infectious_analysis = await infectious_expert.analyze(symptoms)
        chronic_analysis = await chronic_expert.analyze(symptoms)

        # Combine results
        return {
            "cardio_respiratory": cardio_analysis,
            "infectious": infectious_analysis,
            "chronic": chronic_analysis
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)