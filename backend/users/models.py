from django.db import models


class User(models.Model):
    name = models.CharField(max_length=100, unique=True)
    date_of_birth = models.DateField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
