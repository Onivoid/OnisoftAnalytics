import strawberry
from app.schemas.admin import AdminAuthenticated
from tortoise.exceptions import DoesNotExist
from app.models.admin import Admin as AdminModel, Role
from datetime import datetime, timedelta
import jwt
from typing import Union
from app.types.error import Error, Success
import bcrypt
import os
from fastapi.requests import HTTPConnection
from app.utils.jwt_utils import verify_token
import uuid

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


@strawberry.type
class AdminMutations:
    @strawberry.mutation
    async def createAdmin(
        self, info: strawberry.Private, username: str, password: str
    ) -> Union[AdminAuthenticated, Error]:
        request: HTTPConnection = info.context["request"]
        token = request.cookies.get("token")
        payload = verify_token(token)
        if isinstance(payload, str):
            return Error(message=payload)
        if payload["role"] != Role.SUPERADMIN or not payload["role"]:
            return Error(message="Unauthorized")
        try:
            hashed_pw = bcrypt.hashpw(
                password.encode("utf8"), bcrypt.gensalt()
            ).decode()
            new_admin = await AdminModel.create(username=username, password=hashed_pw)
            return AdminAuthenticated(
                id=new_admin.id, username=new_admin.username, role=new_admin.role
            )
        except Exception as e:
            return Error(message=str(e))

    @strawberry.mutation
    async def login(
        self, info, username: str, password: str
    ) -> Union[AdminAuthenticated, Error]:
        try:
            admin = await AdminModel.get(username=username)
            if bcrypt.checkpw(password.encode("utf8"), admin.password.encode("utf8")):
                payload = {
                    "username": admin.username,
                    "role": admin.role,
                    "exp": datetime.now() + timedelta(days=1),
                }
                token = jwt.encode(payload=payload, key=SECRET_KEY, algorithm=ALGORITHM)
                info.context["response"].set_cookie(key="token", value=token)

                return AdminAuthenticated(
                    id=admin.id, username=admin.username, role=admin.role
                )
            else:
                return Error(message="Invalid password")
        except DoesNotExist:
            return Error(message="User not found")

    @strawberry.mutation
    async def me(self, info: strawberry.Private) -> Union[AdminAuthenticated, Error]:
        request: HTTPConnection = info.context["request"]
        token = request.cookies.get("token")
        payload = verify_token(token)
        if isinstance(payload, str):
            return Error(message=payload)
        try:
            admin = await AdminModel.get(username=payload["username"])
            return AdminAuthenticated(
                id=admin.id, username=admin.username, role=admin.role
            )
        except DoesNotExist:
            return Error(message="Admin not found")
        except Exception as e:
            return Error(message=str(e))

    @strawberry.mutation
    async def logout(self, info: strawberry.Private) -> bool:
        info.context["response"].delete_cookie("token")
        return True

    @strawberry.mutation
    async def deleteAdmin(
        self, info: strawberry.Private, id: uuid.UUID
    ) -> Union[Success, Error]:
        request: HTTPConnection = info.context["request"]
        token = request.cookies.get("token")
        payload = verify_token(token)
        if isinstance(payload, str):
            return Error(message=payload)
        if payload["role"] != Role.SUPERADMIN or not payload["role"]:
            return Error(message="Unauthorized")
        try:
            admin_to_delete = await AdminModel.get(id=id)
            if admin_to_delete.role == Role.SUPERADMIN:
                return Error(message="Cannot delete superadmin")
            await admin_to_delete.delete()
            return Success(message="Admin Deleted")
        except DoesNotExist:
            return Error(message="Admin not found")
        except Exception as e:
            return Error(message=str(e))
