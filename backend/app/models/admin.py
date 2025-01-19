from tortoise import Model, fields
from tortoise.signals import pre_save
import uuid
import bcrypt

class Role:
    SUPERADMIN = "SuperAdmin"
    ADMIN = "Admin"

    @classmethod
    def choices(cls):
        return [cls.SUPERADMIN, cls.ADMIN]


class Admin(Model):
    id = fields.UUIDField(pk=True, default=uuid.uuid4)
    username = fields.CharField(max_length=255, unique=True)
    password = fields.CharField(max_length=255)
    created_at = fields.DatetimeField(auto_now_add=True)
    role = fields.CharField(
        max_length=255, choices=Role.choices(), default=Role.ADMIN
    )

    class Meta:
        table = "admins"