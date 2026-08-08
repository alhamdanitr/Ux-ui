export interface DashboardState {
  networkName: string;
  greetingDate: string;
  subscriptionExpiry: string;
  remainingMessages: number;
  systemStatus: {
    isActive: boolean;
    title: string;
    description: string;
  };
  customerBalance: {
    amount: number;
    accountsCount: number;
    availableCardsCount: number;
  };
  sales: {
    daily: { amount: number; cardsCount: number };
    monthly: { amount: number; cardsCount: number };
  };
  hasRecentOperations: boolean;
  showPermissionDialog: boolean;
}

export type DashboardEvent =
  | { type: 'onSettingsClick' }
  | { type: 'onUtilityClick' }
  | { type: 'onManualDirectSaleClick' }
  | { type: 'onSalesPointsAccountsClick' }
  | { type: 'onBlockedNumbersClick' }
  | { type: 'onImportFilesManagementClick' }
  | { type: 'onAllTransactionsClick' }
  | { type: 'onFloatingActionClick' }
  | { type: 'onHomeSelected' }
  | { type: 'onReportsSelected' }
  | { type: 'onOffersSelected' }
  | { type: 'onAccountsSelected' }
  | { type: 'onCardsSelected' }
  | { type: 'onPermissionConfirm' }
  | { type: 'onPermissionDismiss' };
