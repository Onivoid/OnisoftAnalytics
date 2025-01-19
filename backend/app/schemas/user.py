import strawberry
import uuid
from datetime import datetime

@strawberry.type
class User:
    id: uuid.UUID
    created_at: datetime