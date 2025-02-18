from django.db import models
from django.forms import DateTimeField
from mongoengine import Document, StringField, FloatField
from datetime import datetime 



class CryptoPrice(Document):
    name = StringField(required=True)
    symbol = StringField(required=True, unique=True)
    price = FloatField(required=True)
    timestamp = DateTimeField(default=datetime.now(datetime.timezone.utc))

    def to_json(self):
        return {
            "name": self.name,
            "symbol": self.symbol,
            "price": self.price,
            "timestamp": self.timestamp.isoformat()
        }
