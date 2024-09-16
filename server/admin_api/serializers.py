from django.contrib.auth import get_user_model
from accounts.models import LeaveRequest

User = get_user_model()

from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'is_active']

class AdminLeaveRequestSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Include user details using UserSerializer

    class Meta:
        model = LeaveRequest
        fields = [
            'id',                # ID of the leave request
            'user',              # User details (nested serializer)
            'leave_type',        # Type of leave (e.g., casual, sick)
            'leave_date',        # Date of the leave
            'reason',            # Reason for leave
            'request_date',      # Date when the request was made
            'admin_approved',    # Boolean indicating if the leave was approved by admin
            'reason_not_approved' # Reason why the leave was not approved by admin
        ]

    def update(self, instance, validated_data):
        """
        Override the update method to handle admin-specific updates.
        """
        instance.leave_type = validated_data.get('leave_type', instance.leave_type)
        instance.leave_date = validated_data.get('leave_date', instance.leave_date)
        instance.reason = validated_data.get('reason', instance.reason)
        instance.admin_approved = validated_data.get('admin_approved', instance.admin_approved)
        instance.reason_not_approved = validated_data.get('reason_not_approved', instance.reason_not_approved)
        instance.save()
        return instance
    

class UserLeaveSerializer(serializers.ModelSerializer):
    num_sick_leave = serializers.SerializerMethodField()
    num_casual_leave = serializers.SerializerMethodField()
    num_other_leave = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['first_name','last_name', 'email', 'num_sick_leave', 'num_casual_leave', 'num_other_leave']

    def get_num_sick_leave(self, obj):
        return LeaveRequest.objects.filter(user=obj, leave_type='sick').count()

    def get_num_casual_leave(self, obj):
        return LeaveRequest.objects.filter(user=obj, leave_type='casual').count()

    def get_num_other_leave(self, obj):
        return LeaveRequest.objects.filter(user=obj, leave_type='other').count()