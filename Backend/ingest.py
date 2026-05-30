from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_ollama import OllamaEmbeddings

# Load PDF
loader = PyPDFLoader("media/pdfs/PID_PSO_GWO_Final.pdf")
docs = loader.load()

print(f"Loaded {len(docs)} pages")

# Split text into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=200
)

splits = splitter.split_documents(docs)

print(f"Total chunks: {len(splits)}")

# Embedding model
embeddings = OllamaEmbeddings(
    model="nomic-embed-text"
)

# Create Chroma vector DB
vector_db = Chroma.from_documents(
    documents=splits,
    embedding=embeddings,
    persist_directory="./chroma_db"
)

print("PDF embedded successfully!")
