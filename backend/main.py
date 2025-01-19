from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.database.connection import init_db, close_db
from app.resolvers.root import Query, Mutation
from strawberry.fastapi import GraphQLRouter
import strawberry

@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await close_db()

def create_app() -> FastAPI:
    app = FastAPI(
        root_path="/api",
        lifespan=lifespan
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:3000"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    schema = strawberry.Schema(query=Query, mutation=Mutation)
    app.include_router(GraphQLRouter(schema), prefix="/graphql")

    return app

app = create_app()