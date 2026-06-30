# 📄 AI PDF Chatbot

## 🧠 AI-Powered Multi-Document Research Assistant

An intelligent **Retrieval-Augmented Generation (RAG)** platform that enables users to upload multiple PDF documents, perform semantic search, ask natural language questions, and receive context-aware answers using Large Language Models.

Built using **React, Django REST Framework, LangChain, ChromaDB, Ollama, and JWT Authentication**, the platform transforms static PDF documents into an interactive AI knowledge base with voice interaction, document-level retrieval, and persistent chat history.

---

# 📌 Overview

AI PDF Chatbot is a modern document intelligence platform powered by **Retrieval-Augmented Generation (RAG).**

Unlike traditional PDF readers that only display documents, this platform understands document content, performs semantic retrieval, and answers questions using Large Language Models grounded in the uploaded PDFs.

The platform combines:

- 📄 Multi-Document Management
- 🔍 Semantic Search
- 🤖 Retrieval-Augmented Generation (RAG)
- 🎙️ Voice Interaction
- 💬 Persistent Chat History
- 🔐 JWT Authentication
- 📊 Interactive Dashboard

to transform static PDF documents into an intelligent conversational knowledge base.

---

# ✨ Key Features

## 🔐 Authentication & Authorization

- Secure JWT Authentication
- User Registration & Login
- Protected API Routes
- User-specific Document Collections
- Role-based API Protection

---

## 📄 Multi-PDF Document Management

Manage multiple research papers, books, reports, and documentation.

| Feature | Status |
|----------|--------|
| Upload Multiple PDFs | ✅ |
| Automatic Document Chunking | ✅ |
| Persistent Document Storage | ✅ |
| Individual Document Management | ✅ |
| Delete Uploaded Documents | ✅ |
| View Uploaded PDFs | ✅ |
| Automatic Indexing | ✅ |

---

## 🔍 Semantic Search Engine

Instead of keyword matching, the chatbot understands the meaning of the question and retrieves the most relevant document chunks.

### Features

- Semantic similarity search
- Context-aware retrieval
- High-quality document matching
- ChromaDB vector database
- User-specific vector storage
- Fast nearest-neighbor retrieval

### Retrieval Roadmap

| Retrieval Method | Status |
|------------------|--------|
| Semantic Search | ✅ Current |
| Hybrid Search (Semantic + BM25) | 🚧 Planned |
| Cross Encoder Reranking | 🚧 Planned |


---

## 📑 Document-Level Querying

One of the biggest differentiators of this project.

Instead of searching every uploaded PDF, users can decide exactly which documents should participate in retrieval.

### Features

- Select individual PDFs
- Select multiple PDFs
- Deselect PDFs to exclude them
- Search selected documents only
- Ignore unrelated documents

### Example

```text
Selected Documents

✓ Research Paper.pdf
✓ Deep Learning Notes.pdf
✗ Database Notes.pdf

Question:
Explain the Transformer Architecture.

→ Only the selected PDFs are searched.
```

---

## 🤖 Retrieval-Augmented Generation (RAG)

The chatbot never answers purely from model memory.

Every answer is generated using the retrieved document context.

### RAG Workflow

```text
User Question
      ↓
Semantic Embedding
      ↓
Vector Search (ChromaDB)
      ↓
Relevant Chunks Retrieved
      ↓
Context Construction
      ↓
Ollama LLM
      ↓
Final Context-Aware Answer
```

---

## 📁 PDF Processing Pipeline

Every uploaded document automatically goes through the following pipeline.

```text
Upload PDF
      ↓
Extract Text
      ↓
Chunk Document
      ↓
Generate Embeddings (nomic-embed-text)
      ↓
Store in ChromaDB
      ↓
Ready for Semantic Search
```

---

## 🎙️ Voice AI

Interact with documents completely hands-free.

### Features

- 🎤 Speech-to-Text input
- 🎙️ Voice Question Input
- 🔊 AI Voice Responses
- 🗣️ Text-to-Speech output
- 🤖 Hands-free document interaction

---

## 💬 Persistent Chat History

Every conversation is stored automatically.

### Features

- Persistent conversations across sessions
- Previous chat access
- Full question & answer history
- User-specific sessions

---

## 📊 Dashboard

A modern dashboard to manage your knowledge base.

### Dashboard Includes

- 📄 Uploaded PDFs overview
- 💬 Chat History
- 📂 Document Selection controls
- ⚡ Upload Status
- 👤 User Information

---

# 🏗️ System Architecture

```text
            React Frontend
                   │
                   ▼
          Django REST API
                   │
      ┌────────────┴────────────┐
      ▼                         ▼

Authentication           PDF Processing
                               │
                               ▼
                       Text Extraction
                               │
                               ▼
                        Chunk Generation
                               │
                               ▼
                     Embedding Generation
                     (nomic-embed-text)
                               │
                               ▼
                          ChromaDB
                               │
                               ▼
                     Semantic Retrieval
                               │
                               ▼
                         Ollama LLM
                         (phi3.5)
                               │
                               ▼
                     AI Generated Answer
```

---

# 🛠️ Tech Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| React | UI Framework |
| Vite | Build Tool |
| Axios | HTTP Client |
| React Router | Client-side Routing |

---

## Backend

| Technology | Purpose |
|------------|---------|
| Django | Web Framework |
| Django REST Framework | REST API |
| JWT Authentication | Secure Authentication |

---

## AI Stack

| Technology | Purpose |
|------------|---------|
| LangChain | RAG Orchestration |
| Ollama | Local LLM Inference |
| ChromaDB | Vector Database |
| nomic-embed-text | Embedding Model |
| phi3.5 | Chat Model |

> **Supports any Ollama-compatible model.**

---

# 🚀 Current Capabilities

| Capability | Status |
|------------|--------|
| Multi-PDF Upload | ✅ |
| Semantic Search | ✅ |
| Multi-Document Chat | ✅ |
| Document-Level Filtering | ✅ |
| Voice Input | ✅ |
| Voice Output | ✅ |
| JWT Authentication | ✅ |
| Persistent Chat History | ✅ |
| ChromaDB Vector Storage | ✅ |
| Modern Dashboard | ✅ |
| Context-Aware AI Responses | ✅ |

---

# 🚧 Future Improvements

- Hybrid Search (Semantic + BM25)
- OCR Support for Scanned PDFs
- Image Understanding
- Table Extraction
- Streaming Responses
- Citation Generation
- Cross Encoder Reranking
- Agentic RAG
- Parent Document Retriever
- Metadata Search
- Folder Organization
- Cloud Storage Integration
- Multi-language Support
- AI Notes Generation
- Document Summarization
- LLM Model Selection UI
- Knowledge Graph Integration

---

# ⭐ Why This Project?

Unlike most PDF chatbots, this platform provides:

- ✅ Multi-document retrieval — query across many PDFs at once
- ✅ Document-level filtering — choose exactly which PDFs to search
- ✅ Semantic understanding — meaning-based search, not just keywords
- ✅ Voice interaction — fully hands-free document Q&A
- ✅ Persistent conversations — pick up where you left off
- ✅ User-specific vector databases — isolated, private knowledge bases
- ✅ Scalable RAG architecture — built to grow
- ✅ Modern React dashboard — clean, intuitive UI

Making it suitable for:

- 📚 Research Papers
- 📖 Academic Resources
- 📑 Technical Documentation
- 🏢 Enterprise Knowledge Bases
- 🤖 AI-Powered Document Assistants

---

# 📜 License

This project is licensed under the **MIT License**.
