# Data Trust Score

## Giới thiệu

**Data Trust Score** là đề tài bài tập lớn hướng tới xây dựng một nền tảng đánh giá độ tin cậy của **tập dữ liệu (dataset)** và **sản phẩm dữ liệu (data product)** trong doanh nghiệp. Nền tảng tổng hợp nhiều tín hiệu quản trị và vận hành thành điểm số có thể giải thích, giúp người dùng biết dữ liệu nào phù hợp để sử dụng, rủi ro nằm ở đâu và cần cải thiện điều gì.

Điểm số không thay thế việc kiểm tra dữ liệu hay đánh giá chuyên môn. Đây là một chỉ báo hỗ trợ ra quyết định, được tính từ các tiêu chí, trọng số và bằng chứng có thể theo dõi.

## Mục tiêu

- Xây dựng bộ tiêu chí đánh giá độ tin cậy dữ liệu nhất quán.
- Chuẩn hóa các tiêu chí về cùng thang điểm để có thể tổng hợp và so sánh.
- Giải thích điểm tổng quan bằng điểm thành phần, trọng số và dữ liệu đầu vào.
- Hiển thị các vấn đề cần ưu tiên xử lý, thay vì chỉ đưa ra một con số.
- Hỗ trợ đánh giá riêng lẻ một dataset hoặc data product và theo dõi điểm số theo thời gian.

## Đối tượng đánh giá

- **Dataset:** tập dữ liệu được lưu trữ hoặc cung cấp bởi một nguồn cụ thể.
- **Data product:** dữ liệu được đóng gói để phục vụ một hoặc nhiều trường hợp sử dụng, có thể bao gồm dataset, quy trình xử lý, giao diện truy cập, tài liệu và chủ sở hữu.

## Các tiêu chí đánh giá

Mỗi tiêu chí được chuẩn hóa về thang điểm từ **0 đến 100**. Điểm cao thể hiện mức độ tin cậy tốt hơn.

| Tiêu chí | Nội dung đánh giá |
|---|---|
| Chất lượng dữ liệu (Data Quality) | Tính đầy đủ, chính xác, nhất quán, hợp lệ và trùng lặp của dữ liệu. |
| Mức độ hoàn thiện lineage (Lineage Completeness) | Mức độ ghi nhận nguồn đầu vào, các bước biến đổi và đầu ra của dữ liệu. |
| Độ tin cậy nguồn dữ liệu (Provenance Reliability) | Uy tín, tính xác thực và lịch sử hoạt động của nhà cung cấp hoặc hệ thống nguồn. |
| Độ mới (Freshness) | Mức độ cập nhật so với tần suất hoặc thời hạn làm mới được kỳ vọng. |
| Bảo mật (Security) | Mức độ đáp ứng các yêu cầu bảo vệ dữ liệu, phân loại dữ liệu và biện pháp bảo mật liên quan. |
| Tuân thủ kiểm soát truy cập (Access-Control Compliance) | Mức độ phù hợp của quyền truy cập với chính sách, vai trò và nguyên tắc cấp quyền tối thiểu. |
| Quyền sở hữu (Ownership) | Mức độ xác định rõ người hoặc nhóm chịu trách nhiệm về dữ liệu. |
| Tài liệu (Documentation) | Mức độ đầy đủ, rõ ràng và cập nhật của mô tả, schema, định nghĩa và hướng dẫn sử dụng. |
| Lịch sử sự cố (Historical Incidents) | Mức độ ảnh hưởng của các sự cố dữ liệu đã xảy ra, có xét đến mức độ nghiêm trọng và thời gian. |

## Phương pháp tính điểm đề xuất

Điểm tổng thể được tính bằng tổng có trọng số của các điểm thành phần:

```text
Data Trust Score = Σ (điểm tiêu chí × trọng số tiêu chí) / 100
```

Trọng số khởi điểm đề xuất cho bài tập lớn:

| Tiêu chí | Trọng số |
|---|---:|
| Chất lượng dữ liệu | 20% |
| Lineage completeness | 15% |
| Provenance reliability | 12% |
| Freshness | 12% |
| Security | 12% |
| Access-control compliance | 10% |
| Ownership | 6% |
| Documentation | 6% |
| Historical incidents | 7% |
| **Tổng** | **100%** |

Các trọng số trên là cấu hình ban đầu, không phải chuẩn áp dụng cho mọi tổ chức. Có thể điều chỉnh theo lĩnh vực, mục đích sử dụng và mức độ nhạy cảm của dữ liệu. Điểm thành phần của lịch sử sự cố nên được quy đổi theo hướng **ít sự cố nghiêm trọng hoặc sự cố đã được khắc phục thì điểm càng cao**.

Khi một tiêu chí chưa có dữ liệu đánh giá, hệ thống cần đánh dấu là **chưa đủ thông tin**, không tự động coi là đạt điểm tối đa. Điểm tổng hợp cần nêu rõ cách xử lý tiêu chí thiếu, đồng thời hiển thị độ bao phủ đánh giá để người dùng không hiểu nhầm điểm số là đầy đủ.

## Tính năng dự kiến

- Khai báo và quản lý dataset, data product cùng thông tin chủ sở hữu.
- Nhập hoặc cập nhật bằng chứng đánh giá cho từng tiêu chí.
- Tính điểm tổng thể và điểm chi tiết theo cấu hình trọng số.
- Hiển thị mức độ bao phủ, các tiêu chí chưa có dữ liệu và các vấn đề ảnh hưởng đến điểm.
- Theo dõi lịch sử điểm số và sự cố để nhận biết xu hướng thay đổi.
- Tìm kiếm, lọc và so sánh các tài sản dữ liệu.
- Cung cấp giải thích để người dùng truy ngược từ điểm số tới tiêu chí và bằng chứng liên quan.

## Quy trình sử dụng dự kiến

1. Đăng ký dataset hoặc data product cần đánh giá.
2. Cung cấp thông tin mô tả, chủ sở hữu và bằng chứng cho các tiêu chí.
3. Chuẩn hóa điểm thành phần về thang 0–100.
4. Tính điểm tổng thể theo trọng số đã chọn.
5. Xem kết quả, độ bao phủ và các tiêu chí cần cải thiện.
6. Cập nhật đánh giá khi dữ liệu, chính sách hoặc sự cố thay đổi.

## Phạm vi bài tập lớn

Đề tài tập trung vào mô hình đánh giá, cách tính điểm và cách trình bày kết quả có thể giải thích. Các nguồn dữ liệu, cơ chế tự động thu thập bằng chứng, công nghệ triển khai và tích hợp hệ thống doanh nghiệp sẽ được xác định trong quá trình thiết kế và phát triển; README này không giả định rằng các tích hợp đó đã được triển khai.

## Công nghệ

- **Giao diện demo:** HTML, CSS và JavaScript thuần, không cần cài thư viện.
- **Module tính điểm:** Python 3.10+, dùng thư viện chuẩn.
- Giao diện và module Python hiện chạy độc lập. API, cơ sở dữ liệu và tích hợp
  backend sẽ được bổ sung khi nhóm thống nhất thiết kế.

## Giao diện demo

Mở trực tiếp `frontend/index.html` trong trình duyệt để xem giao diện. Có thể
chạy máy chủ tĩnh từ thư mục gốc repository:

```sh
python -m http.server 8000 --bind 127.0.0.1 --directory frontend
```

Sau đó truy cập [http://localhost:8000](http://localhost:8000). Máy chủ này chỉ
phục vụ các tệp giao diện, không phải API backend.

Demo dùng các tài sản dữ liệu mẫu để minh họa bảng tổng quan, điểm tổng hợp,
độ bao phủ và bảng chi tiết chín tiêu chí. Có thể chọn tài sản, tìm kiếm và
chỉnh sửa điểm để xem kết quả cập nhật ngay trong trình duyệt.

JavaScript mô phỏng công thức và trọng số mặc định của module Python. Ô điểm
để trống là chưa đủ thông tin, đóng góp 0 vào điểm tổng hợp và không được tính
vào độ bao phủ. Điểm 0 đã nhập vẫn được tính là có đánh giá.

Giao diện chưa gọi API, không dùng dịch vụ bên ngoài và không lưu thay đổi.
Các chỉnh sửa chỉ nằm trong bộ nhớ của trang; tải lại trang sẽ khôi phục dữ
liệu mẫu. Đây là bản demo giao diện, chưa phải hệ thống đánh giá thực tế.

## Module tính điểm Python

Module `backend/scoring.py` dùng thư viện chuẩn của **Python 3.10+**. Hàm
`calculate_trust_score(scores, weights=None)` nhận các điểm đã chuẩn hóa và dùng
trọng số đề xuất ở trên nếu không truyền cấu hình riêng.

```python
from backend.scoring import calculate_trust_score

result = calculate_trust_score({"data_quality": 80, "documentation": None})
print(result.score)              # 16.0 / 100
print(result.coverage)           # 11.111...% (1 trong 9 tiêu chí)
print(result.weighted_coverage)  # 20.0% trọng số đã có đánh giá
print(result.missing_criteria)   # 8 tiêu chí còn thiếu
```

- Tên khóa của chín tiêu chí được liệt kê trong `CRITERIA` và `DEFAULT_WEIGHTS`.
- Điểm phải là số thực hữu hạn trong khoảng 0–100; không chấp nhận boolean,
  chuỗi hoặc tên tiêu chí không xác định. Điểm lịch sử sự cố cũng phải được
  chuẩn hóa theo hướng điểm cao là tốt hơn trước khi gọi hàm.
- Cấu hình trọng số riêng phải có đúng chín tiêu chí, mỗi trọng số trong khoảng
  0–100 và tổng bằng 100 (sai số số thực cho phép là `1e-9`).
- Khóa bị bỏ qua hoặc có giá trị `None` được đánh dấu là **chưa đủ thông tin**,
  đóng góp 0 vào tổng và vẫn giữ mẫu số 100; không phân bổ lại trọng số.
  Điểm 0 đã được đánh giá vẫn được tính vào độ bao phủ.
- `coverage` là tỷ lệ phần trăm số tiêu chí đã đánh giá; `weighted_coverage`
  là tổng trọng số của các tiêu chí đó. `missing_criteria` liệt kê các tiêu chí
  thiếu theo thứ tự trong README, kể cả tiêu chí có trọng số 0.
- Nếu chưa có điểm nào, kết quả là điểm 0, độ bao phủ 0% và cả chín tiêu chí
  đều thiếu. Đây là trạng thái chưa đủ thông tin để đánh giá.

Chạy các lệnh sau từ thư mục gốc repository:

```sh
python -m backend
python -m unittest discover -s tests -v
```

## Cấu trúc repository hiện tại

```text
.
├── .gitignore
├── README.md
├── backend/
│   ├── __init__.py
│   ├── __main__.py          # Ví dụ chạy module tính điểm
│   └── scoring.py           # Tiêu chí, kiểm tra đầu vào và công thức
├── frontend/
│   ├── index.html           # Giao diện demo
│   └── assets/
│       ├── styles.css       # Bố cục và định dạng
│       └── app.js           # Dữ liệu mẫu và tương tác trong trình duyệt
└── tests/
    ├── __init__.py
    └── test_data_trust_score.py
```

## Thành viên

Nhóm có thể bổ sung danh sách thành viên, phân công nhiệm vụ và thông tin môn học tại đây.
