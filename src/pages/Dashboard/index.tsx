import React, { Component, useState } from 'react';

import {Header} from '../../components/Header';
import api from '../../services/api';
import {Food} from '../../components/Food';
import {ModalAddFood} from '../../components/ModalAddFood';
import {ModalEditFood} from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { boolean } from 'yup';

interface Food
{
  id:Number;
  name:string;
  description:string;
  price: string;
  image: string;
}

interface DashboardProps
{
  foods: Food[];
  editingFood: Food;
  modalOpen: boolean;
  editModalOpen: boolean;
} 


export function Dashboard({foods, editingFood, modalOpen,editModalOpen}:DashboardProps ) {

  const[listFoods, setListFoods] = useState<Food[]>();
  const[isModalOpen, setIsModalOpen] = useState(false);
  const[isModalEditOpen, setIsModalEditOpen] = useState(false);
  const[food, setFood] = useState<Food>();

  async function componentDidMount() 
  {
    const response = await api.get('/foods');

    setListFoods(response.data);
  }


  async function handleAddFood(food:Food)
  {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setListFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateFood(food: Food)
  {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setListFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

 

  async function handleDeleteFood(id:Number)
  {
    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setListFoods(foodsFiltered);
  }

  function toggleModal()
  {
    setIsModalOpen(!modalOpen);
  }

  function toggleEditModal()
  {

    setIsModalEditOpen(!editModalOpen);
  }

  function handleEditFood(food : Food)
  {
    setFood(food);
    setIsModalEditOpen(true);
  }

    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map((food, index) => (
              <Food
                key={index}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
};

export default Dashboard;
