<template>
  <div class="grid justify-items-center w-full h-full gap-8">
    <Avatar
      class="h-35 w-35 text-6xl"
      :label="initials()"
      shape="circle"
      style="background-color: var(--p-primary-color)"
    />
    <Card class="w-120 max-md:w-90 relative">
      {{ user.email }}

      <template #content>
        <Form @submit="onFormSubmit">
          <Button
            v-if="!editing"
            icon="pi pi-pencil"
            severity="info"
            variant="text"
            rounded
            class="absolute right-0.5 top-0.5"
            @click="editing = true"
          />

          <div class="grid grid-cols py-2">
            <p class="text-md !font-bold">Nombre:</p>
            <p v-if="!editing">{{ user.firstname }}</p>
            <FormField
              v-slot="$field"
              name="firstname"
              :initialValue="firstname"
              :resolver="customNameResolver"
              v-if="editing"
            >
              <InputText type="text" placeholder="Nombre" fluid v-model="firstname" />
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                $field.error?.message
              }}</Message>
            </FormField>
          </div>
          <div class="grid grid-cols py-2">
            <p class="text-md !font-bold">Apellidos:</p>
            <p v-if="!editing">{{ user.lastname }}</p>
            <FormField
              v-slot="$field"
              name="lastname"
              :initialValue="lastname"
              :resolver="customNameResolver"
              v-if="editing"
            >
              <InputText type="text" placeholder="Apellido" fluid v-model="lastname" />
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                $field.error?.message
              }}</Message>
            </FormField>
          </div>
          <div class="grid grid-cols py-2">
            <p class="text-md !font-bold">Email:</p>
            <p v-if="!editing">{{ user.email }}</p>
            <FormField
              v-slot="$field"
              name="email"
              :initialValue="email"
              :resolver="customEmailResolver"
              v-if="editing"
            >
              <InputText type="text" placeholder="Email" fluid v-model="email" />
              <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{
                $field.error?.message
              }}</Message>
            </FormField>
          </div>

          <div class="grid grid-cols py-2" v-if="!editing">
            <p class="text-md !font-bold">Rol:</p>
            <p>{{ user.role }}</p>
          </div>
          <div class="grid grid-cols py-2" v-if="!editing">
            <p class="text-md !font-bold">Fecha de registro:</p>
            <p>{{ signupDate }}</p>
          </div>
          <div class="flex gap-4 mt-4" v-if="editing">
            <Button label="Cancel" severity="secondary" outlined class="w-full" @click="editing = false" />
            <Button type="submit" label="Save" class="w-full" />
          </div>
        </Form>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { IUser } from '@/models/user'
import { useUserStore } from '@/stores/store'
import { computed, ref } from 'vue'
import moment from 'moment-timezone'

export default {
  name: 'Profile',
  setup() {
    const editing = ref(false)
    const userStore = useUserStore()
    const user = computed<IUser>(() => userStore.user)
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const signupDate = computed(() => moment(user.value.signupDate).tz(timezone).format('YYYY-MM-DD HH:mm'))
    const firstname = ref(user.value.firstname)
    const lastname = ref(user.value.lastname)
    const email = ref(user.value.email)
    const initials = () => {
      let initials = ''
      let nameParts = [user.value.firstname, user.value.lastname]
      for (const namePart of nameParts) {
        if (namePart) {
          initials += namePart.charAt(0).toUpperCase()
        }
      }
      return initials
    }
    const customEmailResolver = ({ value }: { value: string }) => {
      const errors: { email: { type: string; message: string }[] } = {
        email: []
      }
      if (!value) {
        errors.email.push({ type: 'required', message: 'Email is required.' })
      }
      if (value?.length < 3) {
        errors.email.push({
          type: 'minimum',
          message: 'Email must be at least 3 characters long.'
        })
      }
      if (!value?.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
        errors.email.push({ type: 'email', message: 'Should be an email' })
      }
      return {
        errors
      }
    }
    const customNameResolver = ({ name, value }: { name: string; value: string }) => {
      const errors: { [key: string]: { type: string; message: string }[] } = {
        [name]: []
      }
      if (!value) {
        errors[name].push({ type: 'required', message: 'Input is required.' })
      }
      if (value?.length < 3) {
        errors[name].push({
          type: 'minimum',
          message: 'Input must be at least 3 characters long.'
        })
      }
      return {
        errors
      }
    }
    const onFormSubmit = ({ valid }: { valid: boolean }) => {
      if (valid) {
        let body: IUser = user.value
        body.firstname = firstname.value
        body.lastname = lastname.value
        body.email = email.value
        editUser(body)
      }
    }
    const editUser = (body: any) => {
      userStore.editUser(body).then(() => {
        editing.value = false
      })
    }
    return {
      user,
      firstname,
      lastname,
      email,
      signupDate,
      initials,
      editing,
      customNameResolver,
      customEmailResolver,
      editUser,
      onFormSubmit
    }
  }
}
</script>

<style scoped></style>
