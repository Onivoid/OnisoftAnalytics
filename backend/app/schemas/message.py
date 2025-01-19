import strawberry

@strawberry.type
class Message:
    id: int
    content: str