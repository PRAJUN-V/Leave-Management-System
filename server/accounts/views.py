from django.contrib.auth import get_user_model
from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer, UserStatusSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from rest_framework import status
from django.conf import settings

User = get_user_model()

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
    # Save the user to the database
        user = serializer.save()
        
        # Get the email, first_name, last_name, and password from the validated data
        email = serializer.validated_data['email']
        first_name = serializer.validated_data.get('first_name', '')
        last_name = serializer.validated_data.get('last_name', '')
        password = self.request.data.get('password')

        # Sending email to the registered user
        send_mail(
            subject="Registration Successful - Leave Management System",
            message=f"Dear {first_name} {last_name},\n\nYour registration in the Leave Management System is successful. You can now login using the following credentials:\n\nEmail: {email}\nPassword: {password}\n\nPlease keep this information safe.\n\nThank you,\nThe Admin Team",
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            fail_silently=False,
        )
        
        # Optionally, you can return a success response manually
        return Response({"message": "User created and email sent successfully."}, status=status.HTTP_201_CREATED)

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserStatusSerializer(user)
        return Response(serializer.data)