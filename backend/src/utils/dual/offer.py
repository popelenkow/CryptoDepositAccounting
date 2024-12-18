import re

from bs4 import BeautifulSoup

from db.models.info import DualOffer


def parseDuration(duration):
    if "H" in duration:
        return int(re.search(r"(\d+)", duration).group(1))
    elif "Day" in duration:
        days = int(re.search(r"(\d+)", duration).group(1))
        return days * 24
    return 0


def parseTitle(title: str):
    soup = BeautifulSoup(title, "html.parser")

    offsetSpan = soup.select_one('[class^="ProductList_offset__"]')
    offset = offsetSpan.get_text(strip=True) if offsetSpan else ""
    if offsetSpan:
        offsetSpan.extract()

    vipSpan = soup.select_one('[class^="ProductList_vipTag__"]')
    vip = vipSpan.get_text(strip=True) if vipSpan else ""
    if vipSpan:
        vipSpan.extract()

    price = soup.get_text(separator=" ", strip=True)

    return {
        "price": float(price.replace(",", "")),
        "vip": vip,
        "offset": float(offset.strip("%")),
    }


def parseDualOffersHtml(html: str) -> list[DualOffer]:
    soup = BeautifulSoup(html, "html.parser")

    rows = soup.select('tbody tr[class^="table_tr__"]')
    data = []

    for row in rows:
        title = row.select_one('[class^="ProductList_title__"]').prettify().strip()
        duration = row.select_one('[class^="table_td__"]:nth-child(3)').text.strip()
        apr = row.select_one('[class^="ProductList_greenApy__"]').text.strip()

        header = parseTitle(title)
        if header.get("vip") == "VIP-Only":
            continue

        dualOffer = DualOffer(
            price=header["price"],
            offset=header["offset"],
            apr=float(apr.strip("%")),
            duration=parseDuration(duration),
        )
        data.append(dualOffer)

    return data
