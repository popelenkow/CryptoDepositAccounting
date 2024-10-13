from typing import List

from fastapi import APIRouter, HTTPException

from db.models.transaction import Transaction, TransactionData
from db.transaction import (
    createTransaction,
    getTransactions,
    removeTransaction,
    updateTransaction,
    importTransactions,
)
from utils.dual.history import BybitDualOrder, parseBybitDualOrders

transactionRouter = APIRouter()


@transactionRouter.post("/transaction")
def requestCreateTransaction(data: TransactionData) -> Transaction:
    try:
        return createTransaction(data)
    except Exception as error:
        raise HTTPException(status_code=400, detail=str(error))


@transactionRouter.put("/transaction/{transactionId}")
def requestUpdateTransaction(transactionId: int, data: TransactionData) -> Transaction:
    try:
        return updateTransaction(transactionId, data)
    except Exception as error:
        raise HTTPException(status_code=400, detail=str(error))


@transactionRouter.get("/transactions")
def requestGetTransactions() -> list[Transaction]:
    return getTransactions()


@transactionRouter.delete("/transaction/{transactionId}")
def requestRemoveTransaction(transactionId: int):
    try:
        removeTransaction(transactionId)
        return {"message": f"Project '{transactionId}' deleted successfully."}
    except FileNotFoundError as error:
        raise HTTPException(status_code=404, detail=str(error))
    except Exception as error:
        raise HTTPException(status_code=400, detail=str(error))


@transactionRouter.post("/transaction/import/dual")
def requestImportDualTransactions(orders: List[BybitDualOrder]):
    transactions = parseBybitDualOrders(orders)
    return importTransactions(transactions)
