from typing import List

from fastapi import APIRouter, HTTPException

from db.models.transaction import Transaction, TransactionData
from db.transaction import (
    addTransaction,
    getTransactions,
    importTransactions,
    removeTransaction,
    updateTransaction,
)

transactionRouter = APIRouter(prefix="/api/transaction")


@transactionRouter.post("/")
def requestAddTransaction(data: TransactionData) -> Transaction:
    try:
        return addTransaction(data)
    except Exception as error:
        raise HTTPException(status_code=400, detail=str(error))


@transactionRouter.put("/{transactionId}")
def requestUpdateTransaction(transactionId: int, data: TransactionData) -> Transaction:
    try:
        return updateTransaction(transactionId, data)
    except Exception as error:
        raise HTTPException(status_code=400, detail=str(error))


@transactionRouter.get("/list")
def requestGetTransactions() -> list[Transaction]:
    return getTransactions()


@transactionRouter.delete("/{transactionId}")
def requestRemoveTransaction(transactionId: int):
    try:
        removeTransaction(transactionId)
        return {"message": f"Project '{transactionId}' deleted successfully."}
    except FileNotFoundError as error:
        raise HTTPException(status_code=404, detail=str(error))
    except Exception as error:
        raise HTTPException(status_code=400, detail=str(error))


@transactionRouter.post("/import")
def requestImportTransactions(transactions: List[TransactionData]):
    return importTransactions(transactions)
