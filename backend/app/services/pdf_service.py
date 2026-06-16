import fitz

def extract_pdf_text(
    pdf_path: str
):

    document = fitz.open(pdf_path)

    extracted_text = ""

    for page in document:

        extracted_text += (
            page.get_text()
        )

    return extracted_text