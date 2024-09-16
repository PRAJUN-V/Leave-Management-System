from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile

from django.contrib.auth import get_user_model

User = get_user_model()

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, id=instance.id)  # Explicitly set Profile id to User id
    instance.profile.save()