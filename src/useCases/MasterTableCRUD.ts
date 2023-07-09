import MastertableAPI from '../interfaceAdapters/api/MasterTableAPI';
import { MasterTable } from '../domain/entities/MasterTable';
import { ID, isYearMonthDate, UserID, YearMonthDate } from '../domain/entities/MasterTable';


export default class MastertableCRUD {
    // Just showing the create method as an example, update would be similar
    static async create(data: string, createdBy: number, updatedBy: number, updatedAt: YearMonthDate): Promise<MasterTable | undefined> {
        if (!isYearMonthDate(updatedAt)) {
            throw new Error("Invalid YearMonthDate format");
        }

        return await MastertableAPI.create(data, UserID.cast(createdBy), UserID.cast(updatedBy), updatedAt);
    }

    static read(id: number): Promise<MasterTable | undefined> {
        return MastertableAPI.read(id);
    }

    static update(id: number, data: string): Promise<MasterTable> {
        const castedId = ID.cast(id);
        return MastertableAPI.update(castedId, data);
    }

    static delete(id: number): Promise<{ message: string }> {
        return MastertableAPI.delete(id);
    }
    static async searchById(id: number): Promise<MasterTable | undefined> {
        return MastertableAPI.searchById(id);
    }

    static async searchByContent(content: string): Promise<MasterTable[]> {
        return MastertableAPI.searchByContent(content);
    }

    static async searchByIdAndContent(id: number, content: string): Promise<MasterTable | undefined> {
        const castedId = ID.cast(id);
        return MastertableAPI.searchByIdAndContent(castedId, content);
    }
}
