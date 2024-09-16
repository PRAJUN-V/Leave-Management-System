# urls.py
from django.urls import path
from .views import LeaveRequestView, UserLeaveRequestsView

urlpatterns = [
    path('leave-request/<int:user_id>/', LeaveRequestView.as_view(), name='leave-request-create'),
    path('leave_status/<int:user_id>/', UserLeaveRequestsView.as_view(), name='user-leave-requests'),
]
