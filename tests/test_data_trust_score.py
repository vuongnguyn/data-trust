"""Regression tests for the README scoring rules and missing-evidence policy."""

import unittest

from backend.scoring import CRITERIA, DEFAULT_WEIGHTS, calculate_trust_score


class DataTrustScoreTests(unittest.TestCase):
    def test_default_weights_match_readme(self):
        expected = {
            "data_quality": 20,
            "lineage_completeness": 15,
            "provenance_reliability": 12,
            "freshness": 12,
            "security": 12,
            "access_control_compliance": 10,
            "ownership": 6,
            "documentation": 6,
            "historical_incidents": 7,
        }
        self.assertEqual(dict(DEFAULT_WEIGHTS), expected)
        self.assertEqual(CRITERIA, tuple(expected))

    def test_complete_mixed_assessment(self):
        scores = dict(zip(CRITERIA, (100, 80, 75, 90, 85, 70, 100, 50, 60)))
        result = calculate_trust_score(scores)
        # Contributions: 20 + 12 + 9 + 10.8 + 10.2 + 7 + 6 + 3 + 4.2.
        self.assertAlmostEqual(result.score, 82.2)
        self.assertEqual(result.coverage, 100)
        self.assertEqual(result.weighted_coverage, 100)
        self.assertEqual(result.missing_criteria, ())

    def test_full_score_boundaries(self):
        for score in (0, 100):
            with self.subTest(score=score):
                result = calculate_trust_score(dict.fromkeys(CRITERIA, score))
                self.assertEqual(result.score, score)
                self.assertEqual(result.coverage, 100)
                self.assertEqual(result.weighted_coverage, 100)
                self.assertEqual(result.missing_criteria, ())

    def test_missing_scores_keep_fixed_denominator_and_zero_is_evaluated(self):
        result = calculate_trust_score({
            "data_quality": 100,
            "freshness": 0,
            "documentation": None,
        })
        self.assertEqual(result.score, 20)
        self.assertAlmostEqual(result.coverage, 200 / 9)
        self.assertEqual(result.weighted_coverage, 32)
        self.assertEqual(result.missing_criteria, (
            "lineage_completeness",
            "provenance_reliability",
            "security",
            "access_control_compliance",
            "ownership",
            "documentation",
            "historical_incidents",
        ))

    def test_no_evidence(self):
        for scores in ({}, dict.fromkeys(CRITERIA, None)):
            with self.subTest(scores=scores):
                result = calculate_trust_score(scores)
                self.assertEqual(result.score, 0)
                self.assertEqual(result.coverage, 0)
                self.assertEqual(result.weighted_coverage, 0)
                self.assertEqual(result.missing_criteria, CRITERIA)

    def test_custom_weights_and_missing_zero_weight_criteria(self):
        weights = dict.fromkeys(CRITERIA, 0)
        weights.update(data_quality=50, freshness=50)
        result = calculate_trust_score({"data_quality": 80, "freshness": 60}, weights)
        self.assertEqual(result.score, 70)
        self.assertAlmostEqual(result.coverage, 200 / 9)
        self.assertEqual(result.weighted_coverage, 100)
        self.assertEqual(len(result.missing_criteria), 7)

    def test_fractional_scores_and_weights(self):
        weights = dict.fromkeys(CRITERIA, 100 / 9)
        result = calculate_trust_score(dict.fromkeys(CRITERIA, 72.5), weights)
        self.assertAlmostEqual(result.score, 72.5)
        self.assertAlmostEqual(result.weighted_coverage, 100)

    def test_rejects_invalid_scores(self):
        for value in (-0.1, 100.1, float("nan"), float("inf"),
                      -float("inf"), True, False, "90", complex(1, 0)):
            with self.subTest(value=value):
                with self.assertRaises(ValueError):
                    calculate_trust_score({"data_quality": value})

    def test_rejects_unknown_score_criteria_even_when_missing(self):
        for value in (90, None):
            with self.subTest(value=value):
                with self.assertRaises(ValueError):
                    calculate_trust_score({"data_qualty": value})

    def test_rejects_invalid_weight_values(self):
        for value in (-1, 101, float("nan"), float("inf"),
                      -float("inf"), True, False, "20", None, complex(1, 0)):
            with self.subTest(value=value):
                weights = dict(DEFAULT_WEIGHTS, data_quality=value)
                with self.assertRaises(ValueError):
                    calculate_trust_score({}, weights)

    def test_rejects_weight_totals_other_than_100(self):
        for weights in (
            dict(DEFAULT_WEIGHTS, data_quality=19.99),
            dict(DEFAULT_WEIGHTS, data_quality=20.01),
            dict.fromkeys(CRITERIA, 0),
        ):
            with self.subTest(weights=weights):
                with self.assertRaises(ValueError):
                    calculate_trust_score({}, weights)

    def test_rejects_incomplete_or_unknown_weight_criteria(self):
        missing = dict(DEFAULT_WEIGHTS)
        del missing["documentation"]
        extra = dict(DEFAULT_WEIGHTS, unexpected=0)
        replaced = dict(missing, unexpected=6)
        for weights in ({}, missing, extra, replaced):
            with self.subTest(weights=weights):
                with self.assertRaises(ValueError):
                    calculate_trust_score({}, weights)

    def test_inputs_are_not_mutated(self):
        scores = {"data_quality": 75, "documentation": None}
        weights = dict(DEFAULT_WEIGHTS)
        original_scores = scores.copy()
        original_weights = weights.copy()
        calculate_trust_score(scores, weights)
        self.assertEqual(scores, original_scores)
        self.assertEqual(weights, original_weights)


if __name__ == "__main__":
    unittest.main()
