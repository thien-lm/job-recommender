import requests
import json

API_END_POINT = "http://api.topdev.vn/td/v2/jobs?fields[job]=id,slug,title,salary,company,extra_skills,\
    skills_str,skills_arr,skills_ids,job_types_str,job_levels_str,job_levels_arr,job_levels_ids,addresses,\
        status_display,detail_url,job_url,salary,published,refreshed,applied,candidate,requirements_arr,packages,\
            benefits,content,features,is_free,is_basic,is_basic_plus,is_distinction&fields[company]=slug,tagline/ ,\
                addresses,skills_arr,industries_arr,industries_str,image_cover,image_galleries,benefits&page=9&locale=vi_VN"

USER_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImExNmZlZjQwNGM5Nzk4NWQxMjA1NWY2YmUzNGI2ZmRmZjc2MjkxYzg2NDYwZTZmODgzZGNiNTM4NTY1Njk2MzA1YjJkYzNmMmE4NTYzMjM1In0.eyJhdWQiOiIxOCIsImp0aSI6ImExNmZlZjQwNGM5Nzk4NWQxMjA1NWY2YmUzNGI2ZmRmZjc2MjkxYzg2NDYwZTZmODgzZGNiNTM4NTY1Njk2MzA1YjJkYzNmMmE4NTYzMjM1IiwiaWF0IjoxNjk3MjkwNTU4LCJuYmYiOjE2OTcyOTA1NTgsImV4cCI6MTY5NzM1MDU1OCwic3ViIjoiMjkyNTM0OSIsInNjb3BlcyI6W119.UM-LdGJnB2JKP-1yHeCjoX36ovuS_FfL8xCY8YovaRcOpzfazeLaY4yqHDGomryUoMrDmjGVhgy1ebcFGdw-j"\
    "gaTZtEOxjKcP185Tu-jSSVspDjzJ-_aCeGjWCUShOk2DIHCy5NJQqNOTB9TKOhqeoWUeS3Erd8a2meyXTZA9cM"

USER_COOKIE = "apitopdev_session=eyJpdiI6Ilk3dmFuUEF5aEJ3d0pvRnpIVjNZRUE9PSIsInZhbHVlIjoiM1dEVVhLOXEycFBcL09NNEkybERaZDh6cFROUG4wRWx\
    5WHRkbnRmbUFGeWhLRXI1WktGaWZZSlU2enZWNVVZRXQ0aHFrUUthU1wvQ29RVEwwVWdVakRCVXVGMUl0bmYzWFdWOVpPdURBSmY2V3F1R1ZaaWxRQlNcLzl5MTlcL0M5X\
        C9PWiIsIm1hYyI6IjQ5NTE0MDg5NjY2OTQ2NDAxZmJiMjAwYmNjYTQwZDRiNWNhNDk2ZDU5Mjc3MDFhMmNjMmZkZWI0NmVjZDFhMjQifQ%3D%3D"

headers = {
    'Content-Type': 'application/json',
    "Authorization": f"Bearer {USER_TOKEN}",
}


# Gửi yêu cầu GET đến API
url = API_END_POINT  # Thay thế URL của API bằng địa chỉ thực sự của API bạn muốn sử dụng
response = requests.get(url, headers=headers)

# Kiểm tra xem yêu cầu đã thành công hay không (status code 200)
if response.status_code == 200:
    # Parse dữ liệu JSON từ phản hồi
    data = response.json()

    # Lưu dữ liệu vào một file JSON
    with open('data.json', 'w') as json_file:
        json.dump(data, json_file)

    print("Dữ liệu đã được lưu vào file data.json.")
else:
    print("Không thể lấy dữ liệu từ API.")
