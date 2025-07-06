import json
import os
from django.core.management.base import BaseCommand
from apps.properties.models import House, Amenity, Neighborhood, HouseImage
from django.conf import settings

class Command(BaseCommand):
    help = "Import properties from JSON file"

    def handle(self, *args, **options):
        file_path = os.path.join(settings.BASE_DIR, 'data', 'dataset.json')

        if not os.path.exists(file_path):
            self.stderr.write(self.style.ERROR(f"❌ File not found: {file_path}"))
            return

        with open(file_path, 'r') as f:
            data = json.load(f)

        for i, entry in enumerate(data):
            try:
                address_data = entry.get("address", {})
                if isinstance(address_data, dict):
                    full_address = address_data.get("streetAddress", "")
                    city = address_data.get("city", "Unknown city")
                    zip_code = address_data.get("zipcode", "")
                else:
                    full_address = address_data or "Unknown address"
                    city = entry.get("city", "Unknown city")
                    zip_code = entry.get("zipcode", "")

                house = House.objects.create(
                    address=full_address,
                    city=city,
                    country="USA",
                    zip=zip_code,
                    price=entry.get("price", 0) or 0,
                    beds=entry.get("bedrooms", 0) or 0,
                    baths=entry.get("bathrooms", 0) or 0,
                    title=entry.get("title", "") or full_address,
                    description=entry.get("description", "") or "No description provided",
                )

                for a in entry.get("amenities", []) or []:
                    if a:
                        amenity, _ = Amenity.objects.get_or_create(description=a)
                        house.amenities.add(amenity)

                for n in entry.get("neighborhood", []) or []:
                    if n:
                        neighborhood, _ = Neighborhood.objects.get_or_create(description=n)
                        house.neighborhood.add(neighborhood)

                # ✅ Add one image with width=1536 from responsivePhotos
                photo_url = None
                for photo in entry.get("responsivePhotos", []):
                    jpeg_sources = photo.get("mixedSources", {}).get("jpeg", [])
                    for variant in jpeg_sources:
                        if variant.get("width") == 1536:
                            photo_url = variant.get("url")
                            break
                    if photo_url:
                        break

                if photo_url:
                    HouseImage.objects.create(house=house, image_url=photo_url)

                self.stdout.write(f"✔ Imported house #{i + 1}: {house.title}")

            except Exception as e:
                self.stderr.write(self.style.ERROR(f"❌ Failed to import entry #{i + 1}: {e}"))

        self.stdout.write(self.style.SUCCESS("✅ All available properties imported."))