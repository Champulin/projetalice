from rest_framework import serializers
from .models import (
    Category,
    Pet,
    VaccinationType,
    PetVaccination,
)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class VaccinationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = VaccinationType
        fields = "__all__"


class PetVaccinationSerializer(serializers.ModelSerializer):
    vaccination = VaccinationTypeSerializer(read_only=True)
    vaccination_id = serializers.PrimaryKeyRelatedField(
        queryset=VaccinationType.objects.all(),
        source="vaccination",
        write_only=True,
    )

    class Meta:
        model = PetVaccination
        fields = (
            "id",
            "vaccination",
            "vaccination_id",
            "vaccination_date",
            "valid_until",
        )


class PetSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True,
    )
    vaccinations = PetVaccinationSerializer(
        source="pet_vaccinations",
        many=True,
        read_only=True,
    )
    owner_username = serializers.CharField(source="owner.username", read_only=True)
    picture = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Pet
        fields = (
            "id",
            "name",
            "category",
            "category_id",
            "birth_date",
            "owner_username",
            "picture",
            "vaccinations",
            "created_at",
        )
        read_only_fields = ("created_at",)
