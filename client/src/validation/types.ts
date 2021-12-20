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
