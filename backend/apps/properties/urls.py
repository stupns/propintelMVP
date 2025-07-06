from django.urls import path
from .views import HouseListAPIView

urlpatterns = [
    path('houses/', HouseListAPIView.as_view(), name='house-list'),
]