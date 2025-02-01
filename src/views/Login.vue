<template>
  <div class="container">
    <div class="login-left">
      <div class="login-header">
        <h1>Bienvenido a nuestra aplicación</h1>
        <p>Por favor logueate usando la plataforma</p>
      </div>
      <Form :initialValues :resolver @submit="onFormSubmit" class="grid lg:grid-cols-2 gap-4 w-full">
        <div class="login-form-content">
          <div class="form-item">
            <FormField v-slot="$field" name="email" initialValue="" :resolver="customEmailResolver">
                <InputText type="text" placeholder="Email" />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
            </FormField>
            <FormField v-slot="$field" name="password" initialValue="" :resolver="customPasswordResolver">
                <Password type="text" placeholder="Password" :feedback="false" toggleMask fluid />
                <Message v-if="$field?.invalid" severity="error" size="small" variant="simple">{{ $field.error?.message }}</Message>
            </FormField>
          </div>
          <Button type="submit" severity="secondary" label="Submit" />
        </div>
      </Form>
      <div class="login-form-footer">
        <a href="#">
          <img width="30"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Facebook_f_logo_%282019%29.svg/1365px-Facebook_f_logo_%282019%29.svg.png">
          Facebook Login
        </a>
        <a href="#">
          <img width="30"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK5q0FP74VV9wbfwP378_7kj7iDomHuKrxkXsxDdUT28V9dlVMNUe-EMzaLwaFhneeuZI&usqp=CAU">
          Google Login
        </a>
      </div>
    </div>
    <div class="login-right">
      <img src="../assets/image.svg" alt="image">
    </div>
    <Toast />
  </div>
</template>

<script>
import { useUserStore } from '@/stores/store.ts'
import { useToast } from 'primevue/usetoast';
import { reactive } from 'vue';

export default {
  name: 'Login',
  setup() {
    const toast = useToast();

    const initialValues = reactive({
        email: '',
        password: ''
    });
    const userStore = useUserStore()

    const onFormSubmit = ({states, valid}) => {
      if (valid) {
        let credentials = {
          username: states.email.value,
          password: states.password.value
        }
        submit(credentials)
      }
    }

    const submit = (credentials) => {
      console.log(credentials);
      userStore.signIn(credentials).then(() => {
        toast.add({ severity: 'success', summary: 'Logueado correctamente', life: 3000 });
        this.$router.push({
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
      initialValues
    }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;600&display=swap");
* {
  box-sizing: border-box;
}

body {
  padding: 0;
  margin: 0;
  font-family: "Inter", sans-serif;
  background: linear-gradient(45deg, #131086, #b621f3);
  padding: 40px;
}

.container {
  min-height: calc(100vh - 80px);
  display: grid;
  grid-template-columns: 50% 50%;
  border-radius: 10px;
  overflow: hidden;
}

.login-left {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 150px;
  background-color: white;
}

.login-right {
  background-color: #eee;
  display: flex;
  justify-content: center;
}
.login-right img {
  width: 80%;
}

.login-header {
  margin-bottom: 50px;
}
.login-header h1 {
  font-size: 40px;
  margin-bottom: 10px;
}
.login-header p {
  opacity: 0.7;
}

.login-form {
  width: 450px;
}
.login-form-content {
  display: flex;
  flex-direction: column;
  gap: 35px;
}
.login-form-footer {
  display: flex;
  gap: 30px;
  margin-top: 70px;
}
.login-form-footer a {
  flex: 6;
  gap: 15px;
  border: 1px solid black;
  border-radius: 100px;
  padding: 0.6rem;
  justify-content: center;
  display: flex;
  align-items: center;
  color: black;
  text-decoration: none;
}
.login-form-footer a:hover {
  background-color: #eee;
}

.form-item label:not(.checkboxLabel) {
  display: inline-block;
  background-color: white;
  margin-bottom: 10px;
  position: absolute;
  padding: 0 10px;
  transform: translate(30px, -10px);
  font-size: 14px;
}

/* input[type=text],
input[type=password] {
  border: 1px solid black;
  height: 55px;
  padding: 0 2rem;
  width: 100%;
  outline: none;
  transition: background 0.5s;
  font-size: 18px;
  border-radius: 100px;
} */

button {
  border: none;
  background: linear-gradient(45deg, #131086, #b621f3);
  color: white;
  padding: 1rem;
  border-radius: 100px;
  text-align: center;
  text-transform: uppercase;
  font-size: 18px;
  height: 55px;
  cursor: pointer;
}

/* Responsive */
@media (max-width: 1350px) {
  .login-left {
    padding: 50px !important;
  }
  .login-form {
    width: 100%;
  }
  .login-form-footer {
    flex-direction: column;
    gap: 15px;
  }
}
@media (max-width: 768px) {
  body {
    padding: 20px;
  }
  .container {
    grid-template-columns: auto;
  }
  .login-right {
    display: none;
  }
}/*# sourceMappingURL=style.css.map */
</style>