import React, { useState } from 'react';
import { ActivationScreen } from './features/activation/ActivationScreen';
import { ActivationUiState, ActivationUiEvent, ActivationFormState } from './features/activation/ActivationTypes';
import { MainDashboardScreen } from './features/dashboard/MainDashboardScreen';
import { HelpCenterScreen } from './features/help/HelpCenterScreen';
import { SettingsScreen } from './features/settings/SettingsScreen';
import { RenewSubscriptionScreen } from './features/settings/RenewSubscriptionScreen';
import { SimSettingsScreen } from './features/settings/SimSettingsScreen';
import { TemplateSimulationScreen } from './features/settings/TemplateSimulationScreen';

import { WalletsAndPosScreen } from './features/wallets/WalletsAndPosScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'Activation' | 'Dashboard' | 'HelpCenter' | 'Settings' | 'RenewSubscription' | 'SimSettings' | 'WalletsAndPos' | 'TemplateSimulation'>('Settings');
  const [formState, setFormState] = useState<ActivationFormState>({
    phone: '773303455',
    networkName: 'كيان تك',
    activationKey: '',
    isTrialSelected: true, // Corresponds to Image 1 out of the box
  });

  const [uiStateStatus, setUiStateStatus] = useState<ActivationUiState['status']>('Form');

  // Derive the active UI State
  let activeUiState: ActivationUiState;
  switch (uiStateStatus) {
    case 'Form':
      activeUiState = { status: 'Form', form: formState };
      break;
    case 'Loading':
      activeUiState = { status: 'Loading' };
      break;
    case 'InvalidLicense':
      activeUiState = { status: 'InvalidLicense', message: '' }; // Message is statically matched to image inside component
      break;
    case 'NoInternet':
      activeUiState = { status: 'NoInternet' };
      break;
  }

  const handleUiEvent = (event: ActivationUiEvent) => {
    switch (event.type) {
      case 'onPhoneNumberChanged':
        setFormState(prev => ({ ...prev, phone: event.value }));
        break;
      case 'onNetworkNameChanged':
        setFormState(prev => ({ ...prev, networkName: event.value }));
        break;
      case 'onActivationKeyChanged':
        setFormState(prev => ({ ...prev, activationKey: event.value }));
        break;
      case 'onTrialSelected':
        setFormState(prev => ({ ...prev, isTrialSelected: event.value }));
        break;
      case 'onActivateClick':
        // For testing purposes, we'll navigate to Dashboard on activate
        setCurrentScreen('Dashboard');
        break;
      case 'onRetryClick':
        setUiStateStatus('Form');
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#E2E8F0] py-12 flex flex-col items-center">
      <div className="mb-8 p-4 bg-white rounded-2xl shadow-sm max-w-md w-full flex flex-wrap gap-2 justify-center" dir="rtl">
        <h2 className="w-full text-center font-bold text-sm mb-2 text-gray-700">التنقل بين الشاشات</h2>
        <button 
          onClick={() => setCurrentScreen('Activation')}
          className={`px-3 py-2 rounded-xl text-[13px] font-bold ${currentScreen === 'Activation' ? 'bg-[#247A7B] text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          شاشة التفعيل (Screen 01)
        </button>
        <button 
          onClick={() => setCurrentScreen('Dashboard')}
          className={`px-3 py-2 rounded-xl text-[13px] font-bold ${currentScreen === 'Dashboard' ? 'bg-[#247A7B] text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          الرئيسية (Screen 02)
        </button>
        <button 
          onClick={() => setCurrentScreen('HelpCenter')}
          className={`px-3 py-2 rounded-xl text-[13px] font-bold ${currentScreen === 'HelpCenter' ? 'bg-[#247A7B] text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          مركز المساعدة (Screen 03)
        </button>
        <button 
          onClick={() => setCurrentScreen('Settings')}
          className={`px-3 py-2 rounded-xl text-[13px] font-bold ${currentScreen === 'Settings' ? 'bg-[#247A7B] text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          الإعدادات (Screen 04)
        </button>
        <button 
          onClick={() => setCurrentScreen('RenewSubscription')}
          className={`px-3 py-2 rounded-xl text-[13px] font-bold ${currentScreen === 'RenewSubscription' ? 'bg-[#247A7B] text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          تجديد الترخيص
        </button>
        <button 
          onClick={() => setCurrentScreen('SimSettings')}
          className={`px-3 py-2 rounded-xl text-[13px] font-bold ${currentScreen === 'SimSettings' ? 'bg-[#247A7B] text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          إعدادات شرائح الاتصال
        </button>
        <button 
          onClick={() => setCurrentScreen('WalletsAndPos')}
          className={`px-3 py-2 rounded-xl text-[13px] font-bold ${currentScreen === 'WalletsAndPos' ? 'bg-[#247A7B] text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          المحافظ ونقاط البيع
        </button>
      </div>
      
      {currentScreen === 'Activation' && (
        <div className="mb-8 p-4 bg-white rounded-2xl shadow-sm max-w-md w-full flex flex-wrap gap-2 justify-center" dir="rtl">
          <h2 className="w-full text-center font-bold text-sm mb-2 text-gray-700">حالات شاشة التفعيل</h2>
          <button 
            onClick={() => { setUiStateStatus('Form'); setFormState({ phone: '773303455', networkName: 'كيان تك', activationKey: '', isTrialSelected: true }); }}
            className={`px-3 py-2 rounded-xl text-[13px] font-bold ${uiStateStatus === 'Form' && formState.isTrialSelected ? 'bg-[#247A7B] text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            1. Empty / Checked
          </button>
          <button 
            onClick={() => { setUiStateStatus('Form'); setFormState({ phone: '773303455', networkName: 'كيان تك', activationKey: '', isTrialSelected: false }); }}
            className={`px-3 py-2 rounded-xl text-[13px] font-bold ${uiStateStatus === 'Form' && !formState.isTrialSelected ? 'bg-[#247A7B] text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            2. Filled / Unchecked
          </button>
          <button 
            onClick={() => setUiStateStatus('Loading')}
            className={`px-3 py-2 rounded-xl text-[13px] font-bold ${uiStateStatus === 'Loading' ? 'bg-[#247A7B] text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            3. Loading
          </button>
          <button 
            onClick={() => setUiStateStatus('InvalidLicense')}
            className={`px-3 py-2 rounded-xl text-[13px] font-bold ${uiStateStatus === 'InvalidLicense' ? 'bg-[#D93838] text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            4. Invalid/Used
          </button>
          <button 
            onClick={() => setUiStateStatus('NoInternet')}
            className={`px-3 py-2 rounded-xl text-[13px] font-bold ${uiStateStatus === 'NoInternet' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-700'}`}
          >
            5. No Internet
          </button>
        </div>
      )}

      {/* Frame wrapper simulating phone screen */}
      <div className="w-full max-w-md mx-auto shadow-2xl overflow-hidden" style={{ height: '850px', borderRadius: '40px' }}>
        {currentScreen === 'Activation' && (
          <ActivationScreen uiState={activeUiState} onEvent={handleUiEvent} />
        )}
        {currentScreen === 'Dashboard' && (
          <MainDashboardScreen onHelpClick={() => setCurrentScreen('HelpCenter')} />
        )}
        {currentScreen === 'HelpCenter' && (
          <HelpCenterScreen onBackClick={() => setCurrentScreen('Dashboard')} />
        )}
        {currentScreen === 'Settings' && (
          <SettingsScreen 
            onBackClick={() => setCurrentScreen('Dashboard')} 
            onHelpCenterClick={() => setCurrentScreen('HelpCenter')}
            onRenewSubscriptionClick={() => setCurrentScreen('RenewSubscription')}
            onSimSettingsClick={() => setCurrentScreen('SimSettings')}
            onPosSettingsClick={() => setCurrentScreen('WalletsAndPos')}
            onTemplateSimulationClick={() => setCurrentScreen('TemplateSimulation')}
          />
        )}
        {currentScreen === 'RenewSubscription' && (
          <RenewSubscriptionScreen onBackClick={() => setCurrentScreen('Settings')} />
        )}
        {currentScreen === 'SimSettings' && (
          <SimSettingsScreen onBackClick={() => setCurrentScreen('Settings')} />
        )}
        {currentScreen === 'WalletsAndPos' && (
          <WalletsAndPosScreen onBackClick={() => setCurrentScreen('Settings')} />
        )}
        {currentScreen === 'TemplateSimulation' && (
          <TemplateSimulationScreen onBackClick={() => setCurrentScreen('Settings')} />
        )}
      </div>
    </div>
  );
}
