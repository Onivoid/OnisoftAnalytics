import strawberry
from .user.queries import UserQueries
from .user.mutations import UserMutations

@strawberry.type
class Query(UserQueries):
    pass

@strawberry.type
class Mutation(UserMutations):
    pass