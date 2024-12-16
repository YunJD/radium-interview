from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        read_only_fields = ["created_on"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance.name = validated_data.get("name", instance.name)
        instance.date_of_birth = validated_data.get(
            "date_of_birth", instance.date_of_birth
        )
        instance.save()
        return instance
