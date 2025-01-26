from datetime import datetime, timedelta, timezone


def getCurrentTime():
    return datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S")


def getCurrentDualStartTime():
    currentTime = datetime.now(timezone.utc)
    startTime = currentTime.replace(hour=8, minute=0, second=0, microsecond=0)

    if currentTime >= startTime:
        startTime += timedelta(days=1)

    return startTime.strftime("%Y-%m-%d %H:%M:%S")
