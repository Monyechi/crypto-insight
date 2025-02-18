from . import views
from django.urls import path

urlpatterns = [
    path('fetch-prices/', views.fetch_crypto_prices, name='fetch_prices'),
    path('get-prices/', views.get_saved_prices, name='get_prices'),
    path('historical/<str:symbol>/', views.get_historical_prices, name='historical_prices'),
]
