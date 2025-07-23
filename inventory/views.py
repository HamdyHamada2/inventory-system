from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth.models import User

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all().order_by('-created_at')
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
