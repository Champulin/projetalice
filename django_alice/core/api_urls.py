from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .api_views import (
    CategoryViewSet,
    PetViewSet,
    PetVaccinationViewSet,
    VaccinationTypeViewSet,
)

router = DefaultRouter()
router.register("categories", CategoryViewSet, basename="category")
router.register("pets", PetViewSet, basename="pet")
router.register("vaccinations", VaccinationTypeViewSet, basename="vaccinationtype")

urlpatterns = [
    path("", include(router.urls)),
    path(
        "pets/<int:pet_pk>/vaccinations/",
        PetVaccinationViewSet.as_view({"get": "list", "post": "create"}),
        name="pet-vaccinations-list",
    ),
    path(
        "pets/<int:pet_pk>/vaccinations/<int:pk>/",
        PetVaccinationViewSet.as_view({
            "get": "retrieve",
            "put": "update",
            "patch": "partial_update",
            "delete": "destroy",
        }),
        name="pet-vaccinations-detail",
    ),
]
