# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView

# Create your views here.
from duckstatistics.models import EventData, Location, FoodData


class MainView(TemplateView):
    template_name = "welcome.html"
    """
    This view will be rendered every time the page is requested from the
    browser. Also it will return the context data as a qeueryset along
    with the template to show the data on the frontend.
    """

    def get_context_data(self, **kwargs):
        context = {'event_data': EventData.objects.all()}
        return context


def prepare_json_entry(location_object, food_data_object, event_data_object):
    return {'country_name': location_object.country,
            'park_name': location_object.park_name,
            'number_of_ducks': event_data_object.number_of_ducks,
            'time_fed': event_data_object.time_fed,
            'food_amount': event_data_object.food_amount,
            'food_type': food_data_object.food_type,
            'food_name': food_data_object.food_name
            }


@csrf_exempt
def create_entry(request):
    """
    Creates an entry in the database whenever the create entry button is clicked
    from the CSS Modal from the FE. The information is collected and passed along
    to create the database entry.
    Either the entry is already in the database and then we just obtain it
    or create it by using get_or_create method, which is inbuilt from
    the Django aspect.
    We then store the information in the database and return the event data object
    to be able to show it on Front end.
    :param request: WSGIRequest
    :return: HttpResponse
    """
    country_name = request.POST.get("country_name")
    park_name = request.POST.get("park_name")
    number_of_ducks = request.POST.get("number_of_ducks")
    food_name = request.POST.get("food_name")
    food_type = request.POST.get("food_type")
    time_fed = request.POST.get("time_fed")
    fed_amount = request.POST.get("fed_amount")

    location_object, _ = Location.objects.get_or_create(country=country_name, park_name=park_name)
    location_object.save()

    food_data_object, _ = FoodData.objects.get_or_create(food_type=food_type, food_name=food_name)
    food_data_object.save()

    event_data_object = EventData(number_of_ducks=number_of_ducks,
                                  time_fed=time_fed,
                                  food_amount=fed_amount,
                                  location_id=location_object,
                                  food_data_id=food_data_object)
    event_data_object.save()
    if event_data_object:
        return JsonResponse(prepare_json_entry(location_object, food_data_object, event_data_object))
    else:
        return HttpResponse("Can't make entry. Please check values", status=404)
