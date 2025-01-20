from tortoise import Tortoise
import os
from app.models.admin import Admin as AdminModel, Role
import bcrypt

DB_USER = os.getenv("POSTGRES_USER")
DB_PASSWORD = os.getenv("POSTGRES_PASSWORD")
DB_NAME = os.getenv("POSTGRES_DB")
DB_HOST = os.getenv("DB_HOST", "db")
DB_PORT = os.getenv("DB_PORT", "5432")

DATABASE_URL = f"postgres://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")


async def init_db():
    await Tortoise.init(
        db_url=DATABASE_URL,
        modules={"models": ["app.models.user", "app.models.admin"]},
    )
    await Tortoise.generate_schemas()
    await init_admin()


async def close_db():
    await Tortoise.close_connections()


async def init_admin():
    exists = await AdminModel.filter(username=ADMIN_USERNAME).exists()
    if not exists:
        hashed_pw = bcrypt.hashpw(
            ADMIN_PASSWORD.encode("utf-8"), bcrypt.gensalt()
        ).decode()
        await AdminModel.create(
            username=ADMIN_USERNAME, password=hashed_pw, role=Role.SUPERADMIN
        )
