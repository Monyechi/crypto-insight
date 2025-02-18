import requests
from celery import shared_task
from .models import CryptoPrice
from datetime import datetime

@shared_task
def fetch_crypto_prices_task():
    url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    response = requests.get(url).json()

    for coin, data in response.items():
        CryptoPrice.objects(symbol=coin).update_one(
            set__name=coin.capitalize(),
            set__price=data["usd"],
            set__timestamp=datetime.utcnow(),  # Update timestamp
            upsert=True  # Create new if it doesn't exist
        )

    return "Crypto Prices Updated!"
