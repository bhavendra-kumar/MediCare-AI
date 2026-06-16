def serialize_document(doc):

    doc["_id"] = str(doc["_id"])

    return doc

def serialize_list(data):

    return [
        serialize_document(item)

        for item in data
    ]

    