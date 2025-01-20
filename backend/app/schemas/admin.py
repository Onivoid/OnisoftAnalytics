import strawberry
import uuid
from typing import List


@strawberry.type
class Admin:
    id: uuid.UUID
    username: str
    password: str
    role: str


@strawberry.type
class AdminAuthenticated:
    id: uuid.UUID
    username: str
    role: str


@strawberry.type
class AdminAuthenticatedList:
    admins: List[AdminAuthenticated]
