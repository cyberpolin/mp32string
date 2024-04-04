import {useState} from 'react';

const UseTodo = () => {
  const [items, setItems] = useState<string[]>([]);

  const addItem = (item: string = '') => {
    setItems([...items, item]);
  };
  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };
  const clearItems = () => {
    setItems([]);
  };

  return {items, addItem, removeItem, clearItems};
};

export default UseTodo;
