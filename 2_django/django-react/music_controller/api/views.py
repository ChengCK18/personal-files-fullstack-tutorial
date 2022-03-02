'''
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def main(request):
    return HttpResponse("<h1>Konnichiwa</h1>")
'''


from django.shortcuts import render
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

# A view that is already setup to return model content


# class RoomView(generics.CreateAPIView): #this is for post request
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
