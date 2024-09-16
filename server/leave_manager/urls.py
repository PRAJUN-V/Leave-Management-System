from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/',include('accounts.urls')),
    path('api/admin/', include('admin_api.urls')),
    path('api/employee/', include('employee_api.urls')),
]
