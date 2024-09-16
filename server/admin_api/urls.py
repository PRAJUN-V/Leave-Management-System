from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from .views import AdminLeaveRequestViewSet, UserLeaveReportView

router = DefaultRouter()
router.register(r'admin_leave_requests', AdminLeaveRequestViewSet)

urlpatterns = [
    path('users/', views.user_list, name='user-list'),
    path('users/toggle-status/<int:user_id>/', views.toggle_user_status, name='toggle-user-status'),
    path('', include(router.urls)),
    path('user-leave-report/', UserLeaveReportView.as_view(), name='user_leave_report'),
]

