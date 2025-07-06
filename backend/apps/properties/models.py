from django.db import models

class Neighborhood(models.Model):
    description = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.description

class Amenity(models.Model):
    description = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.description

class House(models.Model):
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100, blank=True, null=True)
    zip = models.CharField(max_length=20, blank=True, null=True)

    price = models.DecimalField(max_digits=12, decimal_places=2)
    beds = models.IntegerField(blank=True, null=True)
    baths = models.DecimalField(max_digits=4, decimal_places=1, blank=True, null=True)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    neighborhood = models.ManyToManyField(Neighborhood, blank=True)
    amenities = models.ManyToManyField(Amenity, blank=True)

    def __str__(self):
        return f"{self.title} – {self.city or ''}"

class HouseImage(models.Model):
    house = models.ForeignKey(House, related_name='images', on_delete=models.CASCADE)
    image_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"Image for {self.house}"