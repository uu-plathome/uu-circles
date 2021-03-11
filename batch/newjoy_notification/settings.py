import os
from os.path import join, dirname
from dotenv import load_dotenv
#See
#https://qiita.com/harukikaneko/items/b004048f8d1eca44cba9

load_dotenv(verbos=True)

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

TOKEN = os.environ.get("TOKEN")