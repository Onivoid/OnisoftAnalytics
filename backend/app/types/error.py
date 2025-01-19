import strawberry


@strawberry.type
class Error:
    message: str

@strawberry.type
class Success:
    message: str