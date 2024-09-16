from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone

User = get_user_model()

class Profile(models.Model):
    ROLE_CHOICES = (
        ('employee', 'Employee'),
        ('admin', 'Admin')
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

    def __str__(self):
        return f'Profile of {self.user.email}'

class LeaveRequest(models.Model):
    LEAVE_TYPE_CHOICES = (
        ('casual', 'Casual Leave'),
        ('sick', 'Sick Leave'),
        ('other', 'Other')
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='leave_requests')
    leave_type = models.CharField(max_length=10, choices=LEAVE_TYPE_CHOICES)
    leave_date = models.DateField()
    reason = models.TextField()
    request_date = models.DateTimeField(default=timezone.now)

    admin_approved = models.BooleanField(default=False)
    reason_not_approved = models.TextField(null=True, blank=True)

    def __str__(self):
        return f'Leave request by {self.user.email} on {self.leave_date}'
