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
    user_id = StringField(required=True)  # User identifier (could be a UUID or email)
    symbol = StringField(required=True)  # Crypto symbol (e.g., "bitcoin")
    amount = FloatField(required=True)  # How much of the crypto user owns
    timestamp = DateTimeField(default=datetime.utcnow)  # When it was added

    def to_json(self):
        return {
            "user_id": self.user_id,
            "symbol": self.symbol,
            "amount": self.amount,
            "timestamp": self.timestamp.isoformat(),
        }