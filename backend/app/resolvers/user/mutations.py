import strawberry
from app.schemas.user import User
from app.models.user import User as UserModel

@strawberry.type
class UserMutations:
    @strawberry.mutation
    async def create_user(self) -> User:
        db_user = await UserModel.create()
        return User(
            id=db_user.id,
            created_at=db_user.created_at
        )