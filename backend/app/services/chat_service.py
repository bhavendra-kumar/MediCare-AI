from app.services.gemini_service import generate_json_response
from app.services.rag_service import retrieve_context

async def medical_chat(body):
    question = body.get("question")
    language = body.get("language", "English")

    context = retrieve_context(question)

    prompt = f"""
    You are a medical assistant.

    Use this knowledge:
    {context}

    Answer the question in {language}.

    Return JSON:
    {{
      "answer": "...",
      "precautions": ["..."],
      "severity": "...",
      "disclaimer": "This is not a medical diagnosis"
    }}

    Question:
    {question}
    """

    return await generate_json_response(prompt)

