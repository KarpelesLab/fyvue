import { rest } from '../../helpers/rest';
import {
  KlbAPIOrder,
  KlbAPIOrders,
  KlbAPIResultUnknown,
  KlbOrder,
  KlbAPIOrderProcess,
} from '../../KlbApiTypes';

export function useOrder() {
  return {
    process(data: any, orderUuid: string) {
      return rest<KlbAPIOrderProcess>(
        `Order/${orderUuid}:process`,
        'POST',
        data
      );
    },
    getOrder(orderUuid: string) {
      return rest<KlbAPIOrder>(`Order/${orderUuid}`, 'GET');
    },
    getOrders() {
      return rest<KlbAPIResultUnknown>('Order/', 'GET');
    },
    getLastUnfinishedOrder() {
      return new Promise<KlbOrder | null>((resolve) => {
        rest<KlbAPIOrders>('Order/', 'GET', {
          results_per_page: 1,
          sort: 'Created',
          Status: 'pending',
        })
          .then((_result) => {
            if (
              _result &&
              _result.result == 'success' &&
              _result.data.length > 0
            ) {
              resolve(_result.data[0]);
            }
            resolve(null);
          })
          .catch(() => {
            resolve(null);
          });
      });
    },
  };
}
