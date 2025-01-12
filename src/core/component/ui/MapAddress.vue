<script setup lang="ts">

import { onMounted, ref } from 'vue'
import type { ChangeAddress } from '@/types/dto/ChangeAddress.ts'
import { useAuthStore } from '@/core/stores/useAuthStore.ts'
import { patchUser } from '@/core/api/userApi.ts'

// Стейт для поиска и предложений
const query = ref('');
const suggestions = ref([]);

// Выбранный адрес и координаты
const selectedAddress = ref('');
const selectedCoordinates = ref({ lat: 55.751244, lon: 37.618423 }); // Москва по умолчанию

// Ваш API-ключ 2GIS
const API_KEY = '2cdfd317-639d-41bb-bd3c-58254780fd48';

let map;
let marker;

// Инициализация карты при загрузке компонента
onMounted(() => {
  map = DG.map('map', {
    center: [selectedCoordinates.value.lat, selectedCoordinates.value.lon],
    zoom: 13,
  });

  // Добавление маркера
  marker = DG.marker([selectedCoordinates.value.lat, selectedCoordinates.value.lon]).addTo(map);

  // Событие клика на карте
  map.on('click', async (e) => {
    const { lat, lng } = e.latlng;

    // Обновляем маркер
    marker.setLatLng([lat, lng]);

    // Обратное геокодирование: получаем адрес по координатам
    const response = await fetch(
      `https://catalog.api.2gis.com/3.0/items/geocode?key=${API_KEY}&point=${lng},${lat}`
    );
    const data = await response.json();

    // Получаем адрес и обновляем поле ввода
    const address = data.result.items[0]?.full_name || 'Не удалось определить адрес';
    query.value = address; // Обновляем поле ввода
    selectedAddress.value = address; // Сохраняем выбранный адрес
    console.log('Выбранный адрес:', address);
  });
});

// Функция получения предложений
const fetchSuggestions = async () => {
  if (query.value.length < 3) {
    suggestions.value = [];
    return;
  }

  try {
    const response = await fetch(
      `https://catalog.api.2gis.com/3.0/items?q=${encodeURIComponent(query.value)}&fields=items.point,items.full_name&key=${API_KEY}`
    );
    const data = await response.json();
    suggestions.value = data.result.items || [];
  } catch (error) {
    console.error('Ошибка при получении предложений:', error);
    suggestions.value = [];
  }
};

// Выбор предложения
const selectSuggestion = (suggestion) => {
  // Устанавливаем текстовый адрес и координаты
  query.value = suggestion.full_name;
  selectedCoordinates.value = suggestion.point;

  // Перемещаем маркер на выбранные координаты
  marker.setLatLng([suggestion.point.lat, suggestion.point.lon]);
  map.setView([suggestion.point.lat, suggestion.point.lon], 15);

  // Очищаем список предложений
  suggestions.value = [];
};

const authStore = useAuthStore()

const saveAddress = async () => {
  const changeAddress: ChangeAddress = {address: query.value}
  await patchUser(Number(authStore.userId), changeAddress)
  window.location.reload()
}

</script>

<template>
  <div class="flex font-inter text-black flex-col justify-center p-4 space-y-4 w-full">

    <!-- Поле ввода для автодополнения -->
    <div class="relative w-full">
      <input
        type="text"
        v-model="query"
        @input="fetchSuggestions"
        placeholder="Введите адрес..."
        class="w-full p-2 border-2 border-gray-300 rounded-lg focus:outline-none"
      />

      <!-- Список автодополнения -->
      <ul
        v-if="suggestions.length"
        class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto"
      >
        <li
          v-for="(suggestion, index) in suggestions"
          :key="index"
          @click="selectSuggestion(suggestion)"
          class="p-2 hover:bg-gray-100 cursor-pointer"
        >
          {{ suggestion.full_name }}
        </li>
      </ul>
    </div>

    <!-- Карта -->
    <div id="map" class="w-full h-96 rounded-lg shadow-md"></div>
    <button @click="saveAddress" class="bg-black text-white rounded-lg px-2 py-2">
      Сохранить
    </button>
  </div>
</template>

<style scoped>

</style>
