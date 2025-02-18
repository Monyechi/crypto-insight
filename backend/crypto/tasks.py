import requests
from celery import shared_task
from .models import CryptoPrice
from datetime import datetime

@shared_task
def fetch_crypto_prices_task():
    url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    response = requests.get(url).json()

    for coin, data in response.items():
        CryptoPrice(
            name=coin.capitalize(),
            symbol=coin,
            price=data["usd"],
            timestamp=datetime.now(datetime.timezone.utc)
        ).save()  # Save new price instead of overwriting

    return "Crypto Prices Updated!"
