import requests
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CryptoPrice
from django.http import JsonResponse

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
    prices = list(CryptoPrice.objects())  # Force DB fetch
    return JsonResponse([crypto.to_json() for crypto in prices], safe=False)

def get_historical_prices(request, symbol):
    # Fetch the last 50 price records for the given cryptocurrency
    prices = CryptoPrice.objects(symbol=symbol).order_by("-timestamp")[:50]

    return JsonResponse([crypto.to_json() for crypto in prices], safe=False)
