<template>
  <div class="wrapper">
    <div class="box_section">
      <!-- 결제 UI -->
      <div id="payment-method"></div>
      <!-- 이용약관 UI -->
      <div id="agreement"></div>
      <!-- 결제하기 버튼 -->
      <button :disabled="!inputEnabled" @click="requestPayment" class="button" id="payment-button" style="margin-top: 30px">결제하기</button>
    </div>
  </div>
</template>

<script setup>
<<<<<<< HEAD
import { ref, onMounted,defineProps } from 'vue';
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useRoute } from "vue-router";
import { useClubStore } from '@/stores/club';
const store = useClubStore()

const route = useRoute();

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = nanoid();
const amount = ref(route.params.clubFee);
const inputEnabled = ref(false);
const clubName = ref(route.params.name)
=======
import { ref, onMounted } from 'vue';
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import { useRoute } from "vue-router";

const route = useRoute();
const clubFee = ref(route.params.clubFee);

const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
const customerKey = nanoid();
const amount = ref(clubFee.value);
const inputEnabled = ref(false);

>>>>>>> 081c1298970ff3000fab8e41f38a0881c0194b06
const paymentWidget = ref(null);
const paymentMethodWidget = ref(null);

const requestPayment = async () => {
<<<<<<< HEAD
  console.log(amount.value)
  console.log(clubName.value)
=======
>>>>>>> 081c1298970ff3000fab8e41f38a0881c0194b06
  try {
    if (paymentWidget.value) {
      await paymentWidget.value.requestPayment({
        orderId: nanoid(),
<<<<<<< HEAD
        orderName: `${clubName.value} 회비`,
=======
        orderName: "회비 결제",
>>>>>>> 081c1298970ff3000fab8e41f38a0881c0194b06
        customerName: "유호성",
        customerEmail: "customer123@gmail.com",
        customerMobilePhone: "01012341234",
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/fail`,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const updateAmount = async () => {
  const coupon = document.getElementById("coupon-box");
  if (coupon.checked) {
    paymentMethodWidget.value.updateAmount(amount.value - 5000);
  } else {
    paymentMethodWidget.value.updateAmount(amount.value);
  }
};

onMounted(async () => {
  paymentWidget.value = await loadPaymentWidget(clientKey, ANONYMOUS);
  paymentMethodWidget.value = paymentWidget.value.renderPaymentMethods("#payment-method", { value: amount.value }, { variantKey: "DEFAULT" });
  paymentWidget.value.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

  paymentMethodWidget.value.on("ready", () => {
    inputEnabled.value = true;
  });
});
</script>

<style scoped>
.wrapper {
  text-align: center;
  border-radius: 45%;
}
</style>
