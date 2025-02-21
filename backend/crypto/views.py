import requests
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import CryptoPrice, Portfolio
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken


@api_view(["GET"])
def fetch_crypto_prices(request):
    url = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd"
    response = requests.get(url).json()

    # Save data to MongoDB
    for coin, data in response.items():
        CryptoPrice.objects(symbol=coin).update_one(
            set__name=coin.capitalize(), set__price=data["usd"], upsert=True
        )

    return Response({"message": "Prices updated!", "data": response})


@api_view(["GET"])
def get_saved_prices(request):
    prices = list(CryptoPrice.objects())  # Force DB fetch
    return JsonResponse([crypto.to_json() for crypto in prices], safe=False)


def get_historical_prices(request, symbol):
    # Fetch the last 50 price records for the given cryptocurrency
    prices = CryptoPrice.objects(symbol=symbol).order_by("-timestamp")[:50]

    return JsonResponse([crypto.to_json() for crypto in prices], safe=False)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_holding(request):
    symbol = request.data.get("symbol")
    amount = request.data.get("amount")

    if not symbol or not amount:
        return JsonResponse({"error": "Missing data"}, status=400)

    # Use the authenticated user's ID
    user_id = str(request.user.id)

    Portfolio(user_id=user_id, symbol=symbol, amount=float(amount)).save()
    return JsonResponse({"message": "Holding added successfully!"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_portfolio(request):
    user_id = str(request.user.id)
    holdings = Portfolio.objects(user_id=user_id)
    return JsonResponse([h.to_json() for h in holdings], safe=False)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_portfolio_value(request):
    user_id = str(request.user.id)
    holdings = Portfolio.objects(user_id=user_id)
    ...


@api_view(["POST"])
def register_user(request):
    """Register a new user"""
    username = request.data.get("username")
    password = request.data.get("password")

    if not username or not password:
        return Response({"error": "Username and password required"}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists"}, status=400)

    user = User.objects.create_user(username=username, password=password)
    return Response({"message": "User registered successfully!"})


@api_view(["POST"])
def login_user(request):
    """Authenticate user and return JWT token"""
    username = request.data.get("username")
    password = request.data.get("password")

    from django.contrib.auth import authenticate

    user = authenticate(username=username, password=password)
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({"access": str(refresh.access_token), "refresh": str(refresh)})
    return Response({"error": "Invalid credentials"}, status=400)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def protected_view(request):
    """Example protected endpoint"""
    return Response({"message": f"Hello, {request.user.username}!"})
