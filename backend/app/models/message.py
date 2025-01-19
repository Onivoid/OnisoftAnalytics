from tortoise import Model, fields

class Message(Model):
    id = fields.IntField(pk=True)
    content = fields.TextField()

    class Meta:
        table = "messages"