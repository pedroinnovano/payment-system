<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
    <form @submit.prevent="submitPayment" class="space-y-4">
      <div>
        <label class="block text-sm font-medium">Nome</label>
        <input v-model="name" type="text" class="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <label class="block text-sm font-medium">Valor</label>
        <input v-model="amount" type="number" class="mt-1 block w-full border rounded p-2" />
      </div>
      <div>
        <label class="block text-sm font-medium">Método de Pagamento</label>
        <select v-model="method" class="mt-1 block w-full border rounded p-2">
          <option value="credit">Cartão</option>
          <option value="pix">Pix</option>
          <option value="debit">Débito</option>
        </select>
      </div>
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded">Enviar Pagamento</button>
    </form>

    <div v-if="transactionId" class="mt-6">
      <p><strong>ID da Transação:</strong> {{ transactionId }}</p>
      <p class="flex items-center gap-2 mt-2">
        <span><strong>Status:</strong></span>
        <span v-if="status === 'pending'">⏳ Aguardando</span>
        <span v-else-if="status === 'approved'" class="text-green-600">✅ Aprovado</span>
        <span v-else-if="status === 'failed'" class="text-red-600">❌ Falhou</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { getToken, createPayment, getPaymentStatus } from '@/services/api'

const name = ref('')
const amount = ref(0)
const method = ref('credit')
const transactionId = ref('')
const status = ref('')

let pollingInterval: NodeJS.Timeout

const submitPayment = async () => {
  try {
    const token = await getToken()

    const response = await createPayment(
      {
        amount: amount.value,
        method: method.value,
        payer: {
          name: name.value,
          document: '000.000.000-00',
          email: 'teste@teste.com',
        },
      },
      token
    )

    transactionId.value = response.paymentId
    status.value = 'pending'

    pollingInterval = setInterval(async () => {
      const statusResp = await getPaymentStatus(transactionId.value, token)
      status.value = statusResp.status

      if (status.value !== 'pending') {
        clearInterval(pollingInterval)
      }
    }, 2000)
  } catch (err) {
    alert('Erro ao enviar pagamento')
    console.error(err)
  }
}

</script>
