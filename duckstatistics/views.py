# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.views.generic import TemplateView

# Create your views here.
from duckstatistics.models import EventData


class MainView(TemplateView):
    template_name = "welcome.html"

    def get_context_data(self, **kwargs):
        context = {'event_data': EventData.objects.all()}
        return context
