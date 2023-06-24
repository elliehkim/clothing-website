from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from base.models import Product
from base.serializers import ProductSerializer

@api_view(['GET'])
@permission_classes([])
def getProducts(request):
    query_params = request.query_params
    query = query_params.get('keyword')
    print(query_params, query)
    if query is None or query.lower() == 'null':
        products= Product.objects.all()
    else:
        products = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)