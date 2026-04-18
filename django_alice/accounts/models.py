from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Override email to make it required/unique (optional but recommended)
    email = models.EmailField(unique=True)

    # Your extra fields
    photo = models.ImageField(upload_to="users/", null=True, blank=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.username