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

Công nghệ và kiến trúc triển khai sẽ được cập nhật sau khi nhóm thống nhất thiết kế.

## Cấu trúc repository hiện tại

```text
.
├── README.md
```

## Thành viên

Nhóm có thể bổ sung danh sách thành viên, phân công nhiệm vụ và thông tin môn học tại đây.
