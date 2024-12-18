import os
import sqlite3
from functools import wraps
from sqlite3 import Cursor
from typing import Any, Callable, TypeVar

databasePath = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "../../database.db"
)


class DbTables:
    def __init__(self):
        self.bundle = "bundleTable"
        self.info = "infoTable"
        self.price = "priceTable"
        self.transaction = "transactionTable"
        self.instrumentInfo = "instrumentInfo"


dbTables = DbTables()

T = TypeVar("T", bound=Callable[..., Any])


def withDbTransaction(func: T) -> T:
    @wraps(func)
    def wrapper(*args, **kwargs):
        connection = sqlite3.connect(databasePath)
        connection.row_factory = sqlite3.Row
        cursor = connection.cursor()
        try:
            result = func(*args, **kwargs, cursor=cursor)
            connection.commit()
            return result
        finally:
            cursor.close()
            connection.close()

    return wrapper


@withDbTransaction
def initDb(*, cursor: Cursor):
    cursor.execute(
        f"""
        CREATE TABLE IF NOT EXISTS {dbTables.bundle} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT NOT NULL
        )
        """
    )
    cursor.execute(
        f"""
        CREATE TABLE IF NOT EXISTS {dbTables.info} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT NOT NULL
        )
        """
    )
    cursor.execute(
        f"""
        CREATE TABLE IF NOT EXISTS {dbTables.price} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            coinId TEXT NOT NULL,
            price REAL NOT NULL,
            timestamp INTEGER NOT NULL
        )
        """
    )
    cursor.execute(
        f"""
        CREATE TABLE IF NOT EXISTS {dbTables.transaction} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT NOT NULL
        )
        """
    )
    cursor.execute(
        f"""
        CREATE TABLE IF NOT EXISTS {dbTables.instrumentInfo} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT NOT NULL
        )
        """
    )
