from typing import List

from pydantic import BaseModel

from db.models.transaction import TransactionData


class BybitDualOrder(BaseModel):
    order_id: str
    created_at: int
    apply_end_at: int
    obsolete_cumulate_pnl_e8: int
    order_status: int
    product_name: str
    obsolete_total_locked_amount_e8: int
    settled_apy_e8: int
    coin: int
    return_coin: int
    benchmark_price_e8: int
    settlement_price_e8: int
    settlement_time: int
    coin_x: int
    coin_y: int
    duration: int
    yield_start_at: int
    yield_end_at: int
    estimate_yield_distribution: int
    yield_duration: float
    cumulate_pnl_e8: int
    total_locked_amount_e8: int
    apy_e8: int
    order_type: int
    order_status_v3: int
    order_direction: int
    status: int
    id: str


def parseBybitDualOrder(order: BybitDualOrder) -> TransactionData:
    method = "sell" if order.order_direction == 2 else "buy"

    closeStatus = (
        "pending"
        if order.order_status != 4
        else "earn" if order.coin == order.return_coin > 0 else "exchange"
    )

    transactionData = {
        "orderId": order.order_id,
        "type": "dual",
        "method": method,
        "amount": float(order.total_locked_amount_e8) / 1e8,
        "price": float(order.benchmark_price_e8) / 1e8,
        "duration": float(order.duration) * 24 if order.duration != 0 else 8,
        "apr": float(order.apy_e8) / 1e8 * 100,
        "close": closeStatus,
    }

    return TransactionData.model_validate(transactionData)


def parseBybitDualOrders(orders: List[BybitDualOrder]) -> List[TransactionData]:
    return [parseBybitDualOrder(order) for order in orders]
