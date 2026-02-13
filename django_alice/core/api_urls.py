from rest_framework.routers import DefaultRouter
from .api_views import (
    CategoryViewSet,
    PetViewSet,
    VaccinationTypeViewSet,
)

router = DefaultRouter()
router.register("categories", CategoryViewSet)
router.register("pets", PetViewSet)
router.register("vaccinations", VaccinationTypeViewSet)

urlpatterns = router.urls
