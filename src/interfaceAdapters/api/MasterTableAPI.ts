import { MasterTable } from '../../domain/entities/MasterTable';
import { ID, UserID, YearMonthDate } from '../../domain/entities/MasterTable';


let mockData: MasterTable[] = [{ id: ID.cast(1), data: 'Initial Data', createdBy: UserID.cast(1), updatedBy: UserID.cast(1), updatedAt: { value: "20230101" } }];

class MastertableAPI {
    // Just showing the create method as an example, update would be similar
    static async create(data: string, createdBy: UserID, updatedBy: UserID, updatedAt: YearMonthDate): Promise<MasterTable | undefined> {
        const newMasterTable: MasterTable = {
            id: ID.cast(mockData.length + 1),
            data: data,
            createdBy,
            updatedBy,
            updatedAt
        };

        mockData.push(newMasterTable);

        return newMasterTable;
    }

    static async read(id: number): Promise<MasterTable | undefined> {
        return mockData.find((entry) => entry.id.get() === id);
    }

    static async update(id: ID, data: string): Promise<MasterTable> {
        const index = mockData.findIndex((entry) => entry.id.get() === id.get());
        mockData[index].data = data;
        return mockData[index];
    }

    static async delete(id: number): Promise<{ message: string }> {
        const index = mockData.findIndex((entry) => entry.id.get() === id);
        mockData.splice(index, 1);
        return { message: `Entry ${id} deleted` };
    }

    static async searchById(id: number): Promise<MasterTable | undefined> {
        return mockData.find((entry) => entry.id.get() === id);
    }

    static async searchByContent(content: string): Promise<MasterTable[]> {
        return mockData.filter((entry) => entry.data.includes(content));
    }
    static async searchByIdAndContent(id: ID, content: string): Promise<MasterTable | undefined> {
        return mockData.find((entry) => entry.id.get() === id.get() && entry.data.includes(content));
    }
}

export default MastertableAPI;
