'''
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def main(request):
    return HttpResponse("<h1>Konnichiwa</h1>")
'''


from django.shortcuts import render
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response


# A view that is already setup to return model content


# class RoomView(generics.CreateAPIView): #this is for post request
class RoomView(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

# APIView base class allows you to overwrite existing default method(eg: get, post, et cetera)


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def get(self, request):
        # do something with 'GET' method
        return Response()

    def post(self, request, format=None):
        # check if current user have active session with server
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()  # create a session if it does not have an active one

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():  # if the " fields = ('guest_can_pause', 'votes_to_skip') are valid"
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.save(update_fields=['guest_can_pause', 'votes_to_skip'])
                # Serialize the created room object. '.data' gives the data in JSON format
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause,
                            votes_to_skip=votes_to_skip)
                room.save()
                return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid Data...'}, status=status.HTTP_400_BAD_REQUEST)
