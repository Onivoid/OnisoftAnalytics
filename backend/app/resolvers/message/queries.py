import strawberry
from typing import List
from app.schemas.message import Message
from app.models.message import Message as MessageModel

@strawberry.type
class MessageQueries:
    @strawberry.field
    async def messages(self) -> List[Message]:
        db_messages = await MessageModel.all()
        return [Message(id=msg.id, content=msg.content) for msg in db_messages]