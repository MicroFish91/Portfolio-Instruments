export interface LoginForm {
  email: string;
  password: string;
}

export interface RegistrationForm {
  email: string;
  password: string;
  confirmPassword?: string;
  firstName: string;
  lastName: string;
}

export interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface ResetPasswordForm {
  email: string;
}

export interface ChangeNotificationForm {
  rebalanceThreshold: number;
  vpThreshold: number;
}

export interface HoldingForm {
  holdingTitle: string;
  holdingTicker: string;
  holdingLocation: string;
  holdingAmount: string;
  holdingExpenseRatio: string;
  accountType: "Traditional" | "Roth" | "Taxable";
  holdingVP: boolean;
  assetType: string;
}

export interface SnapshotForm {
  snapshotTitle: string;
  snapshotDate: string;
  snapshotNotes: string;
}

export interface CustomBenchmarkAssetsForm {
  assetCategory: string;
  assetPercentage: string;
}

export interface CustomBenchmarkForm {
  benchmarkTitle: string;
  benchmarkShortDescription: string;
  benchmarkLongDescription: string;
  benchmarkCAGR: string;
  benchmarkStdDev: string;
  benchmarkWorstDrawdown: string;
  benchmarkLongestDrawdown: string;
}

export interface CustomBenchmarkFormConverted {
  assetCategories: string[];
  assetPercentages: number[];
  benchmarkTitle: string;
  benchmarkShortDescription: string;
  benchmarkLongDescription: string;
  benchmarkCAGR: number;
  benchmarkStdDev: number;
  benchmarkWorstDrawdown: number;
  benchmarkLongestDrawdown: number;
}

export interface exportDataForm {
  exportDataLength: string;
}

export interface cagForm {
  annualExpenses: string;
  annualInflation: string;
  annualReturn: string;
  numberOfYears: string;
  principal: string;
  periodsPerYear: string;
  recurringInvestment: string;
  safeWithdrawalRate: string;
  stdDeviation: string;
}

export interface cagUserSettingsForm extends cagForm {
  principal: never;
}

export interface cagFormConverted {
  annualExpenses: number;
  annualInflation: number;
  annualReturn: number;
  numberOfYears: number;
  principal: number;
  periodsPerYear: number;
  recurringInvestment: number;
  safeWithdrawalRate: number;
  stdDeviation: number;
}
