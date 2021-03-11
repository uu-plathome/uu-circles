import os
from os.path import join, dirname
from dotenv import load_dotenv
#See
#https://qiita.com/harukikaneko/items/b004048f8d1eca44cba9

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(verbose=True, dotenv_path=dotenv_path)

TOKEN = os.environ.get("TOKEN")
print(TOKEN)