export interface SettingsState {
  networkName: string;
  autoProcessMessages: boolean;
  processSpecificAmountsOnly: boolean;
  processOldMessages: boolean;
  databaseSize: string;
  darkMode: boolean;
  autoSendDailySummary: boolean;
  posBalanceRequestCode: string;
  posBalanceRequestDailyLimit: string;
}

export type SettingsUiEvent = 
  | { type: 'onBackClick' }
  | { type: 'onEditNetworkNameClick' }
  | { type: 'onAutoProcessMessagesToggle'; value: boolean }
  | { type: 'onProcessSpecificAmountsOnlyToggle'; value: boolean }
  | { type: 'onProcessOldMessagesToggle'; value: boolean }
  | { type: 'onSimSettingsClick' }
  | { type: 'onRenewSubscriptionClick' }
  | { type: 'onBatterySettingsClick' }
  | { type: 'onPosSettingsClick' }
  | { type: 'onTemplateSimulationClick' }
  | { type: 'onCustomerTemplatesClick' }
  | { type: 'onRefreshDatabaseSizeClick' }
  | { type: 'onExportLedgerClick' }
  | { type: 'onCleanLogsClick' }
  | { type: 'onDeepCleanClick' }
  | { type: 'onNetworkNameSave'; value: string }
  | { type: 'onNetworkNameCancel' }
  | { type: 'onHelpCenterClick' }
  | { type: 'onDarkModeToggle'; value: boolean }
  | { type: 'onAutoSendDailySummaryToggle'; value: boolean }
  | { type: 'onPosBalanceRequestSettingsClick' }
  | { type: 'onPosBalanceRequestSettingsSave'; code: string; limit: string }
  | { type: 'onPosBalanceRequestSettingsCancel' };

