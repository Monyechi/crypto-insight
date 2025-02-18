from mongoengine import Document, StringField, FloatField, DateTimeField 
from datetime import datetime

class CryptoPrice(Document):
    name = StringField(required=True)
    symbol = StringField(required=True)
    price = FloatField(required=True)
    timestamp = DateTimeField(default=datetime.utcnow) 

    def to_json(self):
        return {
            "name": self.name,
            "symbol": self.symbol,
            "price": self.price,
            "timestamp": self.timestamp.isoformat()
        }
