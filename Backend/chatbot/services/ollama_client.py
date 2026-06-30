from langchain_ollama import OllamaLLM


llm = OllamaLLM(
    model="qwen3.5:9b",
    temperature=0.3
)