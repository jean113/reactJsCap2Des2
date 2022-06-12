import { Component, createRef, FormEvent } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal}  from '../Modal';
import { Input } from '../Input';

interface Food
{
  id:Number;
  name:string;
  description:string;
  price: string;
  image: string;
}

interface ModalEditFoodProps
{
  setIsOpen: () => void;
  isOpen: boolean;
  handleUpdateFood: (food: Food) => {};
  editingFood: {}
}

export function ModalEditFood({setIsOpen, isOpen, handleUpdateFood, editingFood}:ModalEditFoodProps) {
  
  async function handleSubmit(event:FormEvent<Food>) {
    handleUpdateFood(event.currentTarget);
    setIsOpen();
  };

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={createRef()} onSubmit={handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
};

export default ModalEditFood;
