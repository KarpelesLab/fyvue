import { rest } from '../../../utils/rest';
import { KlbAPICatalogCart, KlbAPIOrder } from '../../../dts/klb';

export function useCart() {
  return {
    resetCart: () => {
      return new Promise<boolean>((resolve, reject) => {
        rest('Catalog/Cart/@:reset', 'POST', {})
          .then((_resetResult) => {
            if (_resetResult && _resetResult.result == 'success') {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(() => {
            reject(false);
          });
      });
    },
    createOrder(billingLocation) {
      return rest<KlbAPIOrder>('Catalog/Cart/@:createOrder', 'POST', {
        Billing: billingLocation,
      });
    },
    getCart() {
      return rest<KlbAPICatalogCart>('/Catalog/Cart/@', 'GET');
    },
    delProduct: (productKey: string) => {
      return new Promise<boolean>((resolve, reject) => {
        rest('Catalog/Cart/@:process', 'POST', {
          request: productKey + `=0`,
        })
          .then((_addProductCartResult) => {
            if (
              _addProductCartResult &&
              _addProductCartResult.result == 'success'
            ) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(() => {
            reject(false);
          });
      });
    },
    addProduct: (productUuid: string, meta: string) => {
      return new Promise<boolean>((resolve, reject) => {
        rest('Catalog/Cart/@:process', 'POST', { request: productUuid + meta })
          .then((_addProductCartResult) => {
            if (
              _addProductCartResult &&
              _addProductCartResult.result == 'success'
            ) {
              resolve(true);
            } else {
              resolve(false);
            }
          })
          .catch(() => {
            reject(false);
          });
      });
    },
  };
}
