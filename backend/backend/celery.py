import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

app = Celery("backend")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

app.conf.beat_schedule = {
    "fetch_crypto_prices_every_minute": {
        "task": "crypto.tasks.fetch_crypto_prices_task",
        "schedule": 60.0,  # Run every 60 seconds
    },
}
