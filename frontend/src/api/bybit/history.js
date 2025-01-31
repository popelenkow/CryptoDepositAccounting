// Dev tools script

const getData = (page, bot_id) =>
  fetch('https://api2.bybit.com/s1/bot/fgrid/v1/get-fgrid-history-orders', {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json',
      lang: 'en',
    },
    body: JSON.stringify({ page, limit: 200, bot_id }),
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
  });

const getList = async (pages, bot_id) => {
  let list = [];
  for (let i = 0; i < pages; i++) {
    const response = await getData(i, bot_id);
    const data = await response.json();
    const pairs = data.result.pairs
      .filter((x) => x.profits !== '0')
      .map((x) => ({
        buy: Number(x.open_order.avg_price),
        sell: Number(x.close_order.avg_price),
        profit: Number(x.profits),
      }));
    list.push(...pairs);
  }
  list = list.sort((a, b) => a.buy - b.buy);
  list = Object.values(Object.groupBy(list, (x) => x.buy));

  list = list.map((arr) => ({ ...arr[0], count: arr.length }));
  console.log(list);
};
