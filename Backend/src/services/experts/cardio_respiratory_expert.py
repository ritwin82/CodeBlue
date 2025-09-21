from typing import Dict, Any
import openai

class CardioRespiratoryExpert:
    def __init__(self, api_key: str):
        self.api_key = api_key
        openai.api_key = api_key

    async def analyze(self, symptoms: Dict[str, Any]) -> Dict[str, Any]:
        prompt = f"""
        Analyze these symptoms as a cardiology and respiratory expert:
        {symptoms}
        Focus on: chest pain, breathlessness, palpitations
        Provide: diagnosis possibility, confidence level, and recommended actions
        """
        
        response = await openai.ChatCompletion.acreate(
            model="gpt-4",
            messages=[{"role": "system", "content": prompt}],
            temperature=0.3
        )
        
        return {
            "expert_type": "cardio_respiratory",
            "analysis": response.choices[0].message.content,
            "confidence": response.choices[0].finish_reason == "stop"
        }