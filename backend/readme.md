# BitTradeWorkshop Python Backend

### Scripts

Python 3.12.5

Install
```bash
pip install -r requirements.txt
```

Run dev
```bash
fastapi dev src/index.py
```

Autoformat code
```bash
isort .
black .
```

Install packages
```bash
pip install -r requirements.txt
```

Uninstall packages
```bash
pip freeze > packages.txt
pip uninstall -y -r packages.txt
rm packages.txt
```