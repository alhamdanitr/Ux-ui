import React, { useState } from 'react';
import { DashboardState, DashboardEvent } from './DashboardTypes';
import { 
  DashboardTopBar, 
  DashboardGreetingSection, 
  SystemStatusCard,
  CustomerBalanceCard,
  SalesCardsRow,
  QuickActionsGrid,
  RecentOperationsSection,
  DashboardFloatingActionButton,
  DashboardBottomNavigation,
  DashboardPermissionDialog
} from './components/DashboardComponents';

const initialState: DashboardState = {
  networkName: 'شبكة kayan',
  greetingDate: 'صباح الخير — الأحد، ٢٦ يوليو',
  subscriptionExpiry: '٢٤ أكتوبر ٢٠٢٦',
  remainingMessages: 100,
  systemStatus: {
    isActive: true,
    title: 'النظام يعمل بشكل سليم',
    description: 'معالجة مبالغ الفئات المعرفة فقط'
  },
  customerBalance: {
    amount: 0,
    accountsCount: 0,
    availableCardsCount: 0
  },
  sales: {
    daily: { amount: 0, cardsCount: 0 },
    monthly: { amount: 0, cardsCount: 0 }
  },
  hasRecentOperations: false,
  showPermissionDialog: true // Show it initially to demonstrate it based on the prompt's request
};

interface MainDashboardScreenProps {
  onHelpClick?: () => void;
}

export const MainDashboardScreen: React.FC<MainDashboardScreenProps> = ({ onHelpClick }) => {
  const [state, setState] = useState<DashboardState>(initialState);
  const [currentTab, setCurrentTab] = useState('home');

  const dispatch = (event: DashboardEvent) => {
    console.log('Event Triggered:', event.type);
    
    switch (event.type) {
      case 'onPermissionDismiss':
      case 'onPermissionConfirm':
        setState(prev => ({ ...prev, showPermissionDialog: false }));
        break;
      case 'onHomeSelected':
        setCurrentTab('home');
        break;
      case 'onReportsSelected':
        setCurrentTab('reports');
        break;
      case 'onOffersSelected':
        setCurrentTab('offers');
        break;
      case 'onAccountsSelected':
        setCurrentTab('accounts');
        break;
      case 'onCardsSelected':
        setCurrentTab('cards');
        break;
      // Other events would be handled by actual view model/business logic
      default:
        break;
    }
  };

  return (
    <div className="w-full h-full bg-[#F6F8F9] relative flex flex-col overflow-hidden" dir="rtl">
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto w-full no-scrollbar pb-24">
        <DashboardTopBar 
          networkName={state.networkName}
          onSettingsClick={() => dispatch({ type: 'onSettingsClick' })}
          onUtilityClick={() => {
            dispatch({ type: 'onUtilityClick' });
            if (onHelpClick) onHelpClick();
          }}
        />
        
        <DashboardGreetingSection 
          greetingDate={state.greetingDate}
          subscriptionExpiry={state.subscriptionExpiry}
          remainingMessages={state.remainingMessages}
        />
        
        <SystemStatusCard 
          isActive={state.systemStatus.isActive}
          title={state.systemStatus.title}
          description={state.systemStatus.description}
        />
        
        <CustomerBalanceCard 
          amount={state.customerBalance.amount}
          accounts={state.customerBalance.accountsCount}
          cards={state.customerBalance.availableCardsCount}
        />
        
        <SalesCardsRow 
          daily={{ amount: state.sales.daily.amount, cards: state.sales.daily.cardsCount }}
          monthly={{ amount: state.sales.monthly.amount, cards: state.sales.monthly.cardsCount }}
        />
        
        <QuickActionsGrid 
          onActionClick={(action) => {
            switch(action) {
              case 'manualDirectSale': dispatch({ type: 'onManualDirectSaleClick' }); break;
              case 'salesPoints': dispatch({ type: 'onSalesPointsAccountsClick' }); break;
              case 'blockedNumbers': dispatch({ type: 'onBlockedNumbersClick' }); break;
              case 'importFiles': dispatch({ type: 'onImportFilesManagementClick' }); break;
            }
          }}
        />
        
        <RecentOperationsSection 
          hasOperations={state.hasRecentOperations}
          onAllClick={() => dispatch({ type: 'onAllTransactionsClick' })}
        />
      </div>

      <DashboardFloatingActionButton 
        onClick={() => dispatch({ type: 'onFloatingActionClick' })} 
      />
      
      <DashboardBottomNavigation 
        currentTab={currentTab}
        onTabSelect={(tab) => {
          switch(tab) {
            case 'home': dispatch({ type: 'onHomeSelected' }); break;
            case 'reports': dispatch({ type: 'onReportsSelected' }); break;
            case 'offers': dispatch({ type: 'onOffersSelected' }); break;
            case 'accounts': dispatch({ type: 'onAccountsSelected' }); break;
            case 'cards': dispatch({ type: 'onCardsSelected' }); break;
          }
        }}
      />

      {state.showPermissionDialog && (
        <DashboardPermissionDialog 
          onConfirm={() => dispatch({ type: 'onPermissionConfirm' })}
          onDismiss={() => dispatch({ type: 'onPermissionDismiss' })}
        />
      )}
    </div>
  );
};
