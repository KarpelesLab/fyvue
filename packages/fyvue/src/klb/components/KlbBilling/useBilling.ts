import { rest } from '../../helpers/rest';
import {
  KlbAPIBillingHistory,
  KlbAPISetupIntent,
  KlbAPIUserLocation,
  KlbBillingAndLocation,
} from '../../KlbApiTypes';

export function useBilling() {
  return {
    setupPaymentIntent: (method = 'Stripe') => {
      return new Promise<KlbAPISetupIntent | null>((resolve) => {
        rest<KlbAPISetupIntent>('Realm/PaymentMethod:setup', 'POST', {
          method: method,
        })
          .then((_result) => {
            if (_result && _result.result == 'success') {
              resolve(_result);
            } else {
              resolve(null);
            }
          })
          .catch(() => {
            resolve(null);
          });
      });
    },
    getUserBillingAndLoc: () => {
      return new Promise<KlbBillingAndLocation | null>((resolve) => {
        rest<KlbAPIBillingHistory>('User/Billing', 'GET')
          .then((_userBilling) => {
            if (
              _userBilling &&
              _userBilling.data &&
              _userBilling.data.length != 0
            ) {
              rest<KlbAPIUserLocation>(
                `User/Location/${_userBilling.data[0].User_Location__}`,
                'GET'
              )
                .then((_userLocation) => {
                  if (_userLocation && _userLocation.result == 'success') {
                    resolve({
                      location: _userLocation.data,
                      billing: _userBilling.data[0],
                    });
                  } else {
                    resolve(null);
                  }
                })
                .catch(() => {
                  resolve(null);
                });
            } else {
              resolve(null);
            }
          })
          .catch(() => {
            resolve(null);
          });
      });
    },
  };
}
