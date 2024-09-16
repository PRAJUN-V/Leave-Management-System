from django.contrib.auth import get_user_model
from .models import Profile
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["role"]

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "password", "email", "profile"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        profile_data = validated_data.pop('profile', {})
        
        # Create the user
        user = User.objects.create_user(**validated_data)
        # Create or update the profile
        if profile_data:
            Profile.objects.update_or_create(user=user, defaults=profile_data)
        
        return user
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add specific claims to the token
        token['id'] = user.id
        token['role'] = user.profile.role
        token['is_active'] = user.is_active

        return token
    
class UserStatusSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=True)

    class Meta:
        model = User
        fields = ["is_active", "profile"]