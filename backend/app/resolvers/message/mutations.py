import strawberry
from app.schemas.message import Message
from app.models.message import Message as MessageModel

@strawberry.input
class MessageInput:
    content: str = strawberry.field(description="Contenu du message")

@strawberry.type
class MessageMutations:
    @strawberry.mutation
    async def create_message(self, message: MessageInput) -> Message:
        """Crée un nouveau message."""
        db_message = await MessageModel.create(content=message.content)
        return Message(id=db_message.id, content=db_message.content)