<script setup lang="ts">

import { getUser } from '@/core/api/userApi.ts'
import { useAuthStore } from '@/core/stores/useAuthStore.ts'
import { changeImgRest, getRestaurantById, patchRest } from '@/core/api/restaurantApi.ts'
import type { User } from '@/types/User.ts'
import type { Restaurant } from '@/types/Restaurant.ts'
import { computed, onMounted, ref, watch } from 'vue'
import ModalConfirm from '@/core/component/ui/ModalConfirm.vue'
import ModalDish from '@/modules/employee/components/ui/ModalDish.vue'
import { changeImg, deleteDish } from '@/core/api/dishApi.ts'
import { useRouter } from 'vue-router'
import ModalDishEdit from '@/modules/employee/components/ui/ModalDishEdit.vue'
import type { ChangeRequest } from '@/types/dto/ChangeRequest.ts'

const authStore = useAuthStore()

const user = ref<User | null>(null);
const restaurant = ref<Restaurant | null>(null);

const isModalOpened = ref<boolean>(false)

const confirmEdit = () => {
  isEditModalOpened.value = true
}

const confirm = () => {
  isModalOpened.value = true
}

const selectedFile = ref<File | null>(null)

const handleFileChange = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    selectedFile.value = file
  }
}

const handleUpload = async () => {
  if (!selectedFile.value) {
    alert("Выберите файл!")
    return
  }
  try {
    await changeImgRest(restaurant.value.id, selectedFile.value)
    window.location.reload()
  } catch (error) {
    alert(error)
  }
}

const sortedDishList = computed(() => {
  return restaurant.value?.menu.dishList.slice().reverse() || []
})

const router = useRouter()

const handleLogout = async () => {
  try {
    await authStore.logoutUser()
    await router.push('/sign-in')
  } catch (err) {
    console.log("Ошибка при выходе: ", err)
  }
}

const handleDeleteDish = async (dishId: number) => {
  await deleteDish(dishId)
  window.location.reload()
}

const isEditModalOpened = ref(false)

const selectedDishId = ref<number | null>(null);

const openEditModal = (dishId: number) => {
  selectedDishId.value = dishId; // Сохраняем id блюда
  isEditModalOpened.value = true; // Открываем модальное окно
};

const closeEditModal = () => {
  selectedDishId.value = null; // Сбрасываем выбранный id
  isEditModalOpened.value = false; // Закрываем модальное окно
};

onMounted(async () => {
  try {
    // Получаем пользователя
    const fetchedUser = await getUser(Number(authStore.userId));
    user.value = fetchedUser;
    // Если у пользователя есть restaurantId, получаем ресторан
    if (fetchedUser.restaurantId) {
      const fetchedRestaurant = await getRestaurantById(fetchedUser.restaurantId);
      restaurant.value = fetchedRestaurant;
    }
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }
});

const changeRequest = ref<ChangeRequest>({
  name: restaurant.value?.name,
  address: restaurant.value?.address,
  openingHours: restaurant.value?.openingHours,
  phoneNumber: restaurant.value?.phoneNumber
})

watch(
  () => restaurant.value,
  (newRestaurant) => {
    if (newRestaurant) {
      changeRequest.value.name = newRestaurant.name;
      changeRequest.value.address = newRestaurant.address;
      changeRequest.value.openingHours = newRestaurant.openingHours;
      changeRequest.value.phoneNumber = newRestaurant.phoneNumber;
    }
  },
  { immediate: true } // Это позволяет выполнить синхронизацию сразу после монтирования
);

const updateRestaurantInfo = async () => {
  await patchRest(restaurant?.value.id, changeRequest.value)
  window.location.reload()
}

</script>

<template>
  <button @click="handleLogout" class="text-black text-lg m-2">
    Выйти
  </button>

  <div class="max-w-4xl font-inter mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Управление рестораном</h1>

    <section v-if="restaurant" class="mb-8">
      <h2 class="text-xl font-semibold mb-4">Информация о ресторане</h2>
      <img class="w-[900px] h-[500px] object-cover rounded-3xl shadow-subtle" :src="restaurant.imageUrl" alt="img" />
      <form @submit.prevent="updateRestaurantInfo">
        <div class="mb-4">
          <label for="name" class="block font-medium">Название:</label>
          <input
            v-model="changeRequest.name"
            id="name"
            type="text"
            class="w-full p-2 border-2 rounded-lg"
          />
        </div>
        <div class="mb-4">
          <label for="address" class="block font-medium">Адрес:</label>
          <input
            v-model="changeRequest.address"
            id="address"
            type="text"
            class="w-full p-2 border-2 rounded-lg"
          />
        </div>
        <div class="mb-4">
          <label for="openingHours" class="block font-medium">Время работы:</label>
          <input
            v-model="changeRequest.openingHours"
            id="openingHours"
            type="text"
            class="w-full p-2 border-2 rounded-lg"
          />
        </div>
        <div class="mb-4">
          <label for="phoneNumber" class="block font-medium">Номер телефона:</label>
          <input
            v-model="changeRequest.phoneNumber"
            id="phoneNumber"
            type="text"
            class="w-full p-2 border-2 rounded-lg"
          />
        </div>
        <button type="submit" class="bg-black text-white py-2 px-4 rounded-lg">
          Сохранить изменения
        </button>
      </form>
      <form @submit.prevent="handleUpload">
        <div class="mt-4">
          <label class="block font-medium">Главное изображение:</label>
          <input type="file" @change="handleFileChange" />
        </div>
        <button class="bg-black text-white font-inter py-2 px-4 rounded-lg mt-4" >Загрузить</button>
      </form>
    </section>

    <section v-if="restaurant?.menu?.dishList">
      <h2 class="text-xl font-semibold mb-4">Меню</h2>
      <button
        class="bg-black text-white py-2 px-4 rounded-lg mb-4"
        @click="isModalOpened = true"
      >
        Добавить блюдо
      </button>

      <div v-for="dish in sortedDishList" :key="dish.id" class="mb-4 p-4 border-2 rounded-lg">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">{{ dish.name }}</h3>
          <div>
            <button
              class="bg-black text-white py-1 px-2 rounded-lg mr-2"
              @click="openEditModal(dish.id)"
            >
              Редактировать
            </button>
            <button
              class="bg-black text-white py-1 px-2 rounded-lg"
              @click="handleDeleteDish(dish.id)"
            >
              Удалить
            </button>
          </div>
        </div>
        <p>{{ dish.description }}</p>
        <p class="text-black">Цена: {{ dish.price }} ₽</p>
      </div>
    </section>

    <ModalConfirm
      v-model="isEditModalOpened"
      title="Блюдо"
      @confirm="() =>closeEditModal"
      class-name="flex z-50 justify-center items-start bg-white pt-20 pr-20 bg-opacity-0 font-inter text-black"
      content-class-name="flex flex-col w-[500px] h-[600px] overflow-y-auto h-96 mx-4 p-4 bg-white rounded-lg space-y-2"
    >
      <ModalDishEdit :dishId="selectedDishId" :menuId="restaurant ? restaurant.menu.id : null" />
    </ModalConfirm>


    <ModalConfirm
      v-model="isModalOpened"
      title="Блюдо"
      @confirm="() => confirm"
      class-name="flex z-50 justify-center items-start bg-white pt-20 pr-20 bg-opacity-0 font-inter text-black"
      content-class-name="flex flex-col w-[500px] h-[600px] overflow-y-auto h-96 mx-4 p-4 bg-white rounded-lg space-y-2"
    >
      <ModalDish :menuId="restaurant ? restaurant.menu.id : null" />
    </ModalConfirm>
  </div>
</template>


<style scoped>

</style>
