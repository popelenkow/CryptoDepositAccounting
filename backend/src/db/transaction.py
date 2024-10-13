import json
from typing import List

from db.base import dbTables, getDbConnection
from db.models.transaction import Transaction, TransactionData, parseTransaction


def createTransaction(transactionData: TransactionData) -> Transaction:
    connection = getDbConnection()
    cursor = connection.cursor()

    transactionJson = transactionData.model_dump()
    transactionString = json.dumps(transactionJson)

    cursor.execute(
        f"""
        INSERT INTO {dbTables.transactions} (data) VALUES (?)
        """,
        (transactionString,),
    )

    transactionId = cursor.lastrowid

    connection.commit()
    connection.close()

    return parseTransaction({**transactionJson, "id": transactionId})


def getTransactions() -> List[Transaction]:
    connection = getDbConnection()
    cursor = connection.cursor()

    cursor.execute(f"SELECT id, data FROM {dbTables.transactions}")
    rows = cursor.fetchall()

    connection.close()
    return [
        parseTransaction({**json.loads(row["data"]), "id": row["id"]}) for row in rows
    ]


def getTransaction(transactionId: int) -> Transaction:
    connection = getDbConnection()
    cursor = connection.cursor()

    cursor.execute(
        f"SELECT id, data FROM {dbTables.transactions} WHERE id = ?", (transactionId,)
    )
    row = cursor.fetchone()

    connection.close()

    return parseTransaction({**json.loads(row["data"]), "id": row["id"]})


def updateTransaction(
    transactionId: int, transactionData: TransactionData
) -> dict | None:
    connection = getDbConnection()
    cursor = connection.cursor()

    transactionString = json.dumps(transactionData.model_dump())
    cursor.execute(
        f"""
        UPDATE {dbTables.transactions}
        SET data = ?
        WHERE id = ?
        """,
        (transactionString, transactionId),
    )
    connection.commit()

    cursor.execute(
        f"SELECT id, data FROM {dbTables.transactions} WHERE id = ?", (transactionId,)
    )
    row = cursor.fetchone()

    connection.close()

    return parseTransaction({**json.loads(row["data"]), "id": row["id"]})


def removeTransaction(transactionId: int) -> None:
    connection = getDbConnection()
    cursor = connection.cursor()

    cursor.execute(
        f"DELETE FROM {dbTables.transactions} WHERE id = ?",
        (transactionId,),
    )

    connection.commit()
    connection.close()

def importTransactions(transactions: List[TransactionData]) -> List[Transaction]:
    existingTransactions = getTransactions()
    connection = getDbConnection()
    cursor = connection.cursor()

    importedTransactions = []

    for transactionData in transactions:
        transactionJson = transactionData.model_dump()
        transactionString = json.dumps(transactionJson)

        existingTransaction = next(
            (t for t in existingTransactions if t.orderId == transactionData.orderId),
            None
        )

        if existingTransaction:
            cursor.execute(
                f"""
                UPDATE {dbTables.transactions}
                SET data = ?
                WHERE id = ?
                """,
                (transactionString, existingTransaction.id),
            )
            transactionId = existingTransaction.id
        else:
            cursor.execute(
                f"""
                INSERT INTO {dbTables.transactions} (data) VALUES (?)
                """,
                (transactionString,),
            )
            transactionId = cursor.lastrowid

        importedTransaction = parseTransaction({
            **transactionJson,
            "id": transactionId,
        })
        importedTransactions.append(importedTransaction)

    connection.commit()
    connection.close()

    return importedTransactions