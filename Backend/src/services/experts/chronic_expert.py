from typing import Dict, Any
import openai

class ChronicExpert:
    def __init__(self, api_key: str):
        self.api_key = api_key
        openai.api_key = api_key

    async def analyze(self, symptoms: Dict[str, Any]) -> Dict[str, Any]:
        prompt = f"""
        Analyze these symptoms as a chronic conditions expert:
        {symptoms}
        Focus on: diabetes, hypertension, chronic conditions
        Provide: 
        - Management suggestions
        - Medication recommendations
        - Lifestyle modifications
        - Long-term monitoring advice
        """
        
        response = await openai.ChatCompletion.acreate(
            model="gpt-4",
            messages=[{"role": "system", "content": prompt}],
            temperature=0.3
        )
        
        return {
            "expert_type": "chronic",
            "analysis": response.choices[0].message.content,
            "confidence": response.choices[0].finish_reason == "stop"
        }