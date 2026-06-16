from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
import json

model = SentenceTransformer('all-MiniLM-L6-v2')

with open("data/medical_knowledge.json") as f:
    docs = json.load(f)

texts = [d["description"] for d in docs]
embeddings = model.encode(texts)

index = faiss.IndexFlatL2(len(embeddings[0]))
index.add(np.array(embeddings))

def retrieve_context(query):
    q_emb = model.encode([query])
    D, I = index.search(np.array(q_emb), k=1)
    return docs[I[0][0]]