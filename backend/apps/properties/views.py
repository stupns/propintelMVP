from rest_framework import generics
from .models import House
from .serializers import HouseSerializer

class HouseListAPIView(generics.ListAPIView):
    queryset = House.objects.all()
    serializer_class = HouseSerializer