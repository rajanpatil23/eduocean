import { pmpConfig } from './pmp-config';
import { cisspConfig } from './cissp-config';
import { awsConfig } from './aws-config';
import { scrumConfig } from './scrum-config';
import { azureConfig } from './azure-config';
import { itilConfig } from './itil-config';

// Export all configs as an array
export const allMasterclasses = [
  pmpConfig,
  cisspConfig,
  awsConfig,
  scrumConfig,
  azureConfig,
  itilConfig
];

// Export individual configs
export {
  pmpConfig,
  cisspConfig,
  awsConfig,
  scrumConfig,
  azureConfig,
  itilConfig
};

// Helper function to get config by slug
export const getMasterclassBySlug = (slug) => {
  return allMasterclasses.find(mc => mc.slug === slug);
};

// Helper function to get active masterclasses
export const getActiveMasterclasses = () => {
  return allMasterclasses.filter(mc => !mc.isPast);
};

// Helper function to get past masterclasses
export const getPastMasterclasses = () => {
  return allMasterclasses.filter(mc => mc.isPast);
};
