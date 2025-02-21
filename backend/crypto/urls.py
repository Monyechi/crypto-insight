from django.urls import path
from . import views

app_name = "crypto"

urlpatterns = [

    # Authentication URLs
    path("auth/login/", views.login_user, name="login_user"),
    path("auth/protected/", views.protected_view, name="protected_view"),
    path("auth/register/", views.register_user, name="register_user"),

    # Crypto Prices URLs
    path('fetch-prices/', views.fetch_crypto_prices, name='fetch_prices'),
    path('get-prices/', views.get_saved_prices, name='get_prices'),
    path('historical/<str:symbol>/', views.get_historical_prices, name='historical_prices'),

    # Portfolio URLs
    path("portfolio/add/", views.add_holding, name="add_holding"),
    path("portfolio/", views.get_portfolio, name="get_portfolio"),
    path("portfolio/value/<str:user_id>/", views.get_portfolio_value, name="get_portfolio_value"),
    
]
