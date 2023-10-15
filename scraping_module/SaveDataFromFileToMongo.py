from pymongo import MongoClient

#open json file
import json

# Mở tệp JSON để đọc
with open('data.json', 'r') as json_file:
    # Load dữ liệu từ tệp JSON
    data = json.load(json_file)


jobs_list = data['data']

# Kết nối đến MongoDB (mặc định sẽ kết nối đến localhost:27017)
client = MongoClient('mongodb://localhost:27017/')

# Chọn cơ sở dữ liệu (nếu chưa tồn tại, nó sẽ tự động được tạo ra)
db = client['job-recommender-database']
print(db)
collection = db['jobs']

# Chèn dữ liệu vào bảng
try:
    collection.insert_many(jobs_list)
except:
    print("can not import data to mongodb")


