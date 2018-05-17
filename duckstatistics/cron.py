from duckstatistics.models import EventData


def every_day_feed():
    """
    This the method that will get run through Django Crontab
    Every day at 12:00, the crontab will run this method.
    This method will then fetch all the entries that will
    have the repeat option true and will create a new
    key in the database. This is done by editing the
    object pk and saving a new instance of the object.
    """
    for data in EventData.objects.filter(repeat_entry=True):
        data.pk = None
        data.save()
