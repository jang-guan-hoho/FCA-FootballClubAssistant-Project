<template>
    <div>
      <fieldset>
        <legend>클럽 생성</legend>
        <div>
          <img :src="previewLogo" style="height: 50px; width: 50px;" alt="클럽 로고 미리보기" id="logoImg"/>
          <label for="logo">클럽 로고</label>
          <input type="file" id="logo" @change="handleLogoChange">
        </div>
        <div>
          <img :src="previewClubImg" style="height: 50px; width: 50px;" alt="클럽 대표 이미지 미리보기" id="clubImgPreview"/>
          <label for="clubImg">클럽 대표 이미지</label>
          <input type="file" id="clubImg" @change="handleClubImgChange">
        </div>
        <div>
          <label for="clubName">클럽명:</label>
          <input type="text" id="clubName" v-model="club.name">
        </div>
        <div>
          <label for="maxMember">정원:</label>
          <input type="number" id="maxMember" v-model="club.maxMember">
        </div>
        <div>
          <label for="region">활동 지역:</label>
          <select id="region" v-model="selectedRegion" @change="updateDistricts">
            <option disabled value="">지역 선택</option>
            <option v-for="region in koreanRegions" :key="region.id" :value="region.id">
              {{ region.name }}
            </option>
          </select>
        </div>
        <div v-if="districts.length > 0">
          <label for="district">구 선택:</label>
          <select id="district" v-model="club.region">
            <option disabled value="">구 선택</option>
            <option v-for="district in districts" :key="district" :value="district">
              {{ district }}
            </option>
          </select>
        </div>
        <div>
          <label for="fee">회비 금액 설정:</label>
          <input type="number" id="fee" v-model="club.fee" min="0" step="1000" >
        </div>
        <div>
          <label for="deadline">회비 납부 일:</label>
          <input type="number" id="deadline" v-model="club.deadline" min="1" max="28">
        </div>
        <div>
          <label for="description">클럽 설명:</label>
          <textarea id="description" v-model="club.description" cols="30" rows="10"></textarea>
        </div>
        <div>
          <button @click="createClub">등록</button>
        </div>
      </fieldset>
    </div>
  </template>

<script setup>
import { ref, watch } from 'vue';

const club = ref({
  name: '',
  maxMember: null,
  region: '',
  description: '',
  logo: null,
  clubImg: null,
  fee: null,
  deadline: null
});

const previewLogo = ref('');
const previewClubImg = ref('');

function handleLogoChange(event) {
  const file = event.target.files[0];
  if (file) {
    club.value.logo = file;
    previewLogo.value = URL.createObjectURL(file);
  }
}

function handleClubImgChange(event) {
  const file = event.target.files[0];
  if (file) {
    club.value.clubImg = file;
    previewClubImg.value = URL.createObjectURL(file);
  }
}

const selectedRegion = ref('');
const districts = ref([]);

const koreanRegions = ref([
{ id: 'seoul', name: '서울특별시', districts: ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"] },
{ id: 'incheon', name: '인천광역시', districts: ["계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "중구"] },
{ id: 'busan', name: '부산광역시', districts: ["강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"] },
{ id: 'daejeon', name: '대전광역시', districts: ["대덕구", "동구", "서구", "유성구", "중구"] },
{ id: 'daegu', name: '대구광역시', districts: ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구"] },
{ id: 'ulsan', name: '울산광역시', districts: ["남구", "동구", "북구", "중구", "울주군"] },
{ id: 'gwangju', name: '광주광역시', districts: ["광산구", "남구", "동구", "북구", "서구"] },
{ id: 'jeju', name: '제주특별자치도', districts: ["서귀포시", "제주시"] },
{ id: 'sejong', name: '세종특별자치시', districts: ["세종특별자치시"] },
{ id: 'gyeonggi', name: '경기도', districts: ["고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "여주시", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시", "가평군", "양평군", "연천군"] },
{ id: 'gangwon', name: '강원도', districts: ["강릉시", "동해시", "삼척시", "속초시", "원주시", "춘천시", "태백시", "고성군", "양구군", "양양군", "영월군", "인제군", "정선군", "철원군", "평창군", "홍천군", "화천군", "횡성군"] },
{ id: 'chungbuk', name: '충청북도', districts: ["제천시", "청주시", "충주시", "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "증평군", "진천군"] },
{ id: 'chungnam', name: '충청남도', districts: ["계룡시", "공주시", "논산시", "당진시", "보령시", "서산시", "아산시", "천안시", "금산군", "부여군", "서천군", "예산군", "청양군", "태안군", "홍성군"] },
{ id: 'gyeongbuk', name: '경상북도', districts: ["경산시", "경주시", "구미시", "김천시", "문경시", "상주시", "안동시", "영주시", "영천시", "포항시", "고령군", "군위군", "봉화군", "성주군", "영덕군", "영양군", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군"] },
{ id: 'gyeongnam', name: '경상남도', districts: ["거제시", "김해시", "밀양시", "사천시", "양산시", "진주시", "창원시", "통영시", "거창군", "고성군", "남해군", "산청군", "의령군", "창녕군", "하동군", "함안군", "함양군", "합천군"] },
{ id: 'jeonbuk', name: '전라북도', districts: ["군산시", "김제시", "남원시", "익산시", "전주시", "정읍시", "고창군", "무주군", "부안군", "순창군", "완주군", "임실군", "장수군", "진안군"] },
{ id: 'jeonnam', name: '전라남도', districts: ["광양시", "나주시", "목포시", "순천시", "여수시", "강진군", "고흥군", "곡성군", "구례군", "담양군", "무안군", "보성군", "신안군", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"] }
]);

function updateDistricts() {
  const region = koreanRegions.value.find(r => r.id === selectedRegion.value);
  districts.value = region ? region.districts : [];
}
watch(() => club.value.deadline, (newValue, oldValue) => {
  if (newValue < 1) {
    club.value.deadline = 1;
  } else if (newValue > 28) {
    club.value.deadline = 28;
  }
});
function createClub() {
  console.log('Submitted Club Data:', club.value);
  // Handle the submission logic here, such as sending data to a server
}
</script>
<!-- const koreanRegions = ref([
{ id: 'seoul', name: '서울특별시', districts: ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"] },
{ id: 'incheon', name: '인천광역시', districts: ["계양구", "남동구", "동구", "미추홀구", "부평구", "서구", "연수구", "중구"] },
{ id: 'busan', name: '부산광역시', districts: ["강서구", "금정구", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"] },
{ id: 'daejeon', name: '대전광역시', districts: ["대덕구", "동구", "서구", "유성구", "중구"] },
{ id: 'daegu', name: '대구광역시', districts: ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구"] },
{ id: 'ulsan', name: '울산광역시', districts: ["남구", "동구", "북구", "중구", "울주군"] },
{ id: 'gwangju', name: '광주광역시', districts: ["광산구", "남구", "동구", "북구", "서구"] },
{ id: 'jeju', name: '제주특별자치도', districts: ["서귀포시", "제주시"] },
{ id: 'sejong', name: '세종특별자치시', districts: ["세종특별자치시"] },
{ id: 'gyeonggi', name: '경기도', districts: ["고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "여주시", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시", "가평군", "양평군", "연천군"] },
{ id: 'gangwon', name: '강원도', districts: ["강릉시", "동해시", "삼척시", "속초시", "원주시", "춘천시", "태백시", "고성군", "양구군", "양양군", "영월군", "인제군", "정선군", "철원군", "평창군", "홍천군", "화천군", "횡성군"] },
{ id: 'chungbuk', name: '충청북도', districts: ["제천시", "청주시", "충주시", "괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "증평군", "진천군"] },
{ id: 'chungnam', name: '충청남도', districts: ["계룡시", "공주시", "논산시", "당진시", "보령시", "서산시", "아산시", "천안시", "금산군", "부여군", "서천군", "예산군", "청양군", "태안군", "홍성군"] },
{ id: 'gyeongbuk', name: '경상북도', districts: ["경산시", "경주시", "구미시", "김천시", "문경시", "상주시", "안동시", "영주시", "영천시", "포항시", "고령군", "군위군", "봉화군", "성주군", "영덕군", "영양군", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군"] },
{ id: 'gyeongnam', name: '경상남도', districts: ["거제시", "김해시", "밀양시", "사천시", "양산시", "진주시", "창원시", "통영시", "거창군", "고성군", "남해군", "산청군", "의령군", "창녕군", "하동군", "함안군", "함양군", "합천군"] },
{ id: 'jeonbuk', name: '전라북도', districts: ["군산시", "김제시", "남원시", "익산시", "전주시", "정읍시", "고창군", "무주군", "부안군", "순창군", "완주군", "임실군", "장수군", "진안군"] },
{ id: 'jeonnam', name: '전라남도', districts: ["광양시", "나주시", "목포시", "순천시", "여수시", "강진군", "고흥군", "곡성군", "구례군", "담양군", "무안군", "보성군", "신안군", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"] }
]); -->