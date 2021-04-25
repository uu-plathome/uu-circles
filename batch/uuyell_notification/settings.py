import os
from os.path import join, dirname
from dotenv import load_dotenv
# See
# https://qiita.com/harukikaneko/items/b004048f8d1eca44cba9


dotenv_path = join(dirname(__file__), '.env')
load_dotenv(verbose=True, dotenv_path=dotenv_path)

TOKEN = os.environ.get("TOKEN")
UU_YELL_CHANNEL_ID = os.environ.get("UU_YELL_CHANNEL_ID")
UU_YELL_TEST_CHANNEL_ID = os.environ.get("UU_YELL_TEST_CHANNEL_ID")
UU_YELL_API_URL = os.environ.get("UU_YELL_API_URL")
UU_YELL_TEST_API_URL = os.environ.get("UU_YELL_TEST_API_URL")
