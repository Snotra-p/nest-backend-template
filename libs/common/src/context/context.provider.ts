import { ClsServiceManager } from 'nestjs-cls';
import { SESSION_DATA_KEY } from '@libs/common/src/module/auth/constants/auth.constants';
import { SessionData } from '@libs/common/src/module/auth/type/session-data';

export class ContextProvider {
  static get<T>(key: string | symbol): T {
    return ClsServiceManager.getClsService().get(key);
  }

  static set<T>(key: string | symbol, value: T): void {
    ClsServiceManager.getClsService().set(key, value);
  }

  static getSessionData(): SessionData {
    return this.get(SESSION_DATA_KEY);
  }

  static setSessionData(data: SessionData): void {
    this.set(SESSION_DATA_KEY, data);
  }
}
