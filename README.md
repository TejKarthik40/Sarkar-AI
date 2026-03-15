Aarav, since this is going to be your **GitHub project README**, it should be **clean, professional, and recruiter-friendly** (especially useful if you show it in interviews or portfolios). A good README usually includes:

* Project overview
* Architecture
* Tech stack
* Installation
* Usage
* API endpoints
* Screenshots
* Future improvements
* License

Below is a **well-structured professional README.md** you can directly paste into your GitHub repository.

---

# 🇮🇳 Sarkar AI

### AI-Powered Government Scheme Recommendation System

Sarkar AI is a **Retrieval-Augmented Generation (RAG) based intelligent system** that helps citizens discover the most relevant **government welfare schemes** based on their **personal context** such as occupation, location, and eligibility.

The system uses **semantic search and AI reasoning** to analyze user queries and recommend the most suitable schemes along with eligibility, benefits, and application details.

This project combines **FastAPI, Vector Databases, HuggingFace Embeddings, and a modern Next.js frontend** to create a scalable AI-powered recommendation platform.

---

# 🚀 Features

### 🔎 Intelligent Scheme Discovery

Uses **vector embeddings and semantic search** to match user queries with the most relevant government schemes.

### 🧠 Retrieval-Augmented Generation (RAG)

Combines **vector retrieval + reasoning layer** to produce contextual recommendations.

### ⚡ FastAPI Backend

High-performance API for:

* Scheme ingestion
* Vector search
* AI reasoning
* Recommendation generation

### 💻 Modern Next.js Frontend

Clean and responsive interface built using **React + TypeScript**.

### 📑 Detailed Scheme Information

Displays:

* Eligibility criteria
* Benefits
* Required documents
* Application process

### 🧩 Extensible Architecture

Designed for easy extension with:

* State filtering
* User profiles
* Admin dashboards
* Multi-language support

---

# 🏗️ System Architecture

```
User Query
    │
    ▼
Next.js Frontend
    │
    ▼
FastAPI Backend
    │
    ├── RAG Retrieval Layer
    │      (ChromaDB + HuggingFace Embeddings)
    │
    ├── Reasoning Engine
    │      (LLM-based scheme recommendation)
    │
    ▼
Government Schemes Database
(JSON → Vector Embeddings)
```

---

# 🛠️ Tech Stack

## Frontend

* **Next.js**
* **React**
* **TypeScript**
* **TailwindCSS / CSS**

## Backend

* **FastAPI**
* **Python**

## AI / ML

* **LangChain**
* **HuggingFace Embeddings**
* **Sentence Transformers**
* **Retrieval-Augmented Generation (RAG)**

## Database

* **ChromaDB (Vector Database)**

---

# 📁 Project Structure

```
Sarkar-AI
│
├── backend
│   ├── main.py            # FastAPI server
│   ├── rag.py             # RAG retrieval system
│   ├── reasoning.py       # AI reasoning engine
│   │
│   └── data
│       └── schemes.json   # Government schemes dataset
│
├── frontend
│   ├── app
│   │   ├── page.tsx
│   │   │
│   │   └── components
│   │        ├── Results.tsx
│   │        └── SchemeCard.tsx
│   │
│   ├── public
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/Sarkar-AI.git
cd Sarkar-AI
```

---

# 🔧 Backend Setup

### Requirements

* Python **3.10 or 3.11 recommended**

---

### Create Virtual Environment

```bash
python -m venv .venv
```

Windows

```bash
.venv\Scripts\activate
```

Mac/Linux

```bash
source .venv/bin/activate
```

---

### Install Dependencies

```bash
pip install -r requirements.txt
```

If requirements.txt is missing:

```bash
pip install fastapi uvicorn langchain langchain-core langchain-chroma langchain-huggingface langchain-community langchain-text-splitters sentence-transformers pydantic
```

---

### Start Backend Server

```bash
cd backend
uvicorn main:app --reload --port 8001
```

Backend runs at:

```
http://localhost:8001
```

---

### Ingest Government Schemes

Run this in a new terminal:

```bash
curl -X POST http://localhost:8001/ingest
```

or in PowerShell

```powershell
Invoke-WebRequest -Uri http://localhost:8001/ingest -Method POST
```

This converts schemes into **vector embeddings** and stores them in **ChromaDB**.

---

# 💻 Frontend Setup

### Install Node.js

Recommended version:

```
Node.js v18+
```

---

### Install Dependencies

```bash
cd frontend
npm install
```

---

### Start Frontend

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

# 📊 Example Usage

User enters a query:

```
"I am a small farmer in Maharashtra"
```

The system will:

1️⃣ Convert query to **vector embeddings**
2️⃣ Retrieve relevant schemes from **ChromaDB**
3️⃣ Apply **AI reasoning**
4️⃣ Return recommended schemes with:

* Eligibility
* Benefits
* Required documents
* Application process

---

# 🔗 API Endpoints

### Health Check

```
GET /
```

Response

```
Sarkar AI Backend Running
```

---

### Ingest Schemes

```
POST /ingest
```

Loads schemes into the vector database.

---

### Get Recommendations

```
POST /recommend
```

Example Request

```json
{
  "query": "I am a farmer in Maharashtra"
}
```

---

# 📸 UI Preview (Optional)

You can add screenshots here.

Example:

```
/screenshots/homepage.png
/screenshots/results.png
```

---

# 🧩 Future Improvements

* 🌍 Multi-language support (Hindi, Telugu, etc.)
* 🧑 User profiles & saved recommendations
* 🏛️ State & category filtering
* 📊 Admin dashboard for scheme management
* 📈 Analytics and usage insights
* 🤖 LLM-based conversational assistant

---

# 🤝 Contributing

Contributions are welcome.

Steps:

1. Fork the repository
2. Create a feature branch

```
git checkout -b feature-name
```

3. Commit changes

```
git commit -m "Added feature"
```

4. Push to branch

```
git push origin feature-name
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

# ⭐ Support

If you like this project, consider giving it a **star ⭐ on GitHub**.
