from django.db import models
from mongoengine import Document, StringField, FloatField


class CryptoPrice(Document):
    name = StringField(required=True)
    symbol = StringField(required=True, unique=True)
    price = FloatField(required=True)

    def to_json(self):
        return {
            "name": self.name,
            "symbol": self.symbol,
            "price": self.price
        }
