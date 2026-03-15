import json
import os
from typing import List
from langchain_community.document_loaders import JSONLoader
from langchain_chroma import Chroma
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

class RAGSystem:
    def __init__(self, persist_directory: str):
        self.persist_directory = persist_directory
        # Use a lightweight local embedding model
        self.embedding_function = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        self.vector_store = None
        
        # Load existing DB if available
        if os.path.exists(persist_directory):
            self.vector_store = Chroma(persist_directory=persist_directory, embedding_function=self.embedding_function)

    def ingest_data(self, file_path: str) -> int:
        """Ingest schemes from JSON file into ChromaDB."""
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"File not found: {file_path}")

        # Custom JSON loader to extract relevant text
        # We want to search over Name, Description, Eligibility, State
        
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            
        documents = []
        for item in data:
            # Create a rich text representation for embedding
            page_content = f"""
            Scheme: {item.get('name')}
            Category: {item.get('category')}
            Ministry: {item.get('ministry')}
            Description: {item.get('description')}
            Target Group: {item.get('targetGroup')}
            Benefits: {', '.join(item.get('benefits', []))}
            Eligibility: {', '.join(item.get('eligibility', []))}
            """.strip()
            
            # Store full details in metadata
            # Note: ChromaDB metadata values must be str, int, float, or bool. Lists are not supported directly.
            # We will serialize lists to JSON strings or joined strings.
            clean_metadata = {
                "id": item.get("id"),
                "name": item.get("name"),
                "category": item.get("category"),
                "ministry": item.get("ministry"),
                "description": item.get("description"),
                "official_link": item.get("officialLink"),
                "target_group": item.get("targetGroup"),
                "benefits": json.dumps(item.get("benefits", [])),
                "eligibility": json.dumps(item.get("eligibility", [])),
                "documents": json.dumps(item.get("documents", [])),
                "application_process": json.dumps(item.get("applicationProcess", []))
            }
            
            documents.append(Document(page_content=page_content, metadata=clean_metadata))

        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        splits = text_splitter.split_documents(documents)

        # Create or Update Vector Store
        self.vector_store = Chroma.from_documents(
            documents=splits,
            embedding=self.embedding_function,
            persist_directory=self.persist_directory
        )
        return len(documents)

    def retrieve(self, query: str, k: int = 5) -> List[Document]:
        if not self.vector_store:
            # Try to load again
             self.vector_store = Chroma(persist_directory=self.persist_directory, embedding_function=self.embedding_function)
        
        return self.vector_store.similarity_search(query, k=k)
