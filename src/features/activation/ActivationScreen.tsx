import React from 'react';
import { ActivationUiState, ActivationUiEvent, ActivationFormState } from './ActivationTypes';
import { 
  ActivationHeader, 
  PhoneNumberInput, 
  NetworkNameInput, 
  ActivationKeyInput, 
  TrialPackageCard, 
  ActivateButton, 
  DeviceBindingNotice,
  ActivationLoadingContent,
  ActivationErrorBanner,
  ActivationNoInternetContent
} from './components/ActivationComponents';

interface ActivationScreenProps {
  uiState: ActivationUiState;
  onEvent: (event: ActivationUiEvent) => void;
}

export const ActivationScreen: React.FC<ActivationScreenProps> = ({ uiState, onEvent }) => {
  const renderForm = (form: ActivationFormState) => {
    return (
      <div className="flex flex-col h-full overflow-y-auto px-6 bg-[#F6F8F9]">
        <ActivationHeader />
        
        <TrialPackageCard 
          selected={form.isTrialSelected} 
          onToggle={(val) => onEvent({ type: 'onTrialSelected', value: val })} 
        />

        <div className="flex flex-col w-full">
          <PhoneNumberInput 
            value={form.phone} 
            onChange={(val) => onEvent({ type: 'onPhoneNumberChanged', value: val })} 
          />
          <NetworkNameInput 
            value={form.networkName} 
            onChange={(val) => onEvent({ type: 'onNetworkNameChanged', value: val })} 
          />
          
          {!form.isTrialSelected && (
            <ActivationKeyInput 
              value={form.activationKey} 
              onChange={(val) => onEvent({ type: 'onActivationKeyChanged', value: val })} 
            />
          )}
        </div>

        <div className="mt-4 pb-8 flex flex-col items-center w-full">
          <ActivateButton 
            onClick={() => onEvent({ type: 'onActivateClick' })} 
            isTrialSelected={form.isTrialSelected}
          />
          <DeviceBindingNotice />
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full min-h-[850px] flex flex-col bg-[#F6F8F9] max-w-md mx-auto shadow-2xl overflow-hidden relative sm:rounded-[2.5rem] sm:border-[12px] sm:border-gray-900">
      {/* Mobile status bar mockup */}
      <div className="h-8 w-full flex justify-end items-center px-5 pt-2 bg-transparent shrink-0">
        <div className="flex space-x-1.5 space-x-reverse text-gray-300">
          <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-gray-400 opacity-60"></div>
          <div className="w-[18px] h-[18px] rounded-full border-[1.5px] border-gray-400 opacity-60"></div>
          <div className="w-6 h-[16px] rounded-[3px] border-[1.5px] border-gray-400 opacity-60"></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col w-full bg-[#F6F8F9]">
        {uiState.status === 'Form' && renderForm(uiState.form)}
        {uiState.status === 'Loading' && <ActivationLoadingContent />}
        {uiState.status === 'InvalidLicense' && (
          <ActivationErrorBanner 
            onRetryClick={() => onEvent({ type: 'onRetryClick' })} 
          />
        )}
        {uiState.status === 'NoInternet' && (
          <ActivationNoInternetContent 
            onRetryClick={() => onEvent({ type: 'onRetryClick' })} 
          />
        )}
      </div>
      
      {/* Home indicator mockup */}
      <div className="h-6 w-full flex justify-center items-center shrink-0 bg-transparent mb-1">
        <div className="w-1/3 h-1 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};
