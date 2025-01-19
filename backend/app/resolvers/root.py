import strawberry
from .message.queries import MessageQueries
from .message.mutations import MessageMutations

@strawberry.type
class Query(MessageQueries):
    pass

@strawberry.type
class Mutation(MessageMutations):
    pass