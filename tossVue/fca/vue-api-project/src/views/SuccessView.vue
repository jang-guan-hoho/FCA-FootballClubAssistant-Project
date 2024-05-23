<template>
  <!-- 결제 성공 시 -->
  <section v-if="confirmed">
    <div class="box_section" style="width: 600px">
      <img style="width: 100px" src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png" />
      <h2>결제를 완료했어요</h2>

      <div class="p-grid typography--p" style="margin-top: 50px">
        <div class="p-grid-col text--left"><b>결제금액</b></div>
        <div class="p-grid-col text--right" id="amount">{{ jsonData.totalAmount }}원</div>
      </div>
      <div class="p-grid typography--p" style="margin-top: 10px">
        <div class="p-grid-col text--left"><b>주문내용</b></div>
        <div class="p-grid-col text--right" id="orderName">{{ jsonData.orderName }}</div>
      </div>
<<<<<<< HEAD
      <div class="p-grid typography--p" style="margin-top: 10px">
        <div class="p-grid-col text--left"><b>주문일자</b></div>
        <div class="p-grid-col text--right" id="approvedAt">{{ jsonData.approvedAt }}</div>
      </div>
=======
      <!-- <div class="p-grid typography--p" style="margin-top: 10px">
        <div class="p-grid-col text--left"><b>paymentKey</b></div>
        <div class="p-grid-col text--right" id="paymentKey" style="white-space: initial; width: 250px">{{ jsonData.paymentKey }}</div>
      </div>
      <div class="p-grid" style="margin-top: 30px">
        <button class="button p-grid-col5" onclick="location.href='https://docs.tosspayments.com/guides/payment/integration';">연동 문서</button>
        <button class="button p-grid-col5" onclick="location.href='https://discord.gg/A4fRFXQhRu';" style="background-color: #e8f3ff; color: #1b64da">실시간 문의</button>
      </div>
    </div>
    <div class="box_section" style="width: 600px; text-align: left">
      <b>Response Data :</b>
      <div id="response" style="white-space: initial">
        <pre>{{ jsonData }}</pre>
      </div>-->
>>>>>>> 081c1298970ff3000fab8e41f38a0881c0194b06
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { confirmPayment } from "@/confirmPayment";
<<<<<<< HEAD
import { useClubStore } from "@/stores/club";
import axios from 'axios'; // axios를 추가합니다.

const store = useClubStore();
=======
>>>>>>> 081c1298970ff3000fab8e41f38a0881c0194b06

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const confirmed = ref(false);
    const jsonData = ref(null);

    onMounted(async () => {
      const requestData = {
        orderId: route.query.orderId,
        amount: route.query.amount,
        paymentKey: route.query.paymentKey,
      };
<<<<<<< HEAD

=======
>>>>>>> 081c1298970ff3000fab8e41f38a0881c0194b06
      async function confirm() {
        try {
          const { response, json } = await confirmPayment(requestData);
          console.log(json);
<<<<<<< HEAD

=======
>>>>>>> 081c1298970ff3000fab8e41f38a0881c0194b06
          if (!response.ok) {
            router.push(`/fail?message=${json.message}&code=${json.code}`);
          } else {
            confirmed.value = true;
            jsonData.value = json;
<<<<<<< HEAD
            // 결제가 성공적으로 완료되었을 때 서버로 필요한 데이터만 전송합니다.
            const paymentData = {
              orderId: json.orderId,
              totalAmount: json.totalAmount,
              orderName: json.orderName,
              approvedAt: json.approvedAt
            };
            await sendPaymentDataToServer(paymentData);
          }
        } catch (error) {
          console.error('결제 확인 중 오류 발생:', error);
        }
      }

      async function sendPaymentDataToServer(paymentData) {
        try {
          const response = await axios.post('http://your-server-api-endpoint.com/payment', paymentData);
          if (response.status === 200) {
            console.log('결제 정보가 성공적으로 서버에 전송되었습니다.');
          }
        } catch (error) {
          console.error('결제 정보를 서버로 전송하는 중 오류 발생:', error);
          console.log(paymentData)
        }
=======
          }
        } catch (error) {}
>>>>>>> 081c1298970ff3000fab8e41f38a0881c0194b06
      }

      confirm();
    });

    return {
      confirmed,
      jsonData,
    };
  },
};
</script>
