---
title: "MongoDB 如何处理超大文件"
date: 2024-11-04T15:22:07-06:00
author: "郝鸿涛"
slug: mongodb-fs
draft: false
toc: true
tags: 编程
---
一个 JSON 文件如何超过了 MongoDB 的限制，依然可以上传，但是需要经过特殊处理。我们需要用到 [GridFS](https://www.mongodb.com/docs/manual/core/gridfs/)。


## 上传

```py
import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import pandas as pd
import numpy as np

load_dotenv()
uri = os.getenv("MONGODB_URI")

client = MongoClient(uri, server_api=ServerApi('1'))

print(client.list_database_names())

db = client.ica_conf

print(db.list_collection_names())

# Create a GridFS instance
fs = gridfs.GridFS(db, collection="paper_embeddings_fs")

# The large data
PAPER_EMBEDDINGS_JSON = '../data/api/paper_embeddings.json'

with open(PAPER_EMBEDDINGS_JSON, "r") as f:
    # converts the string data into a byte object using UTF-8 encoding
    paper_embeddings_data = f.read().encode('utf-8') 

# Store the data in GridFS
file_id = fs.put(paper_embeddings_data, filename="paper_embeddings.json")
print(f"Stored paper embeddings with file_id: {file_id}")
```

上面操作完之后，会有两个文件出现在 MongoDB Atalas: `paper_embeddings_fs.files` 和 `paper_embeddings_fs.chunks`。

## 删除

如果你需要删除这个 data:

```py
# Drop GridFS collections for paper embeddings
db.drop_collection("paper_embeddings_fs.files")
db.drop_collection("paper_embeddings_fs.chunks")
print("GridFS collections for paper embeddings deleted")
```

## 读取

```py
load_dotenv()
uri = os.getenv("MONGODB_URI")
try:
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client.ica_conf
    fs = gridfs.GridFS(db, collection="paper_embeddings_fs")
except Exception as e:
    print("Error connecting to MongoDB:", e)
    raise 

# Load the embeddings from GridFS
print("Loading embeddings from MongoDB...")
file_id = fs.find_one({"filename": "paper_embeddings.json"})._id 
paper_embeddings_data = fs.get(file_id).read().decode("utf-8")  # Load and decode to string
paper_embeddings = json.loads(paper_embeddings_data)  # Convert JSON string to dictionary
print("Loding embeddings finished!")
```