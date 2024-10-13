import os
import sqlite3

databasePath = os.path.join(
    os.path.dirname(os.path.abspath(__file__)), "../../database.db"
)


class DbTables:
    def __init__(self):
        self.transactions = "transactions"
        self.links = "links"
        self.info = "info"


dbTables = DbTables()


def getDbConnection():
    connection = sqlite3.connect(databasePath)
    connection.row_factory = sqlite3.Row
    return connection


def initDb():
    connection = getDbConnection()
    cursor = connection.cursor()
    cursor.execute(
        f"""
        CREATE TABLE IF NOT EXISTS {dbTables.transactions} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            data TEXT NOT NULL
        )
        """
    )
    cursor.execute(
        f"""
        CREATE TABLE IF NOT EXISTS {dbTables.links} (
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
    connection.commit()
    connection.close()
