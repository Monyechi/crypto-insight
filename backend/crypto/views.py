import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CryptoPrice

@api_view(['GET'])
def fetch_crypto_prices(request):
    url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    response = requests.get(url).json()

    # Save data to MongoDB
    for coin, data in response.items():
        CryptoPrice.objects(symbol=coin).update_one(
            set__name=coin.capitalize(),
            set__price=data["usd"],
            upsert=True
        )

    return Response({"message": "Prices updated!", "data": response})

@api_view(['GET'])
def get_saved_prices(request):
    prices = CryptoPrice.objects()
    return Response([crypto.to_json() for crypto in prices])
