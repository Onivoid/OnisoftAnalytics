import strawberry
from .user.queries import UserQueries
from .user.mutations import UserMutations
from .admin.mutations import AdminMutations
from .admin.queries import AdminQueries

@strawberry.type
class Query(
        UserQueries,
        AdminQueries
    ):
    pass

@strawberry.type
class Mutation(
        UserMutations,
        AdminMutations
    ):
    pass