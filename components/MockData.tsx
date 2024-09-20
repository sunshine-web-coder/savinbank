import { SvgProps } from 'react-native-svg';
import {
  EwalletIcon,
  MoreIcon,
  PayBillIcon,
  TransferIcon,
  HomeIcon,
  HomeIconActive,
  CardIcon,
  CardIconActive,
  ScanIcon,
  HistoryIcon,
  HistoryIconActive,
  ProfileIcon,
  ProfileIconActive
} from './SvgIcon';
import images from '@/constants/images';
import { ImageSourcePropType } from 'react-native';

export interface AccountIconGroup {
  label: string;
  icon: (props: SvgProps) => JSX.Element;
  url: string;
}
export interface UserData {
  label?: string;
  fullName?: string;
  accountNumber?: string;
  icon?: (props: SvgProps) => JSX.Element;
  url?: string;
  userAvatar?: ImageSourcePropType;
}

export interface TransactionHistory {
  type: string;
  title: string;
  amount: string;
  date: string;
  status: string;
  // icon: (props: SvgProps) => JSX.Element; // Add the icon property later
}

export interface Notification {
  title: string;
  name?: string;
  description?: string;
  amount?: number;
  time: string;
  status: string;
}

export const mainAccountIcon: AccountIconGroup[] = [
  {
    label: 'Transfer',
    icon: TransferIcon,
    url: '/transfer-fund'
  },
  {
    label: 'E-Wallet',
    icon: EwalletIcon,
    url: '/e-wallet'
  },
  {
    label: 'Pay Bills',
    icon: PayBillIcon,
    url: '/pay-bills'
  },
  {
    label: 'More',
    icon: MoreIcon,
    url: '/features'
  }
];

export const featuresScreenIcon = {
  mainFeatures: [
    {
      label: 'Transfer',
      icon: TransferIcon,
      url: '/transfer'
    },
    {
      label: 'E-Wallet',
      icon: EwalletIcon,
      url: '/e-wallet'
    },
    {
      label: 'Pay Bills',
      icon: PayBillIcon,
      url: '/pay-bills'
    }
  ],
  moreFeatures: [
    {
      label: 'More',
      icon: MoreIcon,
      url: '/features'
    }
  ]
};

export const sendMoneyData: UserData[] = [
  {
    fullName: 'Raisha Anthony',
    accountNumber: '376237827498',
    userAvatar: images.avatar1
  },
  {
    fullName: 'Kevin Ferrari',
    accountNumber: '326734434344',
    userAvatar: images.avatar2
  },
  {
    fullName: 'Vanya Roland',
    accountNumber: '634394734343',
    userAvatar: images.avatar3
  },
  {
    fullName: 'Kunle Bolanle',
    accountNumber: '853648934434',
    userAvatar: images.profileImg
  },
  {
    fullName: 'Emmanuella Kelechi',
    accountNumber: '2323938973366',
    userAvatar: images.avatar4
  }
];

export const tabScreens = [
  {
    name: 'home',
    title: 'Home',
    Icon: HomeIcon,
    IconActive: HomeIconActive
  },
  {
    name: 'card',
    title: 'Card',
    Icon: CardIcon,
    IconActive: CardIconActive
  },
  {
    name: 'qr-pay-scan',
    title: '',
    Icon: ScanIcon,
    IconActive: ScanIcon // Use the same icon for both active and inactive states
  },
  {
    name: 'history',
    title: 'History',
    Icon: HistoryIcon,
    IconActive: HistoryIconActive
  },
  {
    name: 'account',
    title: 'Account',
    Icon: ProfileIcon,
    IconActive: ProfileIconActive
  }
];

export const transactionHistory: TransactionHistory[] = [
  {
    type: 'E-Wallet-Top-Up',
    title: 'E-Wallet Top Up',
    amount: '₦75.22',
    date: 'Aug 9th, 16:4',
    status: 'Success'
  },
  {
    type: 'Airtime-Top-Up',
    title: 'Airtime Top Up',
    amount: '-₦75.00',
    date: 'Aug 7th, 13:2',
    status: 'Success'
  },
  {
    type: 'Transfer-To',
    title: 'Bunmi Collins',
    amount: '-₦75.34',
    date: 'Jul 6th, 16:4',
    status: 'Success'
  },
  {
    type: 'Transfer-From',
    title: 'Kunle Wasiu Balogun',
    amount: '₦75.55',
    date: 'Aug 5th, 16:4',
    status: 'Success'
  },
  {
    type: 'Pay-Electricity-Bills',
    title: 'Pay Electricity Bills',
    amount: '-₦75.30',
    date: 'Aug 4th, 16:4',
    status: 'Success'
  },
  {
    type: 'Tv-Bill-Pay',
    title: 'TV',
    amount: '-₦75.11',
    date: 'Aug 3rd, 16:4',
    status: 'Success'
  },
  {
    type: 'QR-Pay',
    title: 'QR Pay to Mobil Station Bodija',
    amount: '-₦75.47',
    date: 'Aug 2nd, 16:4',
    status: 'Success'
  },
  {
    type: 'Transfer-To',
    title: 'Micheal Smith',
    amount: '-₦100.84',
    date: 'Jul 8th, 14:20',
    status: 'Success'
  },
  {
    type: 'E-Wallet-Top-Up',
    title: 'E-Wallet Top Up',
    amount: '₦200.99',
    date: 'Jul 6th, 10:15',
    status: 'Success'
  },
  {
    type: 'Pay-Electricity-Bills',
    title: 'Pay Electricity Bills',
    amount: '-₦120.13',
    date: 'Jul 3rd, 09:45',
    status: 'Success'
  },
  {
    type: 'Transfer-From',
    title: 'Sandra Ijeoma',
    amount: '₦50.33',
    date: 'Jul 1st, 18:00',
    status: 'Success'
  },
  {
    type: 'Airtime-Top-Up',
    title: 'Airtime Top Up',
    amount: '-₦150.56',
    date: 'Jun 30th, 13:30',
    status: 'Success'
  }
];

export const notifications: Notification[] = [
  {
    title: 'Credit Alert',
    name: 'Adetokunbo Adeyemi',
    amount: 12000,
    time: '09:14',
    status: 'Today'
  },
  {
    title: 'Credit Alert',
    name: 'Balarabe Aminu Sani ',
    amount: 100000,
    time: '09:00',
    status: 'Today'
  },
  {
    title: 'Your transfer was successful',
    name: 'Nnadi Chukwuemeka Ifeanyi ',
    amount: 28000,
    time: '09:00',
    status: 'Today'
  },
  {
    title: 'Your transfer was successful',
    name: 'Olawale Folashade Temitope ',
    amount: 50000,
    time: '09:00',
    status: 'Today'
  },
  {
    title: 'Scan Pay Success to Subway Outlets',
    description: 'Get a big discount in this month!',
    time: '08:30',
    status: 'Today'
  },
  {
    title: 'Extra Discount for Purchase of Travel Ticket',
    description: "Let's immediately purchase your travel ticket only here!",
    time: '08:00',
    status: 'Today'
  },
  {
    title: 'Deposit Cash Easily Without a Card',
    description: "Let's deposit cash into your account easily, you don't.",
    time: '14:00',
    status: 'Yesterday'
  },
  {
    title: "Don't Miss Out on Daily Interests.",
    description: 'Your electricity bill payment in May was successful.',
    time: '16:45',
    status: 'Yesterday'
  }
];
