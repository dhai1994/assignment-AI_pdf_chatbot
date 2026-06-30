from langchain_community.vectorstores import Chroma
from langchain_ollama import OllamaEmbeddings, ChatOllama


def ask_question(question, user_id, pdf_ids=None):
    """
    Ask a question and retrieve relevant context from ChromaDB
    """
    try:
        # Initialize embeddings
        embedding_model = OllamaEmbeddings(
        model="deepseek-coder:6.7b"
        )
        
        # Load ChromaDB
        vector_db = Chroma(
            embedding_function=embedding_model,
            persist_directory=f"chroma_db/user_{user_id}",
            collection_name=f"user_{user_id}_docs"
        )
        
        # Check if database has any documents
        try:
            collection_count = vector_db._collection.count()
            print(f"📊 Total documents in ChromaDB: {collection_count}")
            
            if collection_count == 0:
                return "No documents found in the database. Please upload PDFs first."
        except:
            return "No documents found in the database. Please upload PDFs first."
        
        # Search with proper ChromaDB filter syntax
        if pdf_ids and len(pdf_ids) > 0:
            # Query each selected PDF with proper $and syntax
            all_results = []
            for pdf_id in pdf_ids:
                try:
                    print(f" Searching in document {pdf_id}")
                    
                    # FIXED: Use $and operator for multiple conditions
                    results = vector_db.similarity_search(
                        question,
                        k=3,
                        filter={
                            "$and": [
                                {"user_id": {"$eq": str(user_id)}},
                                {"document_id": {"$eq": str(pdf_id)}}
                            ]
                        }
                    )
                    all_results.extend(results)
                    print(f" Found {len(results)} chunks from document {pdf_id}")
                except Exception as e:
                    print(f" Error searching document {pdf_id}: {e}")
                    continue
            
            results = all_results[:5]
        else:
            # Search all documents for this user
            results = vector_db.similarity_search(
                question,
                k=5,
                filter={"user_id": {"$eq": str(user_id)}}
            )
        
        print(f" Total results found: {len(results)}")
        
        if not results or len(results) == 0:
            return "No relevant information found in the selected PDFs. The documents may not contain information about this topic."
        
        # Combine context
        context = "\n\n".join([doc.page_content for doc in results])
        
        # Create prompt
        prompt = f"""You are an AI research assistant. Answer the question based on the context below.

Context from PDF documents:
{context}

Question: {question}

Provide a clear and detailed answer:"""
        
        # Generate answer using Ollama Phi-3
        llm = ChatOllama(
        model="phi3.5:latest",
        temperature=0.3
        )
        response = llm.invoke(prompt)
        
        return response.content
        
    except Exception as e:
        error_msg = str(e)
        print(f"Error in RAG pipeline: {error_msg}")
        return f"Error processing your question. Please try again."