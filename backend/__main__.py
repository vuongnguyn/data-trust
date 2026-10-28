"""Run a small assessment with incomplete evidence: python -m backend."""

from .scoring import calculate_trust_score


def main() -> None:
    result = calculate_trust_score({
        "data_quality": 80,
        "lineage_completeness": 90,
        "provenance_reliability": 85,
        "freshness": 75,
        "security": 95,
        "access_control_compliance": 90,
        "ownership": 100,
        "documentation": None,
        "historical_incidents": None,
    })
    print(f"Data Trust Score: {result.score:.2f}/100")
    print(f"Criterion coverage: {result.coverage:.2f}%")
    print(f"Weighted coverage: {result.weighted_coverage:.2f}%")
    print(f"Missing criteria: {', '.join(result.missing_criteria) or 'none'}")
    print("Missing criteria contribute zero; weights are not redistributed.")


if __name__ == "__main__":
    main()
