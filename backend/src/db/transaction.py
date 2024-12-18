import json
from sqlite3 import Cursor
from typing import List

from db.base import dbTables, withDbTransaction
from db.models.transaction import Transaction, TransactionData


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
    result = Transaction.model_validate({**dataJson, "id": id})
    return result


@withDbTransaction
def getTransactions(*, cursor: Cursor) -> List[Transaction]:
    cursor.execute(f"SELECT id, data FROM {dbTables.transaction} ORDER BY id DESC")
    rows = cursor.fetchall()

    result: List[Transaction] = [
        Transaction.model_validate({"id": row["id"], "data": json.loads(row["data"])})
        for row in rows
    ]
    return result


@withDbTransaction
def getTransaction(id: int, *, cursor: Cursor) -> Transaction:
    cursor.execute(f"SELECT id, data FROM {dbTables.transaction} WHERE id = ?", (id,))
    row = cursor.fetchone()

    return Transaction.model_validate({**json.loads(row["data"]), "id": row["id"]})


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

    return Transaction.model_validate({**json.loads(row["data"]), "id": row["id"]})


@withDbTransaction
def removeTransaction(id: int, *, cursor: Cursor) -> None:
    cursor.execute(f"DELETE FROM {dbTables.transaction} WHERE id = ?", (id,))


@withDbTransaction
def importTransactions(
    transactions: List[TransactionData], *, cursor: Cursor
) -> List[Transaction]:
    existingTransactions: List[Transaction] = getTransactions()
    importedTransactions: List[Transaction] = []

    for data in transactions:
        dataJson = data.model_dump()
        dataString = json.dumps(dataJson)

        existingTransaction = next(
            (
                transaction
                for transaction in existingTransactions
                if transaction.data.orderId == data.orderId
            ),
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

        importedTransaction = Transaction.model_validate(
            {
                "data": dataJson,
                "id": id,
            }
        )
        importedTransactions.append(importedTransaction)

    return importedTransactions
