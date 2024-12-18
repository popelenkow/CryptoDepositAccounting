import json
from sqlite3 import Cursor

from db.base import dbTables, withDbTransaction
from db.models.info import Info, parseInfo

defaultInfo = Info(btcPrice=0.0)


@withDbTransaction
def getInfo(cursor: Cursor) -> Info:
    cursor.execute(f"SELECT id, data FROM {dbTables.info} WHERE id = ?", (1,))
    row = cursor.fetchone()

    if row is None:
        return defaultInfo

    return parseInfo(json.loads(row["data"]))


@withDbTransaction
def updateInfo(info: Info, *, cursor: Cursor):
    infoString = json.dumps(info.model_dump())

    cursor.execute(
        f"""
            INSERT OR REPLACE INTO {dbTables.info} (id, data) 
            VALUES (1, ?)
        """,
        (infoString,),
    )
