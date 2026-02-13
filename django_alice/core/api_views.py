from rest_framework import viewsets
from .models import Category, Pet, VaccinationType
from .serializers import (
    CategorySerializer,
    PetSerializer,
    VaccinationTypeSerializer,
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class VaccinationTypeViewSet(viewsets.ModelViewSet):
    queryset = VaccinationType.objects.all()
    serializer_class = VaccinationTypeSerializer


class PetViewSet(viewsets.ModelViewSet):
    queryset = Pet.objects.all().prefetch_related(
        "pet_vaccinations__vaccination"
    )
    serializer_class = PetSerializer
