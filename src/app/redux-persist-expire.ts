import { createTransform } from 'redux-persist';
import traverse from 'traverse';

const PERSIST_EXPIRE_DEFAULT_KEY = 'persistExpiresAt';

interface ConfigType {
  expireKey: string;
  defaultState: Record<string, unknown> | null;
}

export default function (config: ConfigType) {
  config = config || {};
  config.expireKey = config.expireKey || PERSIST_EXPIRE_DEFAULT_KEY;
  config.defaultState = config.defaultState || {};

  function dateToUnix(date: Date) {
    return +(date.getTime() / 1000).toFixed(0);
  }

  function inbound(state: Record<string, unknown> | null) {
    if (!state) return state;

    return state;
  }

  function outbound(state: Record<string, unknown> | null) {
    if (!state) return state;

    const validState = traverse(state).forEach(function (value) {
      if (!value || typeof value !== 'object') {
        return;
      }

      const hasExpireKey = Object.prototype.hasOwnProperty.call(
        value,
        config.expireKey
      );

      if (!hasExpireKey) {
        return;
      }

      const expireDate = value[config.expireKey];

      if (!expireDate) {
        return;
      }

      if (dateToUnix(new Date(expireDate)) < dateToUnix(new Date())) {
        this.update(config.defaultState);
      }
    });

    return validState;
  }

  return createTransform(inbound, outbound);
}
