from rest_framework import serializers
from accounts.models import LeaveRequest
from django.contrib.auth import get_user_model
from rest_framework.exceptions import ValidationError

User = get_user_model()

class LeaveRequestSerializer(serializers.ModelSerializer):
    user_id = serializers.IntegerField(write_only=True)

    class Meta:
        model = LeaveRequest
        fields = ['user_id', 'leave_type', 'leave_date', 'reason', 'request_date']

    def validate_user_id(self, value):
        if not User.objects.filter(id=value).exists():
            raise ValidationError("User with this ID does not exist.")
        return value

    def create(self, validated_data):
        user_id = validated_data.pop('user_id')
        user = User.objects.get(id=user_id)
        leave_request = LeaveRequest.objects.create(user=user, **validated_data)
        return leave_request
    
class LeaveStatusSerializer(serializers.ModelSerializer):
    leave_status = serializers.SerializerMethodField()

    class Meta:
        model = LeaveRequest
        fields = ['id', 'leave_type', 'leave_date', 'reason', 'request_date', 'leave_status', 'reason_not_approved']

    def get_leave_status(self, obj):
        if obj.admin_approved:
            return 'Approved'
        elif obj.reason_not_approved:
            return f'Not Approved'
        else:
            return 'Pending Approval'
