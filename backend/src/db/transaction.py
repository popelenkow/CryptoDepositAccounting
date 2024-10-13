import json
from sqlite3 import Cursor
from typing import List

from db.base import dbTables, withDbTransaction
from db.models.transaction import Transaction, TransactionData, parseTransaction


@withDbTransaction
def addTransaction(data: TransactionData, *, cursor: Cursor) -> Transaction:
    dataJson = data.model_dump()
    dataString = json.dumps(dataJson)

    cursor.execute(
        f"""
        INSERT INTO {dbTables.transaction} (data) VALUES (?)
        """,
        (dataString,),
    )

    id = cursor.lastrowid
    return parseTransaction({**dataJson, "id": id})


@withDbTransaction
def getTransactions(*, cursor: Cursor) -> List[Transaction]:
    cursor.execute(f"SELECT id, data FROM {dbTables.transaction}")
    rows = cursor.fetchall()

    return [
        parseTransaction({**json.loads(row["data"]), "id": row["id"]}) for row in rows
    ]


@withDbTransaction
def getTransaction(id: int, *, cursor: Cursor) -> Transaction:
    cursor.execute(f"SELECT id, data FROM {dbTables.transaction} WHERE id = ?", (id,))
    row = cursor.fetchone()

    return parseTransaction({**json.loads(row["data"]), "id": row["id"]})


@withDbTransaction
def updateTransaction(id: int, data: TransactionData, *, cursor: Cursor) -> Transaction:
    dataString = json.dumps(data.model_dump())
    cursor.execute(
        f"""
        UPDATE {dbTables.transaction}
        SET data = ?
        WHERE id = ?
        """,
        (dataString, id),
    )

    cursor.execute(f"SELECT id, data FROM {dbTables.transaction} WHERE id = ?", (id,))
    row = cursor.fetchone()

    return parseTransaction({**json.loads(row["data"]), "id": row["id"]})


@withDbTransaction
def removeTransaction(id: int, *, cursor: Cursor) -> None:
    cursor.execute(f"DELETE FROM {dbTables.transaction} WHERE id = ?", (id,))


@withDbTransaction
def importTransactions(
    transactions: List[TransactionData], *, cursor: Cursor
) -> List[Transaction]:
    existingTransactions = getTransactions()
    importedTransactions = []

    for data in transactions:
        dataJson = data.model_dump()
        dataString = json.dumps(dataJson)

        existingTransaction = next(
            (transaction for transaction in existingTransactions if transaction.orderId == data.orderId),
            None,
        )

        if existingTransaction:
            cursor.execute(
                f"""
                UPDATE {dbTables.transaction}
                SET data = ?
                WHERE id = ?
                """,
                (dataString, existingTransaction.id),
            )
            id = existingTransaction.id
        else:
            cursor.execute(
                f"""
                INSERT INTO {dbTables.transaction} (data) VALUES (?)
                """,
                (dataString,),
            )
            id = cursor.lastrowid

        importedTransaction = parseTransaction(
            {
                **dataJson,
                "id": id,
            }
        )
        importedTransactions.append(importedTransaction)

    return importedTransactions
