# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from datetime import timedelta

from django.db import models


# Create your models here.


class Location(models.Model):
    """
    Contains the entities pertaining to the location.
    Hence the queryset to obtain statistics based on location is easier now.
    """
    country = models.TextField(verbose_name="Country Name", blank=False, null=False, default="Canada")
    park_name = models.TextField(verbose_name="Park Name", blank=False, null=False, default="")


class FoodData(models.Model):
    """
    Information pertaining to the food type.
    Can be extended and scaled in future to expand
    to more food options.
    """
    food_type = models.TextField(verbose_name="Food Type (e.g. Fruits, Vegetables, Meat etc)", blank=False, null=True)
    food_name = models.TextField(verbose_name="Name of the food", blank=False, null=True)


class EventData(models.Model):
    """
    Every time the event of feeding happens, the
    entry in the table is added. This ensures least
    duplication of data where only the most
    frequent data is abstracted into its own table.
    The relationships are many to one in fields location_id and
    food_data_id and are expressed as ForeignKey
    """
    number_of_ducks = models.IntegerField(default=0, blank=True, null=True)
    time_fed = models.IntegerField(default=0, blank=True, null=True)
    food_amount = models.IntegerField(blank=True, null=True)
    location_id = models.ForeignKey(Location, on_delete=models.CASCADE)
    food_data_id = models.ForeignKey(FoodData, on_delete=models.CASCADE)
