import json
from sqlite3 import Cursor
from typing import List

from db.base import dbTables, withDbTransaction
from db.models.instrumentInfo import InstrumentInfo, InstrumentInfoData


@withDbTransaction
def getInstrumentInfos(*, cursor: Cursor) -> List[InstrumentInfo]:
    cursor.execute(f"SELECT id, data FROM {dbTables.instrumentInfo}")
    rows = cursor.fetchall()

    result: List[InstrumentInfo] = [
        InstrumentInfo.model_validate({**json.loads(row["data"]), "id": row["id"]})
        for row in rows
    ]
    return result


@withDbTransaction
def importInstrumentInfos(
    infos: List[InstrumentInfoData], *, cursor: Cursor
) -> List[InstrumentInfo]:
    existingInfos: List[InstrumentInfo] = getInstrumentInfos()
    importedInfos: List[InstrumentInfo] = []

    for data in infos:
        dataJson = data.model_dump()
        dataString = json.dumps(dataJson)

        existingInfo = next(
            (
                transaction
                for transaction in existingInfos
                if transaction.instrument == data.instrument
            ),
            None,
        )

        if existingInfo:
            cursor.execute(
                f"""
                UPDATE {dbTables.instrumentInfo}
                SET data = ?
                WHERE id = ?
                """,
                (dataString, existingInfo.id),
            )
            id = existingInfo.id
        else:
            cursor.execute(
                f"""
                INSERT INTO {dbTables.instrumentInfo} (data) VALUES (?)
                """,
                (dataString,),
            )
            id = cursor.lastrowid

        importedInfo = InstrumentInfo.model_validate({**data.model_dump(), "id": id})
        importedInfos.append(importedInfo)

    return importedInfos
