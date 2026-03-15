import os
import json
from typing import List, Dict
from langchain_core.documents import Document
# In a real scenario, we would use LangChain's ChatGoogleGenerativeAI or ChatOpenAI
# from langchain_google_genai import ChatGoogleGenerativeAI

class ReasoningEngine:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        # self.llm = ChatGoogleGenerativeAI(model="gemini-pro", google_api_key=self.api_key) if self.api_key else None

    def analyze(self, user_context: str, retrieved_docs: List[Document]) -> Dict:
        """
        Analyze user context against retrieved schemes and generate advice.
        """
        
        # Prepare context from retrieved docs
        schemes_context = ""
        for i, doc in enumerate(retrieved_docs):
            schemes_context += f"Scheme {i+1}: {doc.page_content}\n---\n"

        prompt = f"""
        You are an expert Government Scheme Advisor (Sarkar AI).
        
        User Context: "{user_context}"
        
        Relevant Schemes Retrieved:
        {schemes_context}
        
        Task:
        1. Analyze the user's situation.
        2. Select the most relevant schemes from the list above.
        3. For each selected scheme, explain WHY they are eligible and what benefits they get.
        4. Provide clear next steps.
        
        Output Format (JSON):
        {{
            "analysis": "Brief analysis of user's profile...",
            "recommendations": [
                {{
                    "scheme_name": "Name of scheme",
                    "reason": "Why they are eligible...",
                    "eligibility_status": "Likely Eligible / Check Details",
                    "next_steps": ["Step 1", "Step 2"],
                    "official_link": "URL"
                }}
            ]
        }}
        """

        # MOCK REASONING if no API key or for this prototype speed
        # In production, we would call self.llm.invoke(prompt)
        
        # Simple heuristic-based mock for demonstration if LLM is not active
        # We will just format the retrieved docs into the structure
        
        recommendations = []
        seen_schemes = set()
        
        for doc in retrieved_docs:
            meta = doc.metadata
            scheme_name = meta.get("name", "Unknown Scheme")
            
            if scheme_name in seen_schemes:
                continue
            seen_schemes.add(scheme_name)
            
            # Deserialize lists
            try:
                benefits = json.loads(meta.get("benefits", "[]"))
            except:
                benefits = []
                
            try:
                eligibility = json.loads(meta.get("eligibility", "[]"))
            except:
                eligibility = []
                
            try:
                documents = json.loads(meta.get("documents", "[]"))
            except:
                documents = []
                
            try:
                app_process = json.loads(meta.get("application_process", "[]"))
            except:
                app_process = []

            recommendations.append({
                "id": meta.get("id"),
                "name": scheme_name,
                "category": meta.get("category", "General"),
                "ministry": meta.get("ministry", "Government of India"),
                "description": meta.get("description", ""),
                "target_group": meta.get("target_group", "All"),
                "benefits": benefits,
                "eligibility": eligibility,
                "documents": documents,
                "application_process": app_process,
                "official_link": meta.get("official_link", "#"),
                "reason": "Based on your profile, this scheme seems relevant."
            })

        return {
            "analysis": f"Based on your input '{user_context}', we found {len(retrieved_docs)} potential schemes.",
            "recommendations": recommendations
        }
