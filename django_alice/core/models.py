from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class VaccinationType(models.Model):
    """
    Catalog of possible vaccinations (Rabies, Parvo, etc.)
    """
    name = models.CharField(max_length=100, unique=True)
    is_mandatory = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Pet(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(
        Category,
        on_delete=models.PROTECT,
        related_name="pets"
    )
    picture = models.ImageField(upload_to='pets/', blank=True, null=True)
    birth_date = models.DateField(null=True, blank=True)
    owner_name = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    vaccinations = models.ManyToManyField(
        VaccinationType,
        through="PetVaccination",
        related_name="pets",
        blank=True
    )

    def __str__(self):
        return self.name


class PetVaccination(models.Model):
    """
    Join table: which pet has which vaccination + dates
    """
    pet = models.ForeignKey(
        Pet,
        on_delete=models.CASCADE,
        related_name="pet_vaccinations"
    )
    vaccination = models.ForeignKey(
        VaccinationType,
        on_delete=models.CASCADE
    )
    vaccination_date = models.DateField(null=True, blank=True)
    valid_until = models.DateField(null=True, blank=True)

    class Meta:
        unique_together = ("pet", "vaccination")

    def __str__(self):
        return f"{self.pet} - {self.vaccination}"
