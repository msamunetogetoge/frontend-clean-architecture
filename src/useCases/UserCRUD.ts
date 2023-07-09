// useCases/User.ts

import { User } from '../domain/entities/User';
import { UserAPI } from '../interfaceAdapters/api/UserAPI';

export class UserCRUD {
    static async getFirstUser(): Promise<User | undefined> {
        return UserAPI.getFirstUser();
    }
}
