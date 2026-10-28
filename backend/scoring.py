"""Calculate the README's Data Trust Score from normalized criterion scores.

Missing scores (omitted keys or None) contribute zero without redistributing
their weights. Coverage and missing_criteria distinguish missing evidence from
an assessed score of zero. Historical incidents must already be normalized so
that fewer severe incidents or resolved incidents receive higher scores.
"""

from collections.abc import Mapping
from dataclasses import dataclass
from math import fsum, isclose, isfinite
from numbers import Real
from types import MappingProxyType


DEFAULT_WEIGHTS: Mapping[str, float] = MappingProxyType({
    "data_quality": 20.0,
    "lineage_completeness": 15.0,
    "provenance_reliability": 12.0,
    "freshness": 12.0,
    "security": 12.0,
    "access_control_compliance": 10.0,
    "ownership": 6.0,
    "documentation": 6.0,
    "historical_incidents": 7.0,
})
CRITERIA = tuple(DEFAULT_WEIGHTS)


@dataclass(frozen=True)
class TrustScoreResult:
    """Score and coverage percentages, plus missing criteria in README order.

    coverage counts assessed criteria out of nine; weighted_coverage counts
    their share of the configured weights. An actual score of zero is assessed.
    """

    score: float
    coverage: float
    weighted_coverage: float
    missing_criteria: tuple[str, ...]


def _validate_number(value: object, label: str) -> float:
    if isinstance(value, bool) or not isinstance(value, Real):
        raise ValueError(f"{label} must be a finite real number from 0 to 100")
    if not 0 <= value <= 100 or not isfinite(value):
        raise ValueError(f"{label} must be a finite real number from 0 to 100")
    return float(value)


def calculate_trust_score(
    scores: Mapping[str, float | None],
    weights: Mapping[str, float] | None = None,
) -> TrustScoreResult:
    """Validate inputs and calculate sum(score * weight) / 100.

    Scores may omit criteria or use None for missing evidence. Unknown keys,
    booleans, nonnumeric values, nonfinite values and values outside 0..100
    raise ValueError. Inputs must be mappings, otherwise TypeError is raised.

    Custom weights must include exactly the nine CRITERIA and total 100
    (absolute floating-point tolerance 1e-9). Zero weights are allowed.
    Coverage is a percentage from 0 to 100, not a fraction. Empty/all-missing
    scores return zero score and coverage with every criterion marked missing.
    Inputs are not modified, and scores are not rounded for display.
    """
    if not isinstance(scores, Mapping):
        raise TypeError("scores must be a mapping of criterion names to scores")
    if weights is None:
        weights = DEFAULT_WEIGHTS
    if not isinstance(weights, Mapping):
        raise TypeError("weights must be a mapping of criterion names to weights")

    unknown = tuple(key for key in scores if key not in CRITERIA)
    if unknown:
        raise ValueError(f"Unknown score criteria: {unknown!r}")
    if set(weights) != set(CRITERIA):
        raise ValueError(f"weights must include exactly these nine criteria: {CRITERIA!r}")

    valid_weights = {
        key: _validate_number(weights[key], f"Weight for {key}")
        for key in CRITERIA
    }
    if not isclose(fsum(valid_weights.values()), 100.0, rel_tol=0.0, abs_tol=1e-9):
        raise ValueError("weights must sum to 100")

    valid_scores = {
        key: _validate_number(scores[key], f"Score for {key}")
        for key in CRITERIA
        if scores.get(key) is not None
    }
    return TrustScoreResult(
        score=fsum(valid_scores[key] * valid_weights[key] for key in valid_scores) / 100,
        coverage=100 * len(valid_scores) / len(CRITERIA),
        weighted_coverage=fsum(valid_weights[key] for key in valid_scores),
        missing_criteria=tuple(key for key in CRITERIA if key not in valid_scores),
    )
