<template>
  <div class="home-page flex-center">
    <div v-if="loading" class="loading">Sending...</div>
    <div v-if="submitSuccess" class="success-message">
      Form submitted successfully!
    </div>
    <div v-if="submitError" class="error-message">{{ submitError }}</div>
    <form @submit.prevent="submitForm" class="form">
      <input
        v-model="form.name"
        name="name"
        type="text"
        class="input"
        placeholder="name..."
        required
      />
      <input
        v-model="form.lastName"
        name="lastName"
        type="text"
        class="input"
        placeholder="last name..."
        required
      />
      <input
        v-model="form.email"
        name="email"
        type="email"
        class="input"
        placeholder="email..."
        required
      />
      <div class="checkbox-container">
        <input
          v-model="form.subscribe"
          type="checkbox"
          id="subscribe"
          name="subscribe"
          class="checkbox-input"
        />
        <label for="subscribe">Subscribe to newsletter</label>
      </div>
      <button type="submit" class="button">Submit</button>
    </form>
  </div>
</template>

<script setup>
const form = reactive({
  name: "",
  lastName: "",
  email: "",
  subscribe: false,
});

const loading = ref(false);
const submitSuccess = ref(false);
const submitError = ref(null);

const submitForm = async () => {
  loading.value = true;
  submitSuccess.value = false;
  submitError.value = null;

  try {
    const res = await $fetch("/api/submit", {
      method: "POST",
      body: form,
    });
    if (res.success) {
      submitSuccess.value = true;
    }
  } catch (err) {
    console.error(err);
    submitError.value = "Failed to submit.";
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.home-page {
  width: 100vw;
  height: 100vh;
  position: relative;

  .loading,
  .success-message,
  .error-message {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    max-width: 80%;
    word-break: break-word;
  }

  .loading {
    background-color: #f5f5f5;
  }

  .success-message {
    background-color: #dff0d8;
    color: #3c763d;
  }

  .error-message {
    background-color: #f2dede;
    color: #a94442;
  }

  .form {
    width: max(300px, min(90%, 800px));
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    background-color: white;
    display: flex;
    flex-direction: column;

    .input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      border: 1px solid var(--color-black);
      border-radius: 5px;
    }

    .checkbox-container {
      display: flex;
      align-items: center;
      margin: 10px 0;

      .checkbox-input {
        margin-right: 10px;
        width: auto;
      }
    }

    .button {
      padding: 15px 40px;
      margin-top: 20px;
      background-color: var(--color-yellow);
      border-radius: 10px;
      cursor: pointer;
      border: none;
      font-weight: bold;

      &:hover {
        opacity: 0.9;
      }
    }
  }
}
</style>
