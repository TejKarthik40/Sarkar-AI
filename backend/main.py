import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from backend.rag import RAGSystem
from backend.reasoning import ReasoningEngine

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Sarkar AI API", description="Government Scheme Recommendation System")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize RAG and Reasoning
rag_system = RAGSystem(persist_directory="./backend/chroma_db")
reasoning_engine = ReasoningEngine()

class UserQuery(BaseModel):
    user_context: str
    state: Optional[str] = None

class SchemeRecommendation(BaseModel):
    id: str
    name: str
    category: str
    ministry: str
    description: str
    benefits: List[str]
    eligibility: List[str]
    documents: List[str]
    application_process: List[str]
    official_link: str
    target_group: str
    reason: str = "Matched based on your profile."

class ResponseModel(BaseModel):
    analysis: str
    recommendations: List[SchemeRecommendation]
    relevant_schemes_raw: List[dict]

@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.post("/ingest")
async def ingest_data():
    """Trigger ingestion of schemes.json into Vector DB."""
    try:
        count = rag_system.ingest_data("./backend/data/schemes.json")
        return {"message": f"Successfully ingested {count} schemes."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/recommend", response_model=ResponseModel)
async def recommend_schemes(query: UserQuery):
    """
    1. Retrieve relevant schemes using RAG.
    2. Pass retrieved context + user query to LLM for reasoning.
    3. Return structured advice.
    """
    try:
        # 1. Retrieval
        retrieved_docs = rag_system.retrieve(query.user_context, k=5)
        
        # 2. Reasoning
        result = reasoning_engine.analyze(query.user_context, retrieved_docs)
        
        return {
            "analysis": result["analysis"],
            "recommendations": result["recommendations"],
            "relevant_schemes_raw": [doc.metadata for doc in retrieved_docs]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
