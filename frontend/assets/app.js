"use strict";

// Browser-only fixtures. Changes live in memory and disappear on refresh.
(() => {
  const criteria = [
    ["data_quality", "Chất lượng dữ liệu", "Data Quality", 20],
    ["lineage_completeness", "Hoàn thiện lineage", "Lineage Completeness", 15],
    ["provenance_reliability", "Độ tin cậy nguồn", "Provenance Reliability", 12],
    ["freshness", "Độ mới", "Freshness", 12],
    ["security", "Bảo mật", "Security", 12],
    ["access_control_compliance", "Tuân thủ truy cập", "Access-Control Compliance", 10],
    ["ownership", "Quyền sở hữu", "Ownership", 6],
    ["documentation", "Tài liệu", "Documentation", 6],
    ["historical_incidents", "Lịch sử sự cố", "Historical Incidents", 7],
  ].map(([key, name, english, weight]) => ({ key, name, english, weight }));
  const fixtures = [
    {
      id: "customer360", name: "Customer 360", type: "Data product", owner: "Data Platform",
      description: "Hồ sơ khách hàng hợp nhất từ CRM, giao dịch và các kênh tương tác.",
      values: [80, 90, 85, 75, 95, 90, 100, null, null],
    },
    {
      id: "orders", name: "Đơn hàng bán lẻ", type: "Dataset", owner: "Commerce Analytics",
      description: "Dữ liệu giao dịch bán lẻ được tổng hợp theo ngày.",
      values: [96, 92, 95, 98, 90, 95, 100, 85, 90],
    },
    {
      id: "campaigns", name: "Hiệu quả chiến dịch", type: "Dataset", owner: "Marketing Data",
      description: "Chỉ số tiếp cận và chuyển đổi từ các chiến dịch tiếp thị.",
      values: [70, null, 75, 60, 85, 80, 100, 65, null],
    },
  ];
  const initialAssets = () => fixtures.map(({ values, ...asset }) => ({
    ...asset, scores: Object.fromEntries(criteria.map((criterion, i) => [criterion.key, values[i]])),
  }));
  let assets = initialAssets();
  let selectedId = assets[0].id;
  const $ = (id) => document.getElementById(id);
  const format = (number, digits = 1) => number.toLocaleString("vi-VN", {
    minimumFractionDigits: 0, maximumFractionDigits: digits,
  });
  const node = (tag, className = "", text = "") => {
    const item = document.createElement(tag);
    item.className = className;
    item.textContent = text;
    return item;
  };
  const currentAsset = () => assets.find((asset) => asset.id === selectedId);

  // Keep the README denominator of 100. Null contributes zero, never 100.
  function calculate(scores) {
    const assessed = criteria.filter(({ key }) => scores[key] !== null && scores[key] !== undefined);
    return {
      score: assessed.reduce((sum, { key, weight }) => sum + scores[key] * weight, 0) / 100,
      coverage: assessed.length * 100 / criteria.length,
      weightedCoverage: assessed.reduce((sum, { weight }) => sum + weight, 0),
      missing: criteria.filter((criterion) => !assessed.includes(criterion)),
    };
  }

  function renderSummary() {
    const results = assets.map((asset) => calculate(asset.scores));
    $("portfolio-count").textContent = assets.length;
    $("portfolio-average").textContent = format(results.reduce((sum, result) => sum + result.score, 0) / assets.length, 2);
    $("portfolio-coverage").textContent = `${format(results.reduce((sum, result) => sum + result.weightedCoverage, 0) / assets.length)}%`;
    $("portfolio-missing").textContent = results.filter((result) => result.missing.length).length;
  }

  function renderAssessment() {
    const asset = currentAsset();
    const result = calculate(asset.scores);
    $("asset-select").value = selectedId;
    $("asset-title").textContent = asset.name;
    $("asset-description").textContent = asset.description;
    $("asset-type").textContent = asset.type;
    $("asset-owner").textContent = asset.owner;
    $("score-value").textContent = format(result.score, 2);
    $("score-ring").style.setProperty("--score", result.score);
    $("score-caption").textContent = result.missing.length ? "Đánh giá chưa đầy đủ" : "Đã đánh giá đủ 9 tiêu chí";
    $("criterion-coverage").textContent = `${format(result.coverage)}%`;
    $("weight-coverage").textContent = `${format(result.weightedCoverage)}%`;
    $("missing-count").textContent = result.missing.length;
    $("missing-list").replaceChildren(...(result.missing.length
      ? result.missing.map(({ name }) => node("li", "", name))
      : [node("li", "", "Đã có điểm cho cả 9 tiêu chí.")]));
    $("assessment-note").textContent = result.missing.length
      ? `${9 - result.missing.length}/9 tiêu chí đã đánh giá. Tiêu chí thiếu đóng góp 0; trọng số không được phân bổ lại.`
      : "9/9 tiêu chí đã đánh giá. Điểm tổng hợp được tính theo trọng số đề xuất trong README.";

    $("criteria-body").replaceChildren(...criteria.map(({ key, name, english, weight }) => {
      const score = asset.scores[key];
      const missing = score === null || score === undefined;
      const row = node("tr");
      const title = node("td", "criterion-name");
      title.append(node("strong", "", name), node("small", "", english));
      const weightCell = node("td");
      weightCell.append(node("span", "weight-pill", `${weight}%`));
      const scoreCell = node("td");
      scoreCell.append(node("span", missing ? "missing-badge" : "score-number", missing ? "Chưa có dữ liệu" : format(score, 2)));
      const barCell = node("td");
      const bar = node("div", "progress-track");
      bar.setAttribute("aria-hidden", "true");
      const fill = node("div", "progress-fill");
      fill.style.width = `${missing ? 0 : score}%`;
      bar.append(fill);
      barCell.append(bar);
      row.append(title, weightCell, scoreCell, barCell, node("td", "contribution", format((score ?? 0) * weight / 100, 2)));
      return row;
    }));
  }

  const searchText = (text) => text.toLocaleLowerCase("vi-VN").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");
  function renderAssets() {
    const query = searchText($("asset-search").value.trim());
    const matches = assets.filter((asset) => searchText(`${asset.name} ${asset.type} ${asset.owner}`).includes(query));
    const rows = matches.map((asset) => {
      const result = calculate(asset.scores);
      const row = node("tr");
      row.classList.toggle("selected", asset.id === selectedId);
      const name = node("td", "asset-name");
      name.append(node("strong", "", asset.name), node("small", "", asset.description));
      const type = node("td");
      type.append(node("span", "type-badge", asset.type));
      const action = node("td");
      const button = node("button", "table-action", asset.id === selectedId ? "Đang xem" : "Xem đánh giá");
      button.type = "button";
      button.setAttribute("aria-label", `Xem đánh giá ${asset.name}`);
      button.addEventListener("click", () => selectAsset(asset.id));
      action.append(button);
      row.append(name, type, node("td", "", asset.owner), node("td", "score-number", format(result.score, 2)),
        node("td", "", `${9 - result.missing.length}/9 tiêu chí`), action);
      return row;
    });
    if (!rows.length) {
      const row = node("tr", "empty-row");
      const cell = node("td", "", "Không tìm thấy tài sản phù hợp. Hãy thử từ khóa khác.");
      cell.colSpan = 6;
      row.append(cell);
      rows.push(row);
    }
    $("assets-body").replaceChildren(...rows);
  }

  function selectAsset(id) {
    selectedId = id;
    renderAssessment();
    renderAssets();
    $("live-status").textContent = `Đang xem đánh giá ${currentAsset().name}.`;
  }

  function openEditor() {
    const asset = currentAsset();
    $("form-error").textContent = "";
    $("assessment-fields").replaceChildren(...criteria.map(({ key, name, weight }) => {
      const field = node("div", "field-row");
      const label = node("label", "", name);
      label.htmlFor = `input-${key}`;
      label.append(node("small", "", `Trọng số ${weight}%`));
      const input = node("input");
      Object.assign(input, { type: "number", min: "0", max: "100", step: "any", id: `input-${key}`,
        name: key, value: asset.scores[key] ?? "", placeholder: "Chưa có dữ liệu" });
      input.setAttribute("aria-label", `${name}, điểm từ 0 đến 100, để trống nếu chưa có dữ liệu`);
      field.append(label, input);
      return field;
    }));
    $("assessment-dialog").showModal();
  }

  $("asset-select").replaceChildren(...assets.map((asset) => {
    const option = node("option", "", asset.name);
    option.value = asset.id;
    return option;
  }));
  $("asset-select").addEventListener("change", (event) => selectAsset(event.target.value));
  $("asset-search").addEventListener("input", renderAssets);
  $("edit-assessment").addEventListener("click", openEditor);
  $("cancel-edit").addEventListener("click", () => $("assessment-dialog").close());
  $("assessment-form").noValidate = true;
  $("assessment-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const scores = {};
    for (const { key, name } of criteria) {
      const input = $(`input-${key}`);
      const value = input.value.trim() === "" ? null : Number(input.value);
      if (input.validity.badInput || (value !== null && (!Number.isFinite(value) || value < 0 || value > 100))) {
        $("form-error").textContent = `${name}: nhập số từ 0 đến 100 hoặc để trống nếu chưa có dữ liệu.`;
        input.focus();
        return;
      }
      scores[key] = value;
    }
    currentAsset().scores = scores;
    renderAssessment();
    renderSummary();
    renderAssets();
    $("assessment-dialog").close();
    $("live-status").textContent = `Đã cập nhật đánh giá mẫu cho ${currentAsset().name}. Thay đổi chỉ có hiệu lực trong phiên này.`;
  });
  $("reset-demo").addEventListener("click", () => {
    assets = initialAssets();
    $("asset-search").value = "";
    renderAssessment();
    renderSummary();
    renderAssets();
    $("live-status").textContent = "Đã khôi phục toàn bộ dữ liệu mẫu.";
  });
  renderAssessment();
  renderSummary();
  renderAssets();
})();
