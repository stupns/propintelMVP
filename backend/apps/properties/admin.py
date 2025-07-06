# backend/apps/properties/admin.py

from django.contrib import admin
from .models import House, HouseImage, Neighborhood, Amenity

class HouseImageInline(admin.TabularInline):
    model = HouseImage
    extra = 1

@admin.register(House)
class HouseAdmin(admin.ModelAdmin):
    inlines = [HouseImageInline]
    list_display = ('title', 'city', 'price')
    search_fields = ('title', 'address')

admin.site.register(Neighborhood)
admin.site.register(Amenity)