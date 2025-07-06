from rest_framework import serializers
from .models import House, HouseImage

class HouseImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = HouseImage
        fields = ['image_url']

class HouseSerializer(serializers.ModelSerializer):
    images = HouseImageSerializer(many=True, read_only=True)

    class Meta:
        model = House
        fields = [
            'id',
            'title',
            'address',
            'city',
            'country',
            'zip',
            'price',
            'beds',
            'baths',
            'description',
            'images',
        ]