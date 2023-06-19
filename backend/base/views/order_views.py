#! /usr/bin/env python3.6
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

import json
import stripe

from base.models import Product,Order,OrderItem,ShippingAddress
from base.serializers import OrderSerializer



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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    user = request.user
    data = request.data
    orderItems = data['orderItems']

    if orderItems and len(orderItems)==0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # Create Order
        order = Order.objects.create(
            user= user,
            shippingPrice= data['shippingPrice'],
            totalPrice= data['totalPrice']
        )

        # Create Shipping
        shipping = ShippingAddress.objects.create(
            order= order,
            address= data['shippingAddress']['address'],
            city= data['shippingAddress']['city'],
            postcode= data['shippingAddress']['postcode']
        )

        # Create orderItems
        for i in orderItems:
            product = Product.objects.get(_id=i['product'])

            item = OrderItem.objects.create(
                product= product,
                order= order,
                name= product.name,
                qty= i['qty'],
                price= i['price'],
                image= product.image.url,
            )

            # Update stock
            product.countInStock -= item.qty
            product.save()
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer= OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request,pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail':'Not Authorized'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail':'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)
