from django.urls import path, re_path
from base.views import order_views as views



urlpatterns = [
    path('create_payment_intent/', views.create_payment, name='create_payment_intent')
]