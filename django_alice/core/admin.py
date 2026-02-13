from django.contrib import admin
from django.utils.html import format_html

from .models import (
    Category,
    Pet,
    VaccinationType,
    PetVaccination,
)


# -----------------------------
# Inline: Vaccinations inside Pet
# -----------------------------
class PetVaccinationInline(admin.TabularInline):
    model = PetVaccination
    extra = 1
    autocomplete_fields = ("vaccination",)
    verbose_name = "Vaccination"
    verbose_name_plural = "Vaccinations"


# -----------------------------
# Pet admin
# -----------------------------
@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = (
        "picture_preview",
        "name",
        "category",
        "owner_name",
        "birth_date",
    )

    list_filter = ("category","birth_date")
    search_fields = ("name", "owner_name")
    ordering = ("name","birth_date")

    inlines = [PetVaccinationInline]

    readonly_fields = ("created_at", "picture_preview")

    fieldsets = (
        ("Pet information", {
            "fields": ("name", "category", "birth_date")
        }),
        ("Owner", {
            "fields": ("owner_name",)
        }),
        ("Picture", {
            "fields": ("picture", "picture_preview")
        }),
        ("Metadata", {
            "fields": ("created_at",)
        }),
    )

    def picture_preview(self, obj):
        if obj.picture:
            return format_html(
                '<img src="{}" width="70" height="70" '
                'style="object-fit:cover; border-radius:6px;" />',
                obj.picture.url
            )
        return "No image"

    picture_preview.short_description = "Preview"


# -----------------------------
# Category admin
# -----------------------------
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name","description")
    search_fields = ("name",)
    verbose_name = "Category"
    verbose_name_plural = "Categories"

# -----------------------------
# Vaccination type admin
# -----------------------------
@admin.register(VaccinationType)
class VaccinationTypeAdmin(admin.ModelAdmin):
    list_display = ("name", "is_mandatory")
    list_filter = ("is_mandatory",)
    search_fields = ("name",)


# -----------------------------
# Pet vaccination admin
# -----------------------------
@admin.register(PetVaccination)
class PetVaccinationAdmin(admin.ModelAdmin):
    list_display = (
        "pet",
        "vaccination",
        "vaccination_date",
        "valid_until",
    )
    list_filter = ("vaccination",)
    search_fields = ("pet__name", "vaccination__name")
