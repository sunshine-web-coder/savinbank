import React, { createContext, useState, ReactNode, useContext } from 'react';

interface ReceiverContextProps {
  bankName: string;
  accountNumber: string;
  setBankName: (name: string) => void;
  setAccountNumber: (number: string) => void;
  setReceiverDetails: (name: string, account: string) => void;
}

const ReceiverContext = createContext<ReceiverContextProps | undefined>(undefined);

export const ReceiverProvider = ({ children }: { children: ReactNode }) => {
  const [bankName, setBankName] = useState<string>('');
  const [accountNumber, setAccountNumber] = useState<string>('');

  // Function to set both bank name and account number
  const setReceiverDetails = (name: string, account: string) => {
    setBankName(name);
    setAccountNumber(account);
  };

  return <ReceiverContext.Provider value={{ bankName, accountNumber, setBankName, setAccountNumber, setReceiverDetails }}>{children}</ReceiverContext.Provider>;
};

// Custom hook to use Receiver context
export const useReceiver = () => {
  const context = useContext(ReceiverContext);
  if (!context) {
    throw new Error('useReceiver must be used within a ReceiverProvider');
  }
  return context;
};
