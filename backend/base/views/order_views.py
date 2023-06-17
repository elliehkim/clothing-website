#! /usr/bin/env python3.6
from django.conf import settings
from rest_framework.decorators import api_view, permission_classes

import json
import stripe

from base.models import Product
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


# This is your test secret API key.
stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
def create_payment(request):
    # Retrieve the total amount from the request
    body = request.body.decode('utf-8')
    print(body)
    data = json.loads(body)
    print(data)
    amount = data.get('amount')
    print(amount)  # or any other method to get the amount

    # Create a payment intent on Stripe
    intent = stripe.PaymentIntent.create(
        amount=int(amount),
        currency='nzd'
    )

    # Return the client secret (used in the frontend)
    return JsonResponse({
        'clientSecret': intent.client_secret
    })