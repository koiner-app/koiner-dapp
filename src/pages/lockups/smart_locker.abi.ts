import { Abi } from 'koilib/lib/interface';

export const smartLockerAbi: Abi = {
  methods: {
    get_smart_lock: {
      input: 'smart_locker.get_smart_lock_arguments',
      output: 'smart_locker.get_smart_lock_result',
      description: 'Get smart lock',
      entryPoint: 1040619632,
      readOnly: true,
    },
    get_vault: {
      input: 'smart_locker.get_vault_arguments',
      output: 'smart_locker.get_vault_result',
      description: 'Get vault for address',
      entryPoint: 2899174343,
      readOnly: true,
    },
    lock: {
      input: 'smart_locker.lock_arguments',
      output: 'smart_locker.lock_result',
      description: 'Smart lock tokens',
      entryPoint: 201524614,
      readOnly: false,
    },
    withdraw: {
      input: 'smart_locker.withdraw_arguments',
      output: 'smart_locker.withdraw_result',
      description: 'Withdraw locked tokens',
      entryPoint: 3262063323,
      readOnly: false,
    },
  },
  types: {
    nested: {
      smart_locker: {
        nested: {
          get_smart_lock_arguments: {
            fields: {
              account: {
                type: 'bytes',
                id: 1,
                options: {
                  '(koinos.btype)': 'ADDRESS',
                },
              },
              smartLockIndex: {
                type: 'uint64',
                id: 2,
                options: {
                  jstype: 'JS_STRING',
                },
              },
            },
          },
          get_smart_lock_result: {
            fields: {
              value: {
                type: 'smart_lock_object',
                id: 1,
              },
            },
          },
          get_vault_arguments: {
            fields: {
              account: {
                type: 'bytes',
                id: 1,
                options: {
                  '(koinos.btype)': 'ADDRESS',
                },
              },
            },
          },
          get_vault_result: {
            fields: {
              value: {
                type: 'vault_object',
                id: 1,
              },
            },
          },
          lock_arguments: {
            fields: {
              beneficiary: {
                type: 'bytes',
                id: 1,
                options: {
                  '(koinos.btype)': 'ADDRESS',
                },
              },
              sender: {
                type: 'bytes',
                id: 2,
                options: {
                  '(koinos.btype)': 'ADDRESS',
                },
              },
              tokenAddress: {
                type: 'bytes',
                id: 3,
                options: {
                  '(koinos.btype)': 'ADDRESS',
                },
              },
              value: {
                type: 'uint64',
                id: 4,
                options: {
                  jstype: 'JS_STRING',
                },
              },
              releaseTime: {
                type: 'uint64',
                id: 5,
              },
            },
          },
          lock_result: {
            fields: {
              value: {
                type: 'bool',
                id: 1,
              },
            },
          },
          withdraw_arguments: {
            fields: {
              account: {
                type: 'bytes',
                id: 1,
                options: {
                  '(koinos.btype)': 'ADDRESS',
                },
              },
              smartLockIndex: {
                type: 'uint64',
                id: 2,
                options: {
                  jstype: 'JS_STRING',
                },
              },
              value: {
                type: 'uint64',
                id: 3,
                options: {
                  jstype: 'JS_STRING',
                },
              },
            },
          },
          withdraw_result: {
            fields: {
              value: {
                type: 'bool',
                id: 1,
              },
            },
          },
          smart_lock_object: {
            fields: {
              beneficiary: {
                type: 'bytes',
                id: 1,
                options: {
                  '(koinos.btype)': 'ADDRESS',
                },
              },
              sender: {
                type: 'bytes',
                id: 2,
                options: {
                  '(koinos.btype)': 'ADDRESS',
                },
              },
              tokenAddress: {
                type: 'bytes',
                id: 3,
                options: {
                  '(koinos.btype)': 'ADDRESS',
                },
              },
              value: {
                type: 'uint64',
                id: 4,
                options: {
                  jstype: 'JS_STRING',
                },
              },
              releaseTime: {
                type: 'uint64',
                id: 5,
              },
              createdAt: {
                type: 'uint64',
                id: 6,
              },
              amountWithdrawn: {
                type: 'uint64',
                id: 7,
                options: {
                  jstype: 'JS_STRING',
                },
              },
              closed: {
                type: 'bool',
                id: 8,
              },
            },
          },
          vault_object: {
            fields: {
              account: {
                type: 'bytes',
                id: 1,
                options: {
                  '(koinos.btype)': 'ADDRESS',
                },
              },
              smartLockCount: {
                type: 'uint64',
                id: 2,
              },
              openSmartLocks: {
                rule: 'repeated',
                type: 'uint64',
                id: 3,
              },
              closedSmartLocks: {
                rule: 'repeated',
                type: 'uint64',
                id: 4,
              },
            },
          },
          locked_event: {
            fields: {
              beneficiary: {
                type: 'bytes',
                id: 1,
                options: {
                  '(koinos.btype)': 'ADDRESS',
                },
              },
              smartLockIndex: {
                type: 'uint64',
                id: 2,
                options: {
                  jstype: 'JS_STRING',
                },
              },
              sender: {
                type: 'bytes',
                id: 3,
                options: {
                  '(koinos.btype)': 'ADDRESS',
                },
              },
              tokenAddress: {
                type: 'bytes',
                id: 4,
                options: {
                  '(koinos.btype)': 'ADDRESS',
                },
              },
              value: {
                type: 'uint64',
                id: 5,
                options: {
                  jstype: 'JS_STRING',
                },
              },
              releaseTime: {
                type: 'uint64',
                id: 6,
              },
              createdAt: {
                type: 'uint64',
                id: 7,
              },
            },
          },
          withdraw_event: {
            fields: {
              account: {
                type: 'bytes',
                id: 1,
                options: {
                  '(koinos.btype)': 'ADDRESS',
                },
              },
              smartLockIndex: {
                type: 'uint64',
                id: 2,
                options: {
                  jstype: 'JS_STRING',
                },
              },
              tokenAddress: {
                type: 'bytes',
                id: 3,
                options: {
                  '(koinos.btype)': 'ADDRESS',
                },
              },
              value: {
                type: 'uint64',
                id: 4,
                options: {
                  jstype: 'JS_STRING',
                },
              },
            },
          },
        },
      },
    },
  },
};
