import json

from db.base import dbTables, getDbConnection
from db.models.info import Info, parseInfo

defaultInfo = Info(btcPrice=0.0)


def getInfo() -> Info:
    connection = getDbConnection()
    cursor = connection.cursor()

    cursor.execute(f"SELECT id, data FROM {dbTables.info} WHERE id = ?", (1,))
    row = cursor.fetchone()

    connection.close()

    if row is None:
        return defaultInfo

    return parseInfo(json.loads(row["data"]))


def updateInfo(info: Info):
    connection = getDbConnection()
    cursor = connection.cursor()

    infoString = json.dumps(info.model_dump())

    cursor.execute(
        f"""
            INSERT OR REPLACE INTO {dbTables.info} (id, data) 
            VALUES (1, ?)
        """,
        (infoString,),
    )

    connection.commit()
    connection.close()
