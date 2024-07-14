import requests
import json


START_PAGE_TO_CLONE = int(input("press started page you want to clone: "))
END_PAGE_TO_CLONE = int(input("press end page you want to clone: "))

API_END_POINT = "http://api.topdev.vn/td/v2/jobs?fields[job]=id,slug,title,salary,company,extra_skills,\
    skills_str,skills_arr,skills_ids,job_types_str,job_levels_str,job_levels_arr,job_levels_ids,addresses,\
        status_display,detail_url,job_url,salary,published,refreshed,applied,candidate,requirements_arr,packages,\
            benefits,content,features,is_free,is_basic,is_basic_plus,is_distinction&fields[company]=slug,tagline/ ,\
                addresses,skills_arr,industries_arr,industries_str,image_cover,image_galleries,benefits&page=9&locale=vi_VN"
USER_TOKEN = "eyJpdiI6IldQazFycUFkUUZkbVwvK3RZVklCK1wvQT09IiwidmFsdWUiOiJwSU10VWwycWs0SHM0bDNWVm1oVjFPT05Rb0cxdUZneUNjTUJPc1VRWEEzOFRUMENxKzZZbHJLTkphZURwU3c2QWlsenQ3SUxDXC9nV2lJcGR4WlJvbkNOTTkwMWpEV1B1Y24wdnFzeDNleGtWS3d6bm43WHN1M1lcL2dNK2dXVnVlTDcwUXk5ZGVrQWNGWUEyOTVQRE9HaHc2c2NYNFcralMrWkxpdXJEdFJCZEQ0THBGQlRlMytpamZJbGw5bHJLdER5N2EzaEprYVdZUWdiYW5hREh6SmhjTUxVVVpOdUxnQ1BRMCtQY2p1XC9QSU5MNzJLZWJ2ZHZleHlYXC81T1pLQ2ZUelVXXC9VbDZnZE1ndlZoejJkWTBxUTdHTDkxakJBckhEZzF6Q1dCRXNSR0NtQUFNMHd2R09HV1doOHRFb2RTIiwibWFjIjoiNDhjZDAxNmM5NjM0Zjk4Mzg3MDUyNjE3MTZhMGY2OTNkN2U1MjgwNzk1MDQ4ZjQxNWYyOGExZTQ1MmY3NzNlYSJ9"
USER_COOKIE = "sticky_cookie=web1; _gcl_au=1.1.1376182668.1720858698; _ga=GA1.1.393566791.1720858699; _fbp=fb.1.1720858700764.828694645708106786; __zi=3000.SSZzejyD3D4xZkoxWHy7XJdQylMF1qJPAz3jvyqLKizgZwlWpbqOoMYDhEo0Mnx0BOgexevL6SGpCm.1; laravel_token=eyJpdiI6IldQazFycUFkUUZkbVwvK3RZVklCK1wvQT09IiwidmFsdWUiOiJwSU10VWwycWs0SHM0bDNWVm1oVjFPT05Rb0cxdUZneUNjTUJPc1VRWEEzOFRUMENxKzZZbHJLTkphZURwU3c2QWlsenQ3SUxDXC9nV2lJcGR4WlJvbkNOTTkwMWpEV1B1Y24wdnFzeDNleGtWS3d6bm43WHN1M1lcL2dNK2dXVnVlTDcwUXk5ZGVrQWNGWUEyOTVQRE9HaHc2c2NYNFcralMrWkxpdXJEdFJCZEQ0THBGQlRlMytpamZJbGw5bHJLdER5N2EzaEprYVdZUWdiYW5hREh6SmhjTUxVVVpOdUxnQ1BRMCtQY2p1XC9QSU5MNzJLZWJ2ZHZleHlYXC81T1pLQ2ZUelVXXC9VbDZnZE1ndlZoejJkWTBxUTdHTDkxakJBckhEZzF6Q1dCRXNSR0NtQUFNMHd2R09HV1doOHRFb2RTIiwibWFjIjoiNDhjZDAxNmM5NjM0Zjk4Mzg3MDUyNjE3MTZhMGY2OTNkN2U1MjgwNzk1MDQ4ZjQxNWYyOGExZTQ1MmY3NzNlYSJ9; ATDUID=2925349; TDUID=143948af-f4d8-4364-bdf8-8c85ba64d79a; topdev_locale=en; _gcl_gs=2.1.k1$i1720859765; _gcl_aw=GCL.1720859770.CjwKCAjwy8i0BhAkEiwAdFaeGHOUo8FWsqa00bWc0bx4-fnPO0_U5ThbBO2RYgPBS7tmpqucn6s_FBoCF4UQAvD_BwE; ta=eyJpdiI6InA3Y1pKUGErR21OVWh6amdkRUV0anc9PSIsInZhbHVlIjoiNElrSVFiY0NUeUtCUGlOeitxK0xcL2VzK2pwUG9mc1FwZGwxME1Eelo2MjZrckxhN0ZvNGFKb1NXUCs5R0Y2VmRTd0NGZE5zSGtvdXBnbEdLYkFPcGNRPT0iLCJtYWMiOiIyYmEwNzNmN2VhODFjNzNlNjgyM2Y5ZDc4NGQzZGRkMTZiMWIzYzgxNjVkMjQ1ODFjZGFkYjk4OTMzYjYyN2UwIn0%3D; __gads=ID=d7ecdffb85d95531:T=1720858697:RT=1720862826:S=ALNI_MbtpSVKhRt_s8SgUg5yz5BjTmV_LA; __gpi=UID=00000e8fa90ae40c:T=1720858697:RT=1720862826:S=ALNI_MaFLCpmQahPCYmtlam8UyiEay7Wpw; __eoi=ID=6e30c4a2dc605e27:T=1720858697:RT=1720862826:S=AA-AfjbCjFozFmuaH_iyPH6sdED3; visitor=eyJpdiI6InAxUERqRjl3S0lFK1V1NVBYd1VLUkE9PSIsInZhbHVlIjoiQmorWGhkNDdRVllBaEdmVU5OSzI0MkZhd3pWV2FhMTJlQTBEVHNzMFR6bkUyRTJ4OWN5RGJWQ3JyTjlyNVlYNEd3N1VSWmx1WW9UOGozWXdJN0NcL2plWVlxbFkwSlRFWmpOaXNWMzd3NlVpOXF5XC9mdkhiV0E0MlNqTlY0YnhvVnloY1wvRGNWbmlJcnJWcXVEbjhWbnVBRzN3bzdwS0ZseDNYaVBDSFZHeXpvPSIsIm1hYyI6IjU1ODQ5NTdjZTFjNTJlMGE2NjdhMmQwZDFhNDEzZWNkM2ZhM2FjNmFmODkxZDA4ZTgxOTE0NGU2MzZmZjNlMjUifQ%3D%3D; topdevfrontend_session=eyJpdiI6InhzSHo4ZnVMUFlUWlFBejVCTi8vQWc9PSIsInZhbHVlIjoiQnRVZ0p2QlZYVWFuMlk2bllndEZZWVZadFJCbXpNSHVNMXVMRHBkYUdDK2lFTUVhN250TUdpV01pa3BwZ2FCUDBxNk1GNnBmUFFaTWU4d29EeDlNQUoxRi9yZldqYWlWOVVzbUk5NVZRMGFWL0xsNDdWbXNmdldwV3VDMkQweGsiLCJtYWMiOiJmZDIxMWY2ZjUwOGVmN2E2MmY3MWM4N2VjNTlmNDc4OGE2YjFlM2Y1YzU0OTk5YWEzYzRhYjVkNjEzMWEyM2NiIiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6IjJOSEJpRVR2bU42T3RmRkZ3SFcwWFE9PSIsInZhbHVlIjoiRXE4MzdrSGswaWZcL3pyTmtNMmZRaGxzM0t3U3dTWWt6cjZWK1MxSlRDSWZsN2pVT1VBOERYd2RcL09kSGdIZEJ4VGYrXC9iYk1HTzhZTkZCSDhPT3o4UFlxQ3VXeXNIUDZyWTRMRzEyMEg4VGFXU3VVaUV6a1NVK01pbFJ1WnJld20iLCJtYWMiOiIyNjNjYzFjM2Q3NTM0ZmIzMjUwZTc5ZTIzZjI3OGFmZTAxODZmMzg0NTM1OWNlYjI3ZmYzMGI4OTZjODliM2Y5In0%3D; TDSID=eyJpdiI6InJsdUVQUXFzM1F2RGl0bUxUcDdDTkE9PSIsInZhbHVlIjoiVWJHSHhUdTVxR045MkxHRndBTUNWajJyb01rbUR3M09oYzYydTZsdFpYbkVTRHZZYlpxem9JU0hkTkNEeGhubGJRZzdNdXI3MEZhZDRnaVJlV2ZFUVB0RTdLT29ZUGFYa2htQnZ2azc5aXVcL3V5ZnFUeDRXN0xVNmd3ejFrVDJPIiwibWFjIjoiMGJkNTRlM2IyNGI5NWU1NWFmODE0MDIwZDBiZmQzMmQ2MGU4ZGM5N2I3MmFkOWZjYjY2OWZmMDZmYTkxNWQ3YSJ9; _ga_S0JFGXYD51=GS1.1.1720858699.1.1.1720862856.5.0.0; _ga_7X6VBRP2ER=GS1.1.1720858699.1.1.1720862856.5.0.0"

headers = {
    'Content-Type': 'application/json',
    "Cookie": f"Bearer {USER_TOKEN}",
    "X-Xsrf-Token": "eyJpdiI6IjJOSEJpRVR2bU42T3RmRkZ3SFcwWFE9PSIsInZhbHVlIjoiRXE4MzdrSGswaWZcL3pyTmtNMmZRaGxzM0t3U3dTWWt6cjZWK1MxSlRDSWZsN2pVT1VBOERYd2RcL09kSGdIZEJ4VGYrXC9iYk1HTzhZTkZCSDhPT3o4UFlxQ3VXeXNIUDZyWTRMRzEyMEg4VGFXU3VVaUV6a1NVK01pbFJ1WnJld20iLCJtYWMiOiIyNjNjYzFjM2Q3NTM0ZmIzMjUwZTc5ZTIzZjI3OGFmZTAxODZmMzg0NTM1OWNlYjI3ZmYzMGI4OTZjODliM2Y5In0="
}

def get_jobs_from_url(index, url):
# Gửi yêu cầu GET đến API
    try:
        # url = API_END_POINT  # Thay thế URL của API bằng địa chỉ thực sự của API bạn muốn sử dụng
        response = requests.get(url, headers=headers)
        # print(response.json())
        # Kiểm tra xem yêu cầu đã thành công hay không (status code 200)
        if response.status_code == 200:
            # Parse dữ liệu JSON từ phản hồi
            data = response.json()
            # Lưu dữ liệu vào một file JSON
            with open(f'./scraped_data/jobs_page_{index}.json', 'w') as json_file:
                json.dump(data, json_file)

            print("Dữ liệu đã được lưu vào file data.json.")
        else:
            print("Không thể lấy dữ liệu từ API.")
    except:
        try:
            # url = API_END_POINT  # Thay thế URL của API bằng địa chỉ thực sự của API bạn muốn sử dụng
            response = requests.get(url, headers=headers)
            print(response.json())
            # Kiểm tra xem yêu cầu đã thành công hay không (status code 200)
            if response.status_code == 200:
                # Parse dữ liệu JSON từ phản hồi
                data = response.json()
                # Lưu dữ liệu vào một file JSON
                with open(f'./scraped_data/jobs_page_{index}.json', 'w') as json_file:
                    json.dump(data, json_file)

                print("Dữ liệu đã được lưu vào file data.json.")
            else:
                print("Không thể lấy dữ liệu từ API.")
        except:
            print("some bug has occured, please try again later")
        print("second chance faile")

def clone(START_PAGE_TO_CLONE, END_PAGE_TO_CLONE):
    if START_PAGE_TO_CLONE <= 0:
        START_PAGE_TO_CLONE = 1
    if END_PAGE_TO_CLONE - START_PAGE_TO_CLONE > 100:
        print("warning!!! maximum pages to clone is 100, automated to set end page to proper range")
        END_PAGE_TO_CLONE = START_PAGE_TO_CLONE + 100
    for i in range(START_PAGE_TO_CLONE, END_PAGE_TO_CLONE + 1):
        url = f"http://api.topdev.vn/td/v2/jobs?fields[job]=id,slug,title,salary,company,extra_skills,\
        skills_str,skills_arr,skills_ids,job_types_str,job_levels_str,job_levels_arr,job_levels_ids,addresses,\
            status_display,detail_url,job_url,salary,published,refreshed,applied,candidate,requirements_arr,packages,\
                benefits,content,features,is_free,is_basic,is_basic_plus,is_distinction&fields[company]=slug,tagline/ ,\
                    addresses,skills_arr,industries_arr,industries_str,image_cover,image_galleries,benefits&page={i}&locale=vi_VN"
        get_jobs_from_url(i, url)

clone(START_PAGE_TO_CLONE, END_PAGE_TO_CLONE)