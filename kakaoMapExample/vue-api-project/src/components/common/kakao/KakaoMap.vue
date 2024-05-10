<template>
  <div>
    <div id="map"></div>
    <button @click="initMap">내위치</button>
    <button @click="displayMarker(myMarkerPosition)">즐겨찾기 마커 표시</button> 
    <!-- 위치 표시는 이걸로 하자!! -->
    <button @click="displayMarker([])">즐겨찾기 마커 해제</button>
    <input v-model="searchKey">
    <button @click="search">검색</button>
    <div v-show="searchResult.length > 0">
      <table>
        <tr>
          <td>가게 이름</td>
          <td>가게 주소</td>
        </tr>
        <tr v-for="shop in searchResult" 
        :key="shop.id"
        >
        <td>{{shop.place_name}}</td>
        <td><a :href="generateMapLink(shop.id)" target="_blank">https://map.kakao.com/link/map/{{shop.id}}</a></td>
      </tr>
      </table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, toRaw } from 'vue';
let map = null;
const initMap = function () {
  let myCenter = new kakao.maps.LatLng(33.450701, 126.570667); //카카오본사
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      myCenter = new kakao.maps.LatLng(lat, lon);
      new kakao.maps.Marker({
        map,
        position: myCenter,
      });
      map.setCenter(myCenter);
    });
  }
  const container = document.getElementById('map');
  const options = {
    center: myCenter,
    level: 3,
  }; // 지도 객체를 등록합니다.
  map = new kakao.maps.Map(container, options);
  // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
  const mapTypeControl = new kakao.maps.MapTypeControl();

  // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

  // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
  const zoomControl = new kakao.maps.ZoomControl();
  map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
};

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    const script = document.createElement('script'); // autoload=false 스크립트를 동적으로 로드하기 위해서 사용
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${
      import.meta.env.VITE_KAKAO_API_KEY
    }&libraries=services`;
    document.head.appendChild(script);
    script.addEventListener('load', () => {
      kakao.maps.load(initMap);
    }); //헤드태그에 추가
  }
});

const myMarkerPosition = ref([
  [33.450701, 126.570667],
])

const markers = ref([]);

const displayMarker = function (markerPositions) {
  //마커지우기
  if (markers.value.length > 0) {
    markers.value.forEach((marker) => marker.setMap(null));
  }

  const positions = markerPositions.map(
    (position) => new kakao.maps.LatLng(...position)
  );
  if (positions.length > 0) {
    markers.value = positions.map(
      (position) =>
        new kakao.maps.Marker({
          map: toRaw(map),
          position,
        })
    );

    const bounds = positions.reduce(
      (bounds, latlng) => bounds.extend(latlng),
      new kakao.maps.LatLngBounds()
    );

    toRaw(map).setBounds(bounds);
  }
};

const searchKey=ref()
const searchResult = ref([])
const callback = function(result, status){
  if(status === kakao.maps.services.Status.OK){
    console.log(result)
    searchResult.value = result
  }
}
const search= function(){
  const places = new kakao.maps.services.Places();

  places.keywordSearch(searchKey.value, callback)
  searchKey.value=''
}
function generateMapLink(id) {
  return `https://map.kakao.com/link/map/${id}`;
}
</script>

<style scoped>
#map {
  width: 500px;
  height: 400px;
}
</style>
