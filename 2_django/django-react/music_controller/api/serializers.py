# Take model and translate it to JSON response

from rest_framework import serializers
# need to import and declare model that is required to be serialized
from .models import Room


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room  # Room is defined here
        fields = ('id', 'code', 'host', 'guest_can_pause', 'votes_to_skip',
                  'created_at')  # id is primary key, auto created

# To make sure data in POST request conforms to the standard set to create a room


class CreateRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip')
