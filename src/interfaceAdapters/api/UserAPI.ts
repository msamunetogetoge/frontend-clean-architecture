// interfaceAdapters/api/UserAPI.ts

import { User } from '../../domain/entities/User';

const mockUsers: User[] = [
    { id: 1, name: 'User One' },
    { id: 2, name: 'User Two' },
];

export class UserAPI {
    static async getFirstUser(): Promise<User | undefined> {
        return mockUsers[0];
    }
}
