<template>
  <div class="grid place-content-center w-full h-full" style="background-size: cover;background-image: url('../../public/background3.jpeg');">
    <Card class="w-max" style="background-color: #ffffff70; backdrop-filter: blur(10px);">
      <template #title>Iniciar Sesión</template>
      <template #content>
        <Form :initialValues :resolver @submit="onFormSubmit" class="md:w-100">
          <div class="grid gap-4">
            <div class="w-full grid gap-4">
              <FormField v-slot="$field" name="email" initialValue="" :resolver="customEmailResolver">
                  <InputText type="text" placeholder="Email" fluid />
                  <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
              </FormField>
              <FormField v-slot="$field" name="password" initialValue="" :resolver="customPasswordResolver">
                  <Password type="text" placeholder="Password" :feedback="false" toggleMask fluid />
                  <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
              </FormField>
            </div>
            <div class="flex justify-end">
              <Button
                variant="text"
                severity="info"
                style="margin-right: 1em"
                @click="router.push('register')"
                label="Si aún no tienes cuenta"
              />
              <Button class="w-30" type="submit" severity="primary" :label="!loading ? 'Iniciar sesión':''" :icon="loading?'pi pi-spin pi-spinner':''" />
            </div>
          </div>
        </Form>
      </template>
    </Card>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/store'
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Login2',
  setup() {
    const router = useRouter()
    const initialValues = reactive({
        email: '',
        password: ''
    });
    const userStore = useUserStore()
    const loading = ref(false)
    const onFormSubmit = ({states, valid}) => {
      if (valid) {
        let credentials = {
          username: states.email.value,
          password: states.password.value
        }
        submit(credentials)
      }
    }

    const submit = async (credentials) => {
      loading.value = true
      await userStore.signIn(credentials).then(() => {
        loading.value = false
        router.push({
          name: 'dashboard' //si uso path: "/mainpage" el params (props) no funciona -- params: { user: response.data.user } --
        })
      })
    }

    const customEmailResolver = ({ value }) => {
      const errors = { email: []};      
      if (!value) {
          errors.email.push({ type: 'required', message: 'Email is required.' });
      }
      if (value?.length < 3) {
          errors.email.push({ type: 'minimum', message: 'Email must be at least 3 characters long.' });
      }
      if (!value?.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
          errors.email.push({ type: 'email', message: 'Should be an email' });
      }
      return {
          errors
      };
    };
    const customPasswordResolver = ({ value }) => {
      const errors = { password: []};
      if (!value) {
          errors.password.push({ type: 'required', message: 'Password is required.' });
      }
      if (value?.length < 8) {
          errors.password.push({ type: 'minimum', message: 'Password must be at least 8 characters long.' });
      }
      if (value?.length > 25) {
          errors.password.push({ type: 'minimum', message: 'Password must be 25 characters long maximum.' });
      }
      return { errors };
    }
  
    return {
      submit,
      customEmailResolver,
      customPasswordResolver,
      onFormSubmit,
      initialValues,
      router,
      loading
    }
  }
}
</script>

<style scoped>

</style>