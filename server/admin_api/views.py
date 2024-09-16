from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, AdminLeaveRequestSerializer, UserLeaveSerializer
from django.contrib.auth import get_user_model
from accounts.models import LeaveRequest
from rest_framework import viewsets
from rest_framework import generics

User = get_user_model()

# Create your views here.
@api_view(['GET'])
def user_list(request):
    users = User.objects.filter(is_staff=False, is_superuser=False)
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def toggle_user_status(request, user_id):
    user = User.objects.get(id=user_id)
    user.is_active = not user.is_active  # Toggle active status
    user.save()
    return Response({'status': 'success', 'new_status': user.is_active})

class AdminLeaveRequestViewSet(viewsets.ModelViewSet):
    queryset = LeaveRequest.objects.all().order_by('-id')  # You can adjust the ordering
    serializer_class = AdminLeaveRequestSerializer

class UserLeaveReportView(generics.ListAPIView):
    serializer_class = UserLeaveSerializer

    def get_queryset(self):
        # Filter users who are admins
        return User.objects.filter(is_superuser=False)