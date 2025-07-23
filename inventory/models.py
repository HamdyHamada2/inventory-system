import os
from uuid import uuid4
from django.db import models

def product_image_upload_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid4().hex}.{ext}"  # اسم فريد بدون رموز أو فراغات
    return os.path.join('product_images/', filename)

class Product(models.Model):
    name = models.CharField(max_length=255)
    barcode = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    min_quantity_alert = models.PositiveIntegerField(default=5)
    image = models.ImageField(upload_to=product_image_upload_path, null=True, blank=True)  # ✅ تم التعديل هنا
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
