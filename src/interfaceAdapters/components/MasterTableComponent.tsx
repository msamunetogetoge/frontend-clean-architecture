import React, { useEffect, useState } from 'react';
import MastertableCRUD from '../../useCases/MasterTableCRUD';
import { MasterTable } from '../../domain/entities/MasterTable';

import { ID } from '../../domain/entities/MasterTable';

import { User } from '../../domain/entities/User';
import { UserCRUD } from '../../useCases/UserCRUD';

const MasterTableComponent: React.FC = () => {
    const [data, setData] = useState<MasterTable[]>([]);
    const [input, setInput] = useState('');

    const fetchData = async () => {
        const newData: MasterTable[] = [];
        let id = 1;
        let result;
        while ((result = await MastertableCRUD.read(id))) {
            newData.push(result);
            id++;
        }
        setData(newData);
    };


    useEffect(() => {
        fetchData();
    }, []);

    // add a new state variable
    const [user, setUser] = useState<User | undefined>();

    // fetch user on component mount
    useEffect(() => {
        const fetchUser = async () => {
            const firstUser = await UserCRUD.getFirstUser();
            setUser(firstUser);
        };

        fetchUser();
    }, []);

    const handleCreate = async () => {
        await MastertableCRUD.create(input, user!.id, user!.id, { value: "20230121" });
        setInput('');
        fetchData();
    };

    const handleUpdate = async (id: number) => {
        const castedId = ID.cast(id);
        await MastertableCRUD.update(castedId.get(), input);
        setInput('');
        fetchData();
    };

    const handleDelete = async (id: number) => {
        const castedId = id;
        await MastertableCRUD.delete(castedId);
        fetchData();
    };


    // state for search
    const [searchId, setSearchId] = useState<number | undefined>(0);
    const [searchContent, setSearchContent] = useState('');

    // handle function
    const handleSearchById = async () => {
        if (searchId !== undefined) {
            const castedId = ID.cast(Number(searchId));
            const result = await MastertableCRUD.searchById(castedId.get());
            // const result = await MastertableCRUD.searchById(searchId);
            if (result) setData([result]);
        }
    };

    const handleSearchByContent = async () => {
        const results = await MastertableCRUD.searchByContent(searchContent);
        setData(results);
    };

    const handleSearchByIdAndContent = async () => {
        if (searchId !== undefined) {
            const castedId = ID.cast(Number(searchId));
            const result = await MastertableCRUD.searchByIdAndContent(castedId.get(), searchContent);
            if (result) setData([result]);
        }
    };

    return (
        <div>
            <div>
                {user && (
                    <div>
                        <p>User ID: {user.id}</p>
                        <p>User Name: {user.name}</p>
                    </div>
                )}
            </div>
            <div>
                <input type="number" value={searchId} onChange={(e) => setSearchId(e.target.value as unknown as number)} />
                <input type="text" value={searchContent} onChange={(e) => setSearchContent(e.target.value)} />
                <button onClick={handleSearchByIdAndContent}>Search By ID and Content</button>
                <input type="number" value={searchId} onChange={(e) => setSearchId(e.target.value as unknown as number)} />
                <button onClick={handleSearchById}>Search By ID</button>
                <input type="text" value={searchContent} onChange={(e) => setSearchContent(e.target.value)} />
                <button onClick={handleSearchByContent}>Search By Content</button>
            </div>
            <div>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button onClick={handleCreate}>Create</button>
            </div>

            <div>
                {data.map((item) => (
                    <div key={item.id.get()}>
                        <span>{item.data}</span>
                        <button onClick={() => handleUpdate(item.id.get())}>Update</button>
                        <button onClick={() => handleDelete(item.id.get())}>Delete</button>
                    </div>
                ))}
            </div>
        </div>


    );
};

export default MasterTableComponent;
