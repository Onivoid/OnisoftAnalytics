from tortoise import Model, fields
import uuid


class User(Model):
    id = fields.UUIDField(pk=True, default=uuid.uuid4)
    created_at = fields.DatetimeField(auto_now_add=True)

    class Meta:
        table = "users"
