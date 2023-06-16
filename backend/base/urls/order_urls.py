from django.urls import path, re_path
from base.views import order_views as views


urlpatterns = [
    re_path(r'^test-payment/$', views.test_payment),
]