from . import views
from django.urls import path

urlpatterns = [
    path('prices/', views.get_crypto_prices, name='get_crypto_prices'),

]
