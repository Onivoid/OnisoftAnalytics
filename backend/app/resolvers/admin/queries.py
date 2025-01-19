import strawberry
from app.schemas.admin import AdminAuthenticated, AdminAuthenticatedList
from app.models.admin import Admin as AdminModel
from fastapi.requests import HTTPConnection
from app.utils.jwt_utils import verify_token
from typing import Union, List
from app.types.error import Error
import os

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

@strawberry.type
class AdminQueries:
    @strawberry.field
    async def getAdmins(self, info: strawberry.Private) -> Union[AdminAuthenticatedList, Error]:
        request: HTTPConnection = info.context["request"]
        token = request.cookies.get("token")
        payload = verify_token(token)
        if isinstance(payload, str):
            return Error(message=payload)
        try:
            admins = await AdminModel.all()
            return AdminAuthenticatedList(admins=[AdminAuthenticated(id=admin.id, username=admin.username, role=admin.role) for admin in admins])
        except Exception as e:
            return Error(message=str(e))