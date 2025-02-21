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

class Portfolio(Document):
    user_id = StringField(required=True)
    symbol = StringField(required=True)
    amount = FloatField(required=True)
    price_paid = FloatField(required=True) 
    timestamp = DateTimeField(default=datetime.utcnow)

    def to_json(self):
        return {
            "user_id": self.user_id,
            "symbol": self.symbol,
            "amount": self.amount,
            "price_paid": self.price_paid,  # <--- new field
            "timestamp": self.timestamp.isoformat(),
        }

        