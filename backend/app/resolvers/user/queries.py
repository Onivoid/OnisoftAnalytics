import strawberry
from typing import List
from app.schemas.user import User
from app.models.user import User as UserModel


@strawberry.type
class UserQueries:
    @strawberry.field
    async def users(self) -> List[User]:
        db_users = await UserModel.all()
        return [User(id=user.id, created_at=user.created_at) for user in db_users]
