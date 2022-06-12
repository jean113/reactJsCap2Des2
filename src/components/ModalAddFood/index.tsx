import { Component, createRef, FormEvent } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';

interface Food
{
  id:Number;
  name:string;
  description:string;
  price: string;
  image: string;
}

interface ModalAddFoodProps
{
  setIsOpen: () => void;
  handleAddFood: (food:Food) => {};
  isOpen: boolean;
}

export function ModalAddFood({setIsOpen, handleAddFood, isOpen }: ModalAddFoodProps) {

  async function handleSubmit(event:FormEvent<Food>) 
  {
    handleAddFood(event.currentTarget);
    setIsOpen();
  }

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={createRef()} onSubmit={handleSubmit}>
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
};
