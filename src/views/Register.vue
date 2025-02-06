<template>
  <div class="grid place-content-center w-full h-full" style="background-size: cover;background-image: url('../../public/background3.jpeg');">
    <Card class="w-max" style="background-color: #ffffff70; backdrop-filter: blur(10px);">
      <template #title>Crear nuevo usuario</template>
      <template #content>
        <Form @submit="onFormSubmit" class="w-100">
          <div class="grid gap-4">
            <div class="w-full grid gap-4">
              <FormField v-slot="$field" name="firstname" :resolver="customNameResolver">
                  <InputText type="text" placeholder="Nombre" fluid v-model="firstname"/>
                  <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
              </FormField>
              <FormField v-slot="$field" name="lastname" :resolver="customNameResolver">
                  <InputText type="text" placeholder="Apellido" fluid v-model="lastname"/>
                  <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
              </FormField>
              <FormField v-slot="$field" name="email" :resolver="customEmailResolver">
                  <InputText type="text" placeholder="Email" fluid v-model="email"/>
                  <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
              </FormField>
              <FormField v-slot="$field" name="password" :resolver="customPasswordResolver">
                  <Password type="text" placeholder="Password" :feedback="false" toggleMask fluid v-model="password"/>
                  <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
              </FormField>
            </div>
            <div class="flex justify-end">
              <Button
                variant="text"
                severity="info"
                style="margin-right: 1em"
                @click="router.push('login')"
                label="Si ya tienes cuenta"
              />
              <Button type="submit" severity="primary" label="Crear usuario" />
            </div>
          </div>
        </Form>
      </template>
    </Card>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/store'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'Login',
  setup() {
    const router = useRouter()

    const firstname = ref(null)
    const lastname = ref(null)
    const email = ref(null)
    const password = ref(null)

    const userStore = useUserStore()

    const onFormSubmit = ({valid}) => {
      if (valid) {
        let credentials = {
          username: email.value,
          password: password.value
        }
        let body = {
          firstname: firstname.value,
          lastname: lastname.value,
          email: email.value,
          password: password.value
        }
        let data = {
          body,
          credentials
        }
        submit(data)
      }
    }

    const submit = (data) => {
      userStore.signUp(data).then(() => {
        router.push({
          name: 'dashboard'
        })
      })
    }

    const customNameResolver = ({ name,value }) => {
      const errors = { [name]: []};      
      if (!value) {
          errors[name].push({ type: 'required', message: 'Input is required.' });
      }
      if (value?.length < 3) {
          errors[name].push({ type: 'minimum', message: 'Input must be at least 3 characters long.' });
      }
      return {
          errors
      };
    };
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
      customNameResolver,
      customEmailResolver,
      customPasswordResolver,
      onFormSubmit,
      router,
      firstname,
      lastname,
      email,
      password
    }
  }
}
</script>

<style scoped>

</style>