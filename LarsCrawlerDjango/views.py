from datetime import datetime, timedelta

from django.db import models
from django.shortcuts import render
import json
from django.core.serializers.json import DjangoJSONEncoder


class StatisticModel(models.Model):
    crawl_time = models.DateTimeField(primary_key=True)
    mails_day = models.IntegerField()
    mails_total = models.IntegerField()
    server_count = models.IntegerField()

    class Meta:
        db_table = "bot_logs"
        app_label = "LarsCrawlerDjango"


def get_index(request, *args, **kwargs):
    last_six_month = datetime.today() - timedelta(31 * 6)
    statistics = json.dumps(list(StatisticModel.objects
                                 .filter(crawl_time__gte=last_six_month)
                                 .values_list(named=True)), cls=DjangoJSONEncoder)

    return render(request, "index.html", {"statistics": statistics})
