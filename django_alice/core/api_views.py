from rest_framework import viewsets, permissions
from rest_framework.exceptions import PermissionDenied
from .models import Category, Pet, PetVaccination, VaccinationType
from .serializers import (
    CategorySerializer,
    PetSerializer,
    PetVaccinationSerializer,
    VaccinationTypeSerializer,
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class VaccinationTypeViewSet(viewsets.ModelViewSet):
    queryset = VaccinationType.objects.all()
    serializer_class = VaccinationTypeSerializer


class PetViewSet(viewsets.ModelViewSet):
    serializer_class = PetSerializer

    def get_queryset(self):
        return (
            Pet.objects.filter(owner=self.request.user)
            .select_related("category", "owner")
            .prefetch_related("pet_vaccinations__vaccination")
        )

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class PetVaccinationViewSet(viewsets.ModelViewSet):
    serializer_class = PetVaccinationSerializer

    def _get_pet(self):
        pet = Pet.objects.filter(pk=self.kwargs["pet_pk"]).first()
        if pet is None:
            from rest_framework.exceptions import NotFound
            raise NotFound("Pet not found.")
        if pet.owner != self.request.user:
            raise PermissionDenied("You do not own this pet.")
        return pet

    def get_queryset(self):
        return PetVaccination.objects.filter(
            pet=self._get_pet()
        ).select_related("vaccination")

    def perform_create(self, serializer):
        serializer.save(pet=self._get_pet())
