import { koinerChainEnUs } from '@koiner/chain/i18n/en-us';
import { koinerContractsEnUs } from '@koiner/contracts/i18n/en-us';
import { koinerNetworkEnUs } from '@koiner/network/i18n/en-us';
import { koinerTokenizeEnUs } from '@koiner/tokenize/i18n/en-us';
import { errorEnUs } from 'src/i18n/en-US/error';

export default {
  failed: 'Action failed',
  success: 'Action was successful',
  error: errorEnUs,
  appvise: {
    board: {
      itemCountOf: 'of',
      pagination: {
        pagingInfo: 'Showing {0}-{1} of {2}',
        pageSizeChangeLabel: 'Row count:',
        gotoPageLabel: 'Go to page:',
        noDataAvailable: 'No data',
      },
    },
    form: {
      action: {
        cancel: { label: 'Cancel' },
        create: { label: 'Create' },
        save: { label: 'Save' },
        add: { label: 'Add' },
      },
    },
  },
  koiner: {
    chain: koinerChainEnUs,
    contracts: koinerContractsEnUs,
    ecosystem: {
      project: {
        form: {
          addProject: {
            sections: {
              projectDetails: 'Project details',
              contactInformation: 'Contact information',
            },
            name: {
              label: 'Project name',
            },
            description: {
              label: 'Project description in 140 chars',
            },
            links: {
              label: 'Links to your project, github & socials',
            },
            contactName: {
              label: 'Your name',
            },
            contactDiscord: {
              label: 'Your Discord handle',
            },
            submit: {
              label: 'Submit project',
            },
            messages: {
              error: 'Project could not be submitted due to an error',
              success: 'Project submitted',
            },
          },
        },
      },
    },
    network: koinerNetworkEnUs,
    tokenize: koinerTokenizeEnUs,
  },
};
