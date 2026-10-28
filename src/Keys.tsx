import { useState } from 'react';
import { IItem } from './index';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [items, setItems] = useState<IItem[]>(props.initialData);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValue, setEditValue] = useState<string>('');

    const sortedItems = [...items].sort((a, b) => {
        return props.sorting === 'ASC' ? a.id - b.id : b.id - a.id;
    });

    const handleStartEdit = (id: number, name: string) => {
        setEditingId(id);
        setEditValue(name);
    };

    const handleSave = () => {
        if (editingId === null) return;
        setItems((prev) =>
            prev.map((item) =>
                item.id === editingId ? { ...item, name: editValue } : item
            )
        );
        setEditingId(null);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            handleCancel();
        }
    };

    return (
        <div>
            {sortedItems.map((item) => (
                <div key={item.id} style={{ padding: '5px', borderBottom: '1px solid #ccc' }}>
                    {editingId === item.id ? (
                        <input
                            autoFocus
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                    ) : (
                        <span
                            onClick={() => handleStartEdit(item.id, item.name)}
                            style={{ cursor: 'pointer', display: 'inline-block', width: '100%' }}
                        >
                            {item.name}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
