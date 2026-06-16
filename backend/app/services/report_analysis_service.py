from app.services.gemini_service import model

def analyze_medical_report(
    report_text: str
):

    prompt = f"""
    You are MediCare AI.

    Analyze this medical report.

    Report:
    {report_text}

    Give:
    1. Summary
    2. Abnormal values
    3. Health risks
    4. Recommendations

    Keep medically safe.
    """

    response = model.generate_content(
        prompt
    )

    return response.text