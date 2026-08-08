export interface ActivationFormState {
  phone: string;
  networkName: string;
  activationKey: string;
  isTrialSelected: boolean;
}

export type ActivationUiState =
  | { status: 'Form'; form: ActivationFormState }
  | { status: 'Loading' }
  | { status: 'InvalidLicense'; message: string }
  | { status: 'NoInternet' };

export type ActivationUiEvent =
  | { type: 'onPhoneNumberChanged'; value: string }
  | { type: 'onNetworkNameChanged'; value: string }
  | { type: 'onActivationKeyChanged'; value: string }
  | { type: 'onTrialSelected'; value: boolean }
  | { type: 'onActivateClick' }
  | { type: 'onRetryClick' };
