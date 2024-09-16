from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from .serializers import LeaveRequestSerializer
from django.contrib.auth import get_user_model
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from accounts.models import LeaveRequest
from .serializers import LeaveStatusSerializer

User = get_user_model()

class LeaveRequestView(APIView):
    def post(self, request, user_id):
        # Check if the user exists
        if not User.objects.filter(id=user_id).exists():
            raise NotFound("User with this ID does not exist.")

        # Add user_id to the request data directly
        data = request.data.copy()  # Create a mutable copy of request.data
        data['user_id'] = user_id

        serializer = LeaveRequestSerializer(data=data)
        if serializer.is_valid():
            serializer.save()  # Calls the create method in the serializer
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserLeaveRequestsView(generics.ListAPIView):
    serializer_class = LeaveStatusSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user_id = self.kwargs['user_id']
        return LeaveRequest.objects.filter(user__id=user_id)
