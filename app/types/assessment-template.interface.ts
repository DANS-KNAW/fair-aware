export interface AssessmentTemplate {
  name: string;
  actor: AssessmentActor;
  result: AssessmentResult;
  status: AssessmentStatus;
  subject: AssessmentSubject;
  version: string;
  published: boolean;
  timestamp: string;
  principles: Principle[];
  organisation: AssessmentOrganisation;
  assessment_type: AssessmentType;
}

interface AssessmentActor {
  id: number;
  name: string;
}

interface AssessmentResult {
  ranking: number | null;
  compliance: number | null;
}

enum AssessmentStatus {
  Public = "PUBLIC",
  Private = "PRIVATE",
}

interface AssessmentSubject {
  id: string;
  name: string;
  type: string;
  db_id?: number;
}

interface Principle {
  id: string;
  name: string;
  criteria: Criterion[];
  description: string;
}

interface Criterion {
  id: string;
  name: string;
  metric: Metric;
  imperative: CriterionImperative;
  description: string;
}

enum CriterionImperative {
  Must = "must",
  Should = "should",
}

interface Metric {
  type: MetricType;
  algorithm: MetricAlgorithm;
  benchmark: Benchmark;
  result: number | null;
  value: number | null;
  tests: AssessmentTest[];
}

enum MetricType {
  Number = "number",
}

enum MetricAlgorithm {
  Sum = "sum",
  Single = "single",
}

type AssessmentTest = TestValue | TestBinary;

interface TestBinary {
  type: "binary";
  id: string;
  name: string;
  description?: string;
  guidance: Guidance;
  text: string;
  result: number | null;
  value: boolean | null;
  evidence_url?: EvidenceURL[];
}

interface TestValue {
  id: string;
  name: string;
  description?: string;
  guidance?: Guidance;
  type: "value";
  text: string;
  result: number | null;
  value: number | null;
  threshold?: number | null;
  value_name: string;
  threshold_name?: string;
  threshold_locked?: boolean;
  benchmark: Benchmark;
  evidence_url?: EvidenceURL[];
}

interface EvidenceURL {
  url: string;
  description?: string;
}

interface Guidance {
  id: string;
  description: string;
}

type Benchmark = Record<string, string | number>;

interface AssessmentOrganisation {
  id: string;
  name: string;
}

interface AssessmentType {
  id: number;
  name: string;
}
