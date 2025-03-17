import { CampaignType } from '@/services/hooks/campaign/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Type for campaign creation (excluding auto-generated fields)
type CreateCampaign = Omit<CampaignType, 'id' | 'createdAt' | 'updatedAt'>;

const initialState: CreateCampaign = {
  businessId: '',
  rewardId: '',
  name: '',
  signupPoints: '',
  customDomain: '',

  // Earn point settings
  earnStaffScanQR: true,
  earnEnterCode: true,
  earnStaffPersonalCode: true,
  earnGiveStaffNumber: true,

  // Redeem point settings
  redeemStaffScanQR: true,
  redeemStaffPersonalCode: true,
  redeemGiveStaffNumber: true,

  // Top bar content
  topTitle: '',
  topHeadline: '',

  // Home section
  homeTitle: 'Welcome to our new loyalty program',
  homeText:
    'This new way of saving is our biggest and best savings program ever.',
  headerImg: '',

  // Columns
  columnsTitle: '',
  col1Title: '',
  col1Text: '',
  col1Img: '',
  col2Title: '',
  col2Text: '',
  col2Img: '',
  col3Title: '',
  col3Text: '',
  col3Img: '',

  // Earn section
  earnTitle: 'Earn Points',
  earnText: 'Get points for every dollar you spend.',
  earnImg: '',

  // Redeem section
  redeemTitle: 'Rewards',
  redeemText: 'Earn points and choose from these rewards.',
  redeemImg: '',

  // Contact section
  contactTitle: 'Contact Us',
  contactText: 'Get in touch.',
  contactImg: '',

  // Colors
  background: '#EEEEEE',
  text: '#333333',
  primaryBg: '#111111',
  primaryText: '#ffffff',
  secondaryBg: '#0D47A1',
  secondaryText: '#ffffff',

  // Mobile colors
  mobileNavBg: '#0D47A1',
  mobileNavText: '#ffffff',
  mobileNavActiveBg: '#0D47A1',
  mobileNavActiveText: '#ffffff',
};

const createCampaignSlice = createSlice({
  name: 'createCampaign',
  initialState,
  reducers: {
    // Update any campaign field
    updateCampaignField: (
      state,
      action: PayloadAction<{ [K in keyof CreateCampaign]?: CreateCampaign[K] }>
    ) => {
      return { ...state, ...action.payload };
    },

    // Update business reference
    setBusinessId: (state, action: PayloadAction<{ id: string }>) => {
      state.businessId = action.payload.id;
    },

    // Update reward reference
    setRewardId: (state, action: PayloadAction<{ id: string }>) => {
      state.rewardId = action.payload.id;
    },

    // Update settings group
    updateEarnSettings: (
      state,
      action: PayloadAction<{
        earnStaffScanQR?: boolean;
        earnEnterCode?: boolean;
        earnStaffPersonalCode?: boolean;
        earnGiveStaffNumber?: boolean;
      }>
    ) => {
      return { ...state, ...action.payload };
    },

    // Update colors group
    updateColors: (
      state,
      action: PayloadAction<{
        background?: string;
        text?: string;
        primaryBg?: string;
        primaryText?: string;
        secondaryBg?: string;
        secondaryText?: string;
      }>
    ) => {
      return { ...state, ...action.payload };
    },

    // Reset form
    resetCampaign: () => initialState,
  },
});

export const {
  updateCampaignField,
  setBusinessId,
  setRewardId,
  updateEarnSettings,
  updateColors,
  resetCampaign,
} = createCampaignSlice.actions;

// Selectors
export const selectCreateCampaign = (state: {
  createCampaign: CreateCampaign;
}) => state.createCampaign;

export default createCampaignSlice.reducer;
