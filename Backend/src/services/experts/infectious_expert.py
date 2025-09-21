from typing import Dict, Any
import openai

class InfectiousExpert:
    def __init__(self, api_key: str):
        self.api_key = api_key
        openai.api_key = api_key

    async def analyze(self, symptoms: Dict[str, Any]) -> Dict[str, Any]:
        prompt = f"""
        Analyze these symptoms as an infectious disease expert:
        {symptoms}
        Focus on: fever, cough, GI symptoms, general infections
        Provide: 
        - Potential infections
        - Testing recommendations
        - Urgency level
        - Treatment suggestions
        """
        
        response = await openai.ChatCompletion.acreate(
            model="gpt-4",
            messages=[{"role": "system", "content": prompt}],
            temperature=0.3
        )
        
        return {
            "expert_type": "infectious",
            "analysis": response.choices[0].message.content,
            "confidence": response.choices[0].finish_reason == "stop"
        }